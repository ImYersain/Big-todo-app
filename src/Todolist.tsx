import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import { Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { addTaskActionCreator } from './store/tasksReducer';
import { Task } from './components/Task';

export interface ITask {
  id: string;
  title: string;
  isDone: boolean;
}
interface IProps {
  todoListId: string;
  title: string;
  onChangeFilter: (arg: FilterValuesType, id: string) => void;
  filterValue: FilterValuesType;
  removeTodolist: (todoListId: string) => void;
  onChangeTodoListTitle: (todoListId: string, newTitle: string) => void;
}

export const Todolist = memo(({
  todoListId,
  title,
  onChangeFilter,
  filterValue,
  removeTodolist,
  onChangeTodoListTitle,
}: IProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppRootStateType) => state.tasks[todoListId]);

  const addTask = useCallback((title: string) => {   //обвертка для функции для того чтобы передвать туда еще айди, так как в  addItemForm функция не принимает атрибут айди
    const action = addTaskActionCreator(todoListId, title);
    dispatch(action);
  }, [todoListId, dispatch]);

  const onChangeTodoTitle = useCallback((newTitle: string) => {
    onChangeTodoListTitle(newTitle, todoListId)
  }, [onChangeTodoListTitle, todoListId]);

  const onHandleFilter = useCallback((filterValue: FilterValuesType, todoListId: string) => {
    onChangeFilter(filterValue, todoListId);
  }, [onChangeFilter, todoListId]);

  let tasksForTodoList = tasks;

  if (filterValue === 'completed') {
    tasksForTodoList = tasksForTodoList.filter((item) => item.isDone);
  }
  if (filterValue === 'active') {
    tasksForTodoList = tasksForTodoList.filter((item) => !item.isDone);
  }

  return (
    <Box>
      <h3>
        <EditableSpan titleFromState={title} onChangeTitle={onChangeTodoTitle} />
        <IconButton onClick={() => removeTodolist(todoListId)}>
                <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm onAddItem={addTask} />
      <Box style={{padding: '15px 0'}}>
        {tasksForTodoList.map((task) => <Task key={task.id} item={task} todoListId={todoListId} />)}
      </Box>
      <Box>
        <Button
          variant={filterValue === 'all' ? 'contained' : 'text'}
          color={'inherit'}
          onClick={() => onHandleFilter('all', todoListId)}
        >
          All
        </Button>
        <Button
          variant={filterValue === 'active' ? 'contained' : 'text'}
          color={'primary'}
          onClick={() => onHandleFilter('active', todoListId)}
        >
          Active
        </Button>
        <Button
          variant={filterValue === 'completed' ? 'contained' : 'text'}
          color={'success'}
          onClick={() => onHandleFilter('completed', todoListId)}
        >
          Completed
        </Button>
      </Box>
    </Box>
  );
});
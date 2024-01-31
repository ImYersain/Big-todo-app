import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import { Box, Button, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { addTaskActionCreator, changeTaskStatusActionCreator, changeTaskTitleActionCreator, removeTaskActionCreator } from './store/tasksReducer';

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

export const Todolist = ({
  todoListId,
  title,
  onChangeFilter,
  filterValue,
  removeTodolist,
  onChangeTodoListTitle,
}: IProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppRootStateType) => state.tasks[todoListId]);

  const onDeleteTask = (id: string, todoListId: string) => {
    const action = removeTaskActionCreator(todoListId, id);
    dispatch(action);
  };

  const addTask = (title: string) => {   //обвертка для функции для того чтобы передвать туда еще айди, так как в  addItemForm функция не принимает атрибут айди
    const action = addTaskActionCreator(todoListId, title);
    dispatch(action);
  };
  const onChangeTodoTitle = (newTitle: string) => {
    onChangeTodoListTitle(newTitle, todoListId)
  }

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
        {tasks.map((item) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const action = changeTaskStatusActionCreator(todoListId, item.id, e.currentTarget.checked);
            dispatch(action);
          };
          const onChangeTitleHandler = (newTitle: string) => {
            const action = changeTaskTitleActionCreator(todoListId, item.id, newTitle);
            dispatch(action);
          };

          return (
            <Box key={item.id} className={item.isDone ? 'isDone' : ''}>
              <Checkbox
                checked={item.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan titleFromState={item.title} onChangeTitle={onChangeTitleHandler} />
              <IconButton size="small" onClick={() => onDeleteTask(item.id, todoListId)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button
          variant={filterValue === 'all' ? 'contained' : 'text'}
          color={'inherit'}
          onClick={() => onChangeFilter('all', todoListId)}
        >
          All
        </Button>
        <Button
          variant={filterValue === 'active' ? 'contained' : 'text'}
          color={'primary'}
          onClick={() => onChangeFilter('active', todoListId)}
        >
          Active
        </Button>
        <Button
          variant={filterValue === 'completed' ? 'contained' : 'text'}
          color={'success'}
          onClick={() => onChangeFilter('completed', todoListId)}
        >
          Completed
        </Button>
      </Box>
    </Box>
  );
};
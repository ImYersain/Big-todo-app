import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';
import { Box, Button, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ITask {
  id: string;
  title: string;
  isDone: boolean;
}
interface IProps {
  todoListId: string;
  title: string;
  tasks: ITask[];
  onDelete: (arg: string, todoListId: string) => void;
  onAddTask: (arg: string, todoListId: string) => void;
  onChangeFilter: (arg: FilterValuesType, id: string) => void;
  onChangeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void;
  onChangeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
  filterValue: FilterValuesType;
  removeTodolist: (todoListId: string) => void;
  onChangeTodoListTitle: (todoListId: string, newTitle: string) => void;
}

export const Todolist = ({
  todoListId,
  title,
  tasks,
  onDelete,
  onChangeFilter,
  onAddTask,
  onChangeTaskStatus,
  onChangeTaskTitle,
  filterValue,
  removeTodolist,
  onChangeTodoListTitle
}: IProps) => {
 
  const addTask = (title: string) => {   //обвертка для функции для того чтобы передвать туда еще айди, так как в  addItemForm функция не принимает атрибут айди
    onAddTask(title, todoListId);
  };
  const onChangeTodoTitle = (newTitle: string) => {
    onChangeTodoListTitle(newTitle, todoListId)
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
            onChangeTaskStatus(item.id, e.currentTarget.checked, todoListId);
          };
          const onChangeTitleHandler = (newTitle: string) => {
            onChangeTaskTitle(item.id, newTitle, todoListId);
          };

          return (
            <Box key={item.id} className={item.isDone ? 'isDone' : ''}>
              <Checkbox
                checked={item.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan titleFromState={item.title} onChangeTitle={onChangeTitleHandler} />
              <IconButton size="small" onClick={() => onDelete(item.id, todoListId)}>
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
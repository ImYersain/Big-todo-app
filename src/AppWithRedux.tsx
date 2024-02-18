import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {ITask, Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodolistActionCreator,
  changeTodolistFilterActionCreator,
  changeTodolistTitleActionCreator,
  removeTodolistActionCreator,
} from './store/todolistsReducer';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store/store';

export type FilterValuesType = 'all' | 'completed' | 'active';
export interface ITodoList {
  id: string;
  title: string;
  filter: FilterValuesType;
}
export type TasksStateType = {
  [key: string]: ITask[];
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const {todoLists} = useSelector((state: AppRootStateType) => state);

  const onChangeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
    const action = changeTodolistFilterActionCreator(todoListId, value);
    dispatch(action);
  }, []);
  console.log('app is called')

  const removeTodolist = useCallback((todoListId: string) => {
    const action = removeTodolistActionCreator(todoListId);
    dispatch(action);
  }, []);

  const onChangeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
    const action = changeTodolistTitleActionCreator(todoListId, newTitle);
    dispatch(action);
  }, []);

  const addTodoList = useCallback((title: string) => {
    const action = addTodolistActionCreator(title);
    dispatch(action);
  }, [dispatch]);

  if (!todoLists.length) {
    return <h1>Have not any todos ....</h1>;
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px 0'}}>
          <AddItemForm onAddItem={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((todo) => {
            return (
              <Grid item key={todo.id}>
                <Paper variant={'outlined'} style={{padding: '10px'}}>
                  <Todolist
                    key={todo.id}
                    todoListId={todo.id}
                    title={todo.title}
                    onChangeFilter={onChangeFilter}
                    filterValue={todo.filter}
                    removeTodolist={removeTodolist}
                    onChangeTodoListTitle={onChangeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;

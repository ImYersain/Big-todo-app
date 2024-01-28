import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ITask, Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = 'all' | 'completed' | 'active';
export interface ITodoList {
  id: string;
  title: string;
  filter: FilterValuesType;
}
export type TasksStateType = {
  [key: string]: ITask[];
};

function App() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      {
        id: v1(),
        title: 'HTML',
        isDone: false,
      },
      {
        id: v1(),
        title: 'CSS',
        isDone: true,
      },
      {
        id: v1(),
        title: 'JS',
        isDone: true,
      },
      {
        id: v1(),
        title: 'React',
        isDone: true,
      },
      {
        id: v1(),
        title: 'TS',
        isDone: false,
      },
    ],
    [todoListId2]: [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Bread', isDone: false},
    ],
  });

  const [todoLists, setTodoLists] = useState<ITodoList[]>([
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'},
  ]);

  const onDelete = (id: string, todoListId: string) => {
    let filteredTasks = tasks[todoListId].filter((i) => i.id !== id);
    tasks[todoListId] = filteredTasks;

    setTasks({...tasks});
  };

  const onAddTask = (title: string, todoListId: string) => {
    const newTask = {id: v1(), title, isDone: false}; // новая созданная таска
    let newTasks = [newTask, ...tasks[todoListId]]; // массив новых тасок, где иммутабельно меняем и вставляем новую таску + раскукоживаем страые таски
    tasks[todoListId] = newTasks; // и меняем в оригинальном массиве тасок по айди на новый массив

    setTasks({...tasks}); // сэтаем старый объект
  };

  const onChangeFilter = (value: FilterValuesType, todoListId: string) => {
    let todoList = todoLists.find((item) => item.id === todoListId); // map(создает новый массив, поэтому здесь не подходит) vs find(работает с оригинальным массивом и меняет его)
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const onChangeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
    tasks[todoListId].find((task) => {
      //выбираем из массива тудулистов по айди нужный нам тудулист, после в этом тудулисте находим нужную таску с помощью сравнения айдишников которые пришли как аргумент и делаем в ней изменения, после вызываем функцию задавания тасков чтобы изменить одну таску внутри и чтоб приложение перерисовалась на это изменение
      if (task.id === id) {
        task.isDone = isDone;
        setTasks({...tasks});
      }
      return null;
    });
  };

  const onChangeTaskTitle = (id: string, newTitle: string, todoListId: string) => {
    tasks[todoListId].find((task) => {
      if (task.id === id) {
        task.title = newTitle;
        setTasks({...tasks});
      }
      return null;
    });
  };

  const removeTodolist = (todoListId: string) => {
    let newTodoListsArray = todoLists.filter((todo) => todo.id !== todoListId);
    setTodoLists(newTodoListsArray);
    delete tasks[todoListId];
    setTasks({...tasks});
  };

  const onChangeTodoListTitle = (newTitle: string, todoListId: string) => {
    let todoList = todoLists.find((todo) => todo.id === todoListId); // не filter, фильтер фильтрует массив и возвращает новый массив как мап, мне же нужен конкретный обьект тудулист поэтому делаем метод find(возвращает найденный обьект)
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  const addTodoList = (title: string) => {
    let todoList: ITodoList = {id: v1(), title: title, filter: 'all'};
    setTodoLists([todoList, ...todoLists]);
    setTasks({...tasks, [todoList.id]: []});
  };

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
            let tasksForTodoList = tasks[todo.id];

            if (todo.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter((item) => item.isDone);
            }
            if (todo.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter((item) => !item.isDone);
            }

            return (
              <Grid item>
                <Paper variant={'outlined'} style={{padding: '10px'}}>
              <Todolist
                key={todo.id}
                todoListId={todo.id}
                title={todo.title}
                tasks={tasksForTodoList}
                onDelete={onDelete}
                onChangeFilter={onChangeFilter}
                onAddTask={onAddTask}
                onChangeTaskStatus={onChangeTaskStatus}
                onChangeTaskTitle={onChangeTaskTitle}
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

export default App;

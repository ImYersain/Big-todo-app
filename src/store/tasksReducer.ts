import {TasksStateType} from './../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from './todolistsReducer';

type AddTaskActionType = {
  type: 'ADD_TASK';
  todoListId: string;
  title: string;
};

type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS';
  todoListId: string;
  id: string;
  isDone: boolean;
};

type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE';
  todoListId: string;
  id: string;
  title: string;
};

type RemoveTaskActionType = {
  type: 'REMOVE_TASK';
  todoListId: string;
  taskId: string;
};

type ActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {
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
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'ADD_TASK': {
      let copyState = {...state};
      let tasks = copyState[action.todoListId];
      let newTask = {id: v1(), title: action.title, isDone: false};

      let newTasks = [newTask, ...tasks];
      copyState[action.todoListId] = newTasks;

      return copyState;
    }
    case 'CHANGE_TASK_STATUS': {
      let copyState = {...state};
      let tasks = copyState[action.todoListId];
      let task = tasks.find((item) => item.id === action.id);

      if (task) task.isDone = action.isDone;

      return copyState;
    }
    case 'CHANGE_TASK_TITLE': {
      let copyState = {...state};
      let tasks = copyState[action.todoListId];
      let task = tasks.find((item) => item.id === action.id);

      if (task) task.title = action.title;

      return copyState;
    }
    case 'REMOVE_TASK': {
      let copyState = {...state};
      let tasks = copyState[action.todoListId];
      let filteredTasks = tasks.filter((item) => item.id !== action.taskId);
      copyState[action.todoListId] = filteredTasks;

      return copyState;
    }
    case 'ADD_TODOLIST': {
      let copyState = {...state};
      copyState[action.newTodolistId] = [];

      return copyState;
    }
    case 'REMOVE_TODOLIST': {
      let copyState = {...state};
      delete copyState[action.id];

      return copyState;
    }
    default:
      return state;
  }
};

//ACTION CREATORS:
//Фабричные функции  - функция которая возвращает правильно сформированный объект /"Паттерн"/
export const removeTaskActionCreator = (todoListId: string, taskId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE_TASK',
    todoListId,
    taskId,
  };
};
export const addTaskActionCreator = (todoListId: string, title: string): AddTaskActionType => {
  return {
    type: 'ADD_TASK',
    todoListId,
    title,
  };
};
export const changeTaskStatusActionCreator = (
  todoListId: string,
  id: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE_TASK_STATUS',
    todoListId,
    id,
    isDone,
  };
};
export const changeTaskTitleActionCreator = (
  todoListId: string,
  id: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE_TASK_TITLE',
    todoListId,
    id,
    title,
  };
};

import {TasksStateType} from './../App';
import {
  addTaskActionCreator,
  changeTaskStatusActionCreator,
  changeTaskTitleActionCreator,
  removeTaskActionCreator,
  tasksReducer,
} from './tasksReducer';
import {addTodolistActionCreator, removeTodolistActionCreator} from './todolistsReducer';

test('should be added coorect task', () => {
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const action = addTaskActionCreator('todolistId2', 'bread');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].title).toBe('bread');
});

test('should be change correct task status', () => {
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const action = changeTaskStatusActionCreator('todolistId2', '2', true);
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'].length).toBe(3);
  expect(endState['todolistId2'][1].isDone).toBeTruthy();
});

test('should be change correct task title', () => {
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const action = changeTaskTitleActionCreator('todolistId2', '3', 'pickels');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'].length).toBe(3);
  expect(endState['todolistId2'][2].title).toBe('pickels');
});

test('should be corect remove task', () => {
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const action = removeTaskActionCreator('todolistId2', '2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every((item) => item.id !== '2')).toBeTruthy();
});

test('new array should be added when has been created new todolist', () => {
  const newTodolistTitle: string = 'New todolist';
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const endState = tasksReducer(startState, addTodolistActionCreator(newTodolistTitle));

  const keys = Object.keys(endState);
  const newKey = keys.find((item) => item != 'todolistId1' && item != 'todolistId2');
  if (!newKey) {
    throw Error('new key has not been added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('when we remove todolist by todolistId , we must to remove also tasks', () => {
  const startState: TasksStateType = {
    todolistId1: [
      {id: '1', title: 'css', isDone: false},
      {id: '2', title: 'js', isDone: false},
      {id: '3', title: 'html', isDone: true},
    ],
    todolistId2: [
      {id: '1', title: 'milk', isDone: false},
      {id: '2', title: 'chocolate', isDone: false},
      {id: '3', title: 'chips', isDone: true},
    ],
  };

  const action = removeTodolistActionCreator('todolistId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});

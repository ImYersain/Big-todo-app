import {ITodoList, TasksStateType} from '../AppWithRedux';
import {tasksReducer} from './tasksReducer';
import {addTodolistActionCreator, todolistsReducer} from './todolistsReducer';

test('id should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: ITodoList[] = [];

  const action = addTodolistActionCreator('new todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.newTodolistId);
  expect(idFromTodolists).toBe(action.newTodolistId);
});

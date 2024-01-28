import {FilterValuesType, ITodoList} from '../App';
import {
  addTodolistActionCreator,
  changeTodolistFilterActionCreator,
  changeTodolistTitleActionCreator,
  removeTodolistActionCreator,
  todolistsReducer,
} from './todolistsReducer';
import {v1} from 'uuid';

test('should be added coorect todolist', () => {
  const newTodolistTitle: string = 'New todolist';
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ITodoList[] = [
    {id: todolistId1, title: 'what need learning', filter: 'all'},
    {id: todolistId2, title: 'what need to buy', filter: 'all'},
  ];

  const endState = todolistsReducer(startState, addTodolistActionCreator(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('New todolist');
});

test('should be removed correct todolist', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ITodoList[] = [
    {id: todolistId1, title: 'what need learning', filter: 'all'},
    {id: todolistId2, title: 'what need to buy', filter: 'all'},
  ];

  const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('should correctly modify todolist title', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ITodoList[] = [
    {id: todolistId1, title: 'what need learning', filter: 'all'},
    {id: todolistId2, title: 'what need to buy', filter: 'all'},
  ];

  const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(todolistId2, 'new title'));
  // {
  //    HOW IT WAS, BEFORE I DID ACTION CREATORS:
  //   type: 'CHANGE_TODOLIST_TITLE',
  //   id: todolistId2,
  //   newTitle: 'new title',
  // }

  expect(endState.length).toBe(2);
  expect(endState[1].title).toBe('new title');
});

test('should correctly modify todolist filter', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();
  let newFilterValue: FilterValuesType = 'completed';

  const startState: ITodoList[] = [
    {id: todolistId1, title: 'what need learning', filter: 'all'},
    {id: todolistId2, title: 'what need to buy', filter: 'all'},
    {id: todolistId3, title: 'watch need to do', filter: 'all'},
  ];

  const endState = todolistsReducer(startState, changeTodolistFilterActionCreator(todolistId2, newFilterValue));

  expect(endState.length).toBe(3);
  expect(endState[1].filter).toBe('completed');
});

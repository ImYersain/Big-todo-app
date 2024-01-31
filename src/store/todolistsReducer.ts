import {v1} from 'uuid';
import {FilterValuesType, ITodoList} from '../AppWithRedux';

export type AddTodolistActionType = {
  type: 'ADD_TODOLIST';
  newTodolistId: string;
  newTodolistTitle: string;
};
type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE';
  id: string;
  newTitle: string;
};
type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER';
  id: string;
  newFilterValue: FilterValuesType;
};
export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST';
  id: string;
};

type ActionsType =
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | RemoveTodolistActionType;

export const todoListId1 = v1();
export const todoListId2 = v1();
const initialState: ITodoList[] = [
  {id: todoListId1, title: 'What to learn', filter: 'all'},
  {id: todoListId2, title: 'What to buy', filter: 'all'},
];

export const todolistsReducer = (state: ITodoList[] = initialState, action: ActionsType): Array<ITodoList> => {
  switch (action.type) {
    case 'ADD_TODOLIST':
      return [{id: action.newTodolistId, title: action.newTodolistTitle, filter: 'all'}, ...state];
    case 'CHANGE_TODOLIST_TITLE':
      let todoList = state.find((todo) => todo.id === action.id);
      if (todoList) {
        todoList.title = action.newTitle;
      }
      return [...state];
    case 'CHANGE_TODOLIST_FILTER':
      let findedTodoList = state.find((todo) => todo.id === action.id);
      if (findedTodoList) {
        findedTodoList.filter = action.newFilterValue;
      }
      return [...state];
    case 'REMOVE_TODOLIST':
      return state.filter((i) => i.id !== action.id);
    default:
      return state;
  }
};

//ACTION CREATORS:
//Фабричные функции  - функция которая возвращает правильно сформированный объект /"Паттерн"/
export const addTodolistActionCreator = (newTodolistTitle: string): AddTodolistActionType => {
  return {type: 'ADD_TODOLIST', newTodolistId: v1(), newTodolistTitle};
};
export const changeTodolistTitleActionCreator = (id: string, newTitle: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE_TODOLIST_TITLE', id, newTitle};
};
export const changeTodolistFilterActionCreator = (
  id: string,
  newFilterValue: FilterValuesType
): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE_TODOLIST_FILTER', id, newFilterValue};
};
export const removeTodolistActionCreator = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE_TODOLIST', id};
};

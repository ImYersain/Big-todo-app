import { todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;

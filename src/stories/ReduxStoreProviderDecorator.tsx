import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "../store/tasksReducer";
import { todolistsReducer } from "../store/todolistsReducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
});

const initialGlobalState = {
  tasks: {
    todoListId1: [
      {
        id: v1(),
        title: "HTML",
        isDone: false,
      },
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: true,
      },
      {
        id: v1(),
        title: "TS",
        isDone: false,
      },
    ],
    todoListId2: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
    ],
    todoListId3: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
    ],
    todoListId4: [
      { id: v1(), title: "Milk", isDone: false },
      { id: v1(), title: "Bread", isDone: false },
    ],
  },
  todoLists: [
    { id: "todoListId1", title: "What to learn", filter: "all" },
    { id: "todoListId2", title: "What to buy", filter: "all" },
    { id: "todoListId3", title: "What to play", filter: "all" },
    { id: "todoListId4", title: "What to take away", filter: "all" },
  ],
};

//fake state, only for testing on storybook:
const storybookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>;
};

import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "62e00a35-a71b-4a1c-b57a-e377af0a9ee0",
  },
});

//TODOLISTS
export type TodoListType = {
  id: string;
  title: string;
  addedData: string;
  order: number;
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export const todolistsAPI = {
  getTodolists: () => {
    const promise = instance.get<TodoListType[]>("todo-lists");

    return promise;
  },

  createTodolist: (title: string) => {
    const promise = instance.post<ResponseType<{ item: TodoListType }>>(
      "todo-lists",
      { title }
    );

    return promise;
  },

  deleteTodolist: (id: string) => {
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`);

    return promise;
  },

  updateTodolist: (id: string, newTitle: string) => {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {
      title: newTitle,
    });

    return promise;
  },
};

//TASKS
export type TaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
type GetTasksResponseType = {
  items: TaskType[];
  error: string | null;
  totalCount: number;
};
export type updateTaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export const tasksAPI = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  createTask: (todolistId: string, title: string) => {
    return instance.post<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  updateTask: (todolistId: string, taskId: string, data: updateTaskType) => {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      { ...data }
    );
  },
};

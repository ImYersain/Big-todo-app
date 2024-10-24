import { Meta } from "@storybook/react/*";
import axios from "axios";
import { useEffect, useState } from "react";
import { tasksAPI, todolistsAPI } from "../api/todolistsAPI";

const meta: Meta = {
  title: "Todolist api component",
};
export default meta;

export const GetTodolistStory = () => {
  const [state, setState] = useState<any>({ name: "Yersain" });

  useEffect(() => {
    todolistsAPI.getTodolists().then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const SetTodolistStory = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI
      .createTodolist("new todolist")
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolistStory = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI
      .deleteTodolist("a7c09fe4-ae36-42a7-9d27-e3404f5734ff")
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistStory = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI
      .updateTodolist(
        "53ebafb1-4cb7-4394-a2b1-2e4dabfedae1",
        "updated new title"
      )
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

///tasks
export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "53ebafb1-4cb7-4394-a2b1-2e4dabfedae1";

  useEffect(() => {
    tasksAPI.getTasks(todolistId).then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const createTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "53ebafb1-4cb7-4394-a2b1-2e4dabfedae1";

  useEffect(() => {
    tasksAPI
      .createTask(todolistId, "New task")
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const deleteTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "53ebafb1-4cb7-4394-a2b1-2e4dabfedae1";

  useEffect(() => {
    tasksAPI
      .deleteTask(todolistId, "1de9b6b6-4758-467e-b4cf-dd6595d45c64")
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const updateTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "53ebafb1-4cb7-4394-a2b1-2e4dabfedae1";

  useEffect(() => {
    tasksAPI
      .updateTask(todolistId, "228fee2b-06b4-45ab-982c-4fd1dd149057", {
        title: "NWE TASK 2024",
        deadline: "2024-10-23T15:09:35.547",
        description: "yo",
        priority: 2,
        startDate: "2024-10-23T15:09:35.547",
        status: 1,
      })
      .then((resp) => setState(resp.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

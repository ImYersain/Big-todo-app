import { Meta } from "@storybook/react/*";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "../stories/ReduxStoreProviderDecorator";

const meta: Meta<typeof Task> = {
  title: "Task component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  args: {
    item: {
      id: "1",
      title: "Task story",
      isDone: false,
    },
    todoListId: "1",
  },
};

export default meta;

// export const TaskStory = {
//   item: {
//     id: "1",
//     title: "Task story",
//     isDone: false,
//   },
//   todoListId: 3,
// };

export const TaskStory = (args: any) => {
  return <Task {...args} />;
};

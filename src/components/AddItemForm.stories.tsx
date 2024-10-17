import { Meta } from "@storybook/react/*";
import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof AddItemForm> = {
  title: "AddItemForm Component",
  component: AddItemForm,
};
export default meta;

export const AddItemFormStory = {
  args: {
    onAddItem: action("text test"),
  },
};

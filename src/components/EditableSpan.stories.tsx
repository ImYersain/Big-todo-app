import { Meta } from "@storybook/react/*";
import { EditableSpan } from "./EditableSpan";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof EditableSpan> = {
  title: "EditableSpan component",
  component: EditableSpan,
  args: {
    titleFromState: "Form1",
    onChangeTitle: action("new title"),
  },
};

export default meta;

// FIRST VARIANT (IN meta, args NO NEED WITH THIS VARIANT):
// export const EditableSpanStory = {
//   args: {
//     titleFromState: "Form1",
//     onChangeTitle: action("new title"),
//   },
// };

export const EditableSpanStory = (args: any) => <EditableSpan {...args} />;

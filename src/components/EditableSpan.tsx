import { TextField } from "@mui/material";
import { ChangeEvent, memo, useState } from "react";

interface IEditableSpanProps {
    titleFromState: string;
    onChangeTitle: (newTitle: string) => void;
  }
  export const EditableSpan = memo((props: IEditableSpanProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.titleFromState);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChangeTitle(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

   return (
    editMode ?
        <TextField variant={'standard'} onBlur={activateViewMode} value={title} onChange={onChangeTitleHandler} autoFocus size={'small'} />
        : <span onDoubleClick={activateEditMode}>{props.titleFromState}</span>
   )
  });
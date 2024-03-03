import { useDispatch } from "react-redux";
import { ITask } from "../Todolist";
import { ChangeEvent, FC, memo, useCallback } from "react";
import { changeTaskStatusActionCreator, changeTaskTitleActionCreator, removeTaskActionCreator } from "../store/tasksReducer";
import { Box, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "./EditableSpan";

type TaksPropsType = {
    item: ITask;
    todoListId: string;
  };
  export const Task: FC<TaksPropsType> = memo(({item, todoListId}) => {
    const dispatch = useDispatch();
    
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const action = changeTaskStatusActionCreator(todoListId, item.id, e.currentTarget.checked);
      dispatch(action);
    };

    const onChangeTitleHandler = useCallback((newTitle: string) => {
      const action = changeTaskTitleActionCreator(todoListId, item.id, newTitle);
      dispatch(action);
    }, [item.id, todoListId, dispatch]);

    const onDeleteTask = (id: string, todoListId: string) => {
      const action = removeTaskActionCreator(todoListId, id);
      dispatch(action);
    };
  
    return (
      <Box className={item.isDone ? 'isDone' : ''}>
        <Checkbox
          checked={item.isDone}
          onChange={onChangeStatusHandler}
        />
        <EditableSpan titleFromState={item.title} onChangeTitle={onChangeTitleHandler} />
        <IconButton size="small" onClick={() => onDeleteTask(item.id, todoListId)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  });
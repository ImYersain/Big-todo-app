import { ControlPoint } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { KeyboardEvent, useState, memo } from "react";

interface ItemProps {
  onAddItem: (value: string) => void;
}

export const AddItemForm = memo(function (props: ItemProps) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim()) {
      props.onAddItem(title); //метод для чистки строки, в данном случае будут обрезаться пробелы со строки(в начале и конце)
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Box>
      <TextField
        variant={"outlined"}
        label={"Add"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
        size={"small"}
      />
      {/* !! - булевое конвертированиe псевдоистинна если в строке что то есть и псевдоложь если в строке ничего нет  */}
      <IconButton onClick={addTask}>
        <ControlPoint />
      </IconButton>
    </Box>
  );
});

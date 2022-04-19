import React, { useId, useState } from "react";
import { atom, useSetRecoilState } from "recoil";
interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

export const todoListState = atom<TaskProps[]>({
  key: "TodoList",
  default: [],
});

const TodoCreator = () => {
  const id = useId();
  const setTodoList = useSetRecoilState(todoListState);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (!inputValue) return;
    const newItem = {
      id: `${id}-${Date.now()}`,
      title: inputValue,
      isComplete: false,
    };

    setTodoList((oldTodoList) => [...oldTodoList, newItem]);
    setInputValue("");
  };
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
    </>
  );
};
export default TodoCreator;

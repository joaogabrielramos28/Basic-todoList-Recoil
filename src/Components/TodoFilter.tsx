import React, { FormEvent } from "react";
import { atom, useRecoilState } from "recoil";

export const TodoFilterState = atom({
  key: "TodoFilter",
  default: "all",
});

const TodoFilter = () => {
  const [filter, setFilter] = useRecoilState(TodoFilterState);

  const handleChange = ({ target: { value } }: any) => {
    setFilter(value);
  };

  return (
    <select onChange={handleChange} value={filter}>
      <option value="all">Todos</option>
      <option value="completed">Finalizados</option>
      <option value="uncompleted">Pendentes</option>
    </select>
  );
};
export default TodoFilter;

import React from "react";
import "./App.css";
import { selector, useRecoilValue, useSetRecoilState } from "recoil";
import TodoCreator, { todoListState } from "./Components/TodoCreator";
import TodoFilter, { TodoFilterState } from "./Components/TodoFilter";

const filteredTodoListState = selector({
  key: "filteredTodoList",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const filter = get(TodoFilterState);

    switch (filter) {
      case "all":
        return todoList;
      case "completed":
        return todoList.filter((todo) => todo.isComplete);
      case "uncompleted":
        return todoList.filter((todo) => !todo.isComplete);
      default:
        return todoList;
    }
  },
});

function App() {
  const todoList = useRecoilValue(filteredTodoListState);
  const setTodoList = useSetRecoilState(todoListState);
  const changeCompleted = (id: string) => {
    setTodoList((oldTodoList) =>
      oldTodoList.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  return (
    <div className="App">
      <p>TodoList</p>
      <TodoFilter />

      <TodoCreator />
      {todoList.length === 0 && <h3>Ooops... Nenhuma task por aqui!</h3>}
      {todoList.map((todo) => (
        <div key={todo.id}>
          <p>
            {todo.title} {todo.isComplete ? "✅" : "❌"}{" "}
            <span onClick={() => changeCompleted(todo.id)}>Alterar!</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;

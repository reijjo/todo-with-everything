import "./Homepage.css";

import { Todo } from "../../utils/types";
import { Container, TextInputWithButton } from "../common";
import { TodoList } from "./TodoList";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export const Homepage = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      console.log("fetching list");
    };
    fetchList();
  });

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    console.log("todo", todo);
  };

  const createTodo = (e: SyntheticEvent) => {
    e.preventDefault();
    setList((prevList) => [
      ...prevList,
      { id: Date.now(), content: todo, done: false },
    ]);
    console.log("new todo", todo);

    setTodo("");
  };

  const updateTodo = (id: number, done: boolean) => {
    setList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  console.log("list", list);

  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do list</h1>
        <Container width="min(100%, 600px)" backgroundColor="transparent">
          <TextInputWithButton
            label="create todo"
            name="todo"
            id="todo"
            placeholder="What to do..."
            value={todo}
            onChange={handleTodoChange}
            width="75%"
            onClick={createTodo}
          />
          <TodoList
            list={list}
            setList={setList}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </Container>
      </div>
    </main>
  );
};

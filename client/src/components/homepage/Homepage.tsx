import "./Homepage.css";

import { todoApi } from "../../api/todoApi";
import { Todo } from "../../utils/types";
import { Container, TextInputWithButton } from "../common";
import { TodoList } from "./TodoList";

import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

export const Homepage = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await todoApi.allTodos();
        setList(response.data);
      } catch (error: unknown) {
        console.error("Error fetching all todos", error);
      }
    };
    fetchList();
  }, []);

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    console.log("todo", todo);
  };

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await todoApi.createTodo(todo);
      console.log("response", response.data);
      setList(list.concat(response.data));
      setTodo("");
    } catch (error: unknown) {
      console.error("Error creating todo", error);
    }
  };

  const updateTodo = async (id: number, done: boolean) => {
    try {
      await todoApi.updateTodo(id);
      setList((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
      );
    } catch (error: unknown) {
      console.error("Error updating todo", error);
    }
  };

  const deleteTodo = (id: number) => {
    try {
      todoApi.deleteTodo(id);
      setList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error: unknown) {
      console.error("Error deleting todo", error);
    }
  };

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

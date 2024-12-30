import "./Homepage.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";

import { useAddNewTodoMutation } from "../../features/api/apiSlice";
// import { addNewTodo } from "../../features/todos/todosSlice";
// import { useAppDispatch } from "../../store/hooks";
import { Container, TextInputWithButton } from "../common";
import { TodoList } from "./TodoList";

export const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [addNewTodo, { isLoading }] = useAddNewTodoMutation();

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;

    try {
      await addNewTodo({ content: todo }).unwrap();
      setTodo("");
    } catch (error: unknown) {
      console.log("Error creating todo", error);
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
            buttonText="add"
            onClick={createTodo}
            disabled={isLoading}
          />
          <TodoList />
        </Container>
      </div>
    </main>
  );
};

import "./Homepage.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";

// import { addNewTodo } from "../../features/todos/todosSlice";
// import { useAppDispatch } from "../../store/hooks";
import { Container, TextInputWithButton } from "../common";
import { TodoList } from "./TodoList";

export const Homepage = () => {
  const [todo, setTodo] = useState("");
  // const [addTodoStatus, setAddTodoStatus] = useState<"idle" | "pending">(
  //   "idle",
  // );

  // const dispatch = useAppDispatch();

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();

    // if (addTodoStatus === "pending") return;
    if (!todo.trim()) return;
    console.log("create todo", todo);
    // try {
    //   setAddTodoStatus("pending");
    //   await dispatch(addNewTodo({ content: todo })).unwrap(); // Unwrap only resolves the promise if there is no error
    //   setTodo("");
    // } catch (error: unknown) {
    //   console.log("Error creating todo", error);
    // } finally {
    //   setAddTodoStatus("idle");
    // }
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
          />
          <TodoList />
        </Container>
      </div>
    </main>
  );
};

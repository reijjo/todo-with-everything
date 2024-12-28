import "./Homepage.css";

import { ChangeEvent, SyntheticEvent, useState } from "react";

// Random ID generator
import { useDispatch } from "react-redux";

// import { todoApi } from "../../api/todoApi";
import { addTodo } from "../../features/todos/todosSlice";
// import { useAppSelector } from "../../store/hooks";
// import { Todo } from "../../utils/types";
import { Container, TextInputWithButton } from "../common";
import { TodoList } from "./TodoList";

export const Homepage = () => {
  // const [list, setList] = useState<Todo[]>([]);
  // const list = useAppSelector((state) => state.todos);
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchList = async () => {
  //     try {
  //       const response = await todoApi.allTodos();
  //       setList(response.data);
  //       console.log("THIS IS WHERE THE LIST IS FETCHED!");
  //     } catch (error: unknown) {
  //       console.error("Error fetching all todos", error);
  //     }
  //   };
  //   fetchList();
  // }, []);

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    console.log("todo", todo);
  };

  const createTodo = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(addTodo(todo));
    setTodo("");
  };

  // const createTodo = async (e: SyntheticEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await todoApi.createTodo(todo);
  //     console.log("response", response.data);
  //     setList(list.concat(response.data));
  //     setTodo("");
  //   } catch (error: unknown) {
  //     console.error("Error creating todo", error);
  //   }
  // };

  // const updateTodo = async (id: number, done: boolean) => {
  //   try {
  //     await todoApi.updateTodo(id);
  //     setList((prevTodos) =>
  //       prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
  //     );
  //   } catch (error: unknown) {
  //     console.error("Error updating todo", error);
  //   }
  // };

  // const deleteTodo = async (id: number) => {
  //   try {
  //     await todoApi.deleteTodo(id);
  //     setList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  //   } catch (error: unknown) {
  //     console.error("Error deleting todo", error);
  //   }
  // };

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
          <TodoList
          // list={list}
          // setList={setList}
          // updateTodo={updateTodo}
          // deleteTodo={deleteTodo}
          />
        </Container>
      </div>
    </main>
  );
};

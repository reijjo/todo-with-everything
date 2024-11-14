import "./TodoList.css";
import { Todo } from "./Todo";
import { Button, Container, TextInput } from "../common";
import { TodoLists } from "../../utils/types";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";

type TodoListProps = {
  activeList: TodoLists;
  setActiveList: Dispatch<SetStateAction<TodoLists | undefined>>;
  deleteList: (id: number) => void;
};

export const TodoList = ({
  activeList,
  setActiveList,
  deleteList,
}: TodoListProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTodoItem = {
      id: activeList.todos.length + 1,
      content: newTodo,
      done: false,
    };

    setActiveList({
      ...activeList,
      todos: [...activeList.todos, newTodoItem],
    });

    setNewTodo("");
  };

  const toggleTodoDone = (todoId: number) => {
    const updatedTodos = activeList.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    setActiveList({
      ...activeList,
      todos: updatedTodos,
    });
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodos = activeList.todos.filter((todo) => todo.id !== todoId);

    setActiveList({
      ...activeList,
      todos: updatedTodos,
    });
  };

  const allDone = activeList.todos.every((todo) => todo.done);

  console.log("activelist", activeList);

  return (
    <section className="todo-list">
      <h2>{activeList.title}</h2>
      <TextInput
        className="input-width-full"
        placeholder="Add something to do..."
        name="todo"
        id="todo"
        buttonText="Add"
        onChange={handleTodoChange}
        onClick={addTodo}
        value={newTodo}
      />
      <ul className="my-todos">
        {activeList.todos.map((todo) => (
          <li key={todo.id}>
            <Todo
              todo={todo}
              toggleTodoDone={toggleTodoDone}
              deleteTodo={deleteTodo}
            />
          </li>
        ))}
      </ul>
      {(allDone || activeList.todos.length === 0) && (
        <Container
          border="none"
          backgroundColor="transparent"
          boxShadow="none"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            children="delete list"
            className="btn btn-filled btn-delete"
            type="button"
            onClick={() => deleteList(activeList.id)}
          />
        </Container>
      )}
    </section>
  );
};

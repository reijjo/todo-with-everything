import "./TodoList.css";
import { Todo } from "./Todo";
import { TextInput } from "../common";
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
};

export const TodoList = ({ activeList, setActiveList }: TodoListProps) => {
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
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

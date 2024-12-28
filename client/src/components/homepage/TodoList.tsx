import "./TodoList.css";

import { findTodos } from "../../features/todos/todosSlice";
import { useAppSelector } from "../../store/hooks";
// import { Todo } from "../../utils/types";
import { TodoComponent } from "./TodoComponent";

// interface TodoListProps {
//   list: Todo[];
//   setList: (list: Todo[]) => void;
//   updateTodo?: (id: number, done: boolean) => void;
//   deleteTodo?: (id: number) => void;
// }

// export const TodoList = ({ list, updateTodo, deleteTodo }: TodoListProps) => {
// export const TodoList = ({ list }: TodoListProps) => {
export const TodoList = () => {
  const todos = useAppSelector(findTodos); // Gets the todos from the Redux store

  console.log("todos", todos);
  // console.log("list", list);

  return (
    <div className="todo-list" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

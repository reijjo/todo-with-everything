import "./TodoList.css";

import { Todo } from "../../utils/types";
import { TodoComponent } from "./TodoComponent";

interface TodoListProps {
  list: Todo[];
  setList: (list: Todo[]) => void;
  updateTodo: (id: number, done: boolean) => void;
  deleteTodo: (id: number) => void;
}

export const TodoList = ({ list, updateTodo, deleteTodo }: TodoListProps) => {
  return (
    <div className="todo-list">
      {list.map((todo) => (
        <TodoComponent
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

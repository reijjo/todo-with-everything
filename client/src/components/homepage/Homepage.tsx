import "./Homepage.css";
import { TodoList } from "../Todo";
import { useEffect, useState } from "react";
import { TodoLists } from "../../utils/types";
import { CreateNewList } from "./CreateNewList";

export const Homepage = () => {
  const [todoList, setTodoList] = useState<TodoLists[]>([]);
  const [activeList, setActiveList] = useState<TodoLists>();

  useEffect(() => {
    setActiveList(todoList.find((list) => list.id === todoList.length));
  }, [todoList]);

  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do lists</h1>
        {todoList.length === 0 ? (
          <CreateNewList todoList={todoList} setTodoList={setTodoList} />
        ) : (
          <ul className="todo-lists">
            {todoList.map((list) => (
              <a key={list.id} onClick={() => setActiveList(list)}>
                <li>{list.title}</li>
              </a>
            ))}
          </ul>
        )}
        {todoList.length > 0 && activeList && (
          <TodoList activeList={activeList} setActiveList={setActiveList} />
        )}
      </div>
    </main>
  );
};

import "./Homepage.css";
import { TodoList } from "../Todo";
import { useEffect, useState } from "react";
import { TodoLists } from "../../utils/types";
import { CreateNewList } from "./CreateNewList";
import { Container } from "../common";
import { listApi } from "../../api/listApi";

export const Homepage = () => {
  const [todoList, setTodoList] = useState<TodoLists[]>([]);
  const [activeId, setActiveId] = useState<number>(0);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await listApi.getLists();
      setTodoList(response.data);
    };

    fetchLists();
  }, []);

  // useEffect(() => {
  //   setActiveList(todoList.find((list) => list.id === todoList.length));
  // }, [todoList]);

  const deleteList = (id: number) => {
    const listToDelete = todoList.find((list) => list.id === id);

    if (listToDelete) {
      setTodoList(todoList.filter((list) => list.id !== listToDelete.id));
    }
  };

  console.log("todolist", todoList);
  console.log("activeId", activeId);

  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do lists</h1>
        {todoList?.length === 0 ? (
          <Container width="50%">
            <CreateNewList todoList={todoList} setTodoList={setTodoList} />
          </Container>
        ) : (
          <ul className="todo-lists">
            {todoList?.map((list) => (
              <a key={list.id} onClick={() => setActiveId(list.id)}>
                <li>{list.title}</li>
              </a>
            ))}
          </ul>
        )}
        {todoList.length > 0 && activeId !== 0 && (
          <TodoList activeId={activeId} deleteList={deleteList} />
        )}
      </div>
    </main>
  );
};

import "./Homepage.css";
import { TextInput } from "../common";
import { TodoList } from "../Todo";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { TodoLists } from "../../utils/types";

export const Homepage = () => {
  const [newList, setNewList] = useState("");
  const [todoList, setTodoList] = useState<TodoLists[]>([]);
  const [activeList, setActiveList] = useState<TodoLists>();

  useEffect(() => {
    setActiveList(todoList.find((list) => list.id === todoList.length));
  }, [todoList]);

  const handleCreateNewList = (e: ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };

  const createNewList = (e: SyntheticEvent) => {
    e.preventDefault();

    setTodoList([
      ...todoList,
      { id: todoList.length + 1, title: newList, todos: [] },
    ]);

    setNewList("");
  };

  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do lists!</h1>
        <div className="create-new-list">
          <TextInput
            name="newList"
            id="newList"
            placeholder="Create new list..."
            labelText="List name"
            // optional
            className="input-width-l"
            // iconName="plus"
            buttonText="Create"
            onChange={handleCreateNewList}
            onClick={createNewList}
            value={newList}
          />
        </div>

        <ul className="todo-lists">
          {todoList.map((list) => (
            <a key={list.id} onClick={() => setActiveList(list)}>
              <li>{list.title}</li>
            </a>
          ))}
        </ul>
        {todoList.length > 0 && activeList && (
          <TodoList activeList={activeList} setActiveList={setActiveList} />
        )}
      </div>
    </main>
  );
};

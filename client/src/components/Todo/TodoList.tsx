import "./TodoList.css";
import { Todo } from "./Todo";
import { Button, Container, TextInput } from "../common";
import { TodoLists } from "../../utils/types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { listApi } from "../../api/listApi";

type TodoListProps = {
  activeId: number;
  deleteList: (id: number) => void;
};

export const TodoList = ({ activeId, deleteList }: TodoListProps) => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState<TodoLists>({
    id: 0,
    title: "",
    todos: [],
  });

  useEffect(() => {
    console.log("useEffect");
    const fetchList = async () => {
      const response = await listApi.getOneList(activeId);
      setTodoList(response.data);
    };

    fetchList();
    console.log("useEffect loppui");
  }, [activeId]);

  console.log("activeId", activeId);

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e: SyntheticEvent) => {
    e.preventDefault();

    // const newTodoItem = {
    //   // id: activeList.todos.length + 1,
    //   content: newTodo,
    //   done: false,
    // };

    // setActiveList({
    //   ...activeList,
    //   todos: [...activeList.todos, newTodoItem],
    // });

    setNewTodo("");
  };

  const toggleTodoDone = (todoId: number) => {
    const updatedTodos = todoList.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.done = !todo.done;
      }
      return todo;
    });

    setTodoList({
      ...todoList,
      todos: updatedTodos,
    });
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodos = todoList.todos.filter((todo) => todo.id !== todoId);

    setTodoList({
      ...todoList,
      todos: updatedTodos,
    });
  };

  const allDone = todoList.todos?.every((todo) => todo.done);

  console.log("todoList", todoList.todos?.length ?? 5);

  return (
    <section className="todo-list">
      <h2>{todoList.title}</h2>
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
      {todoList.todos?.length > 0 && (
        <ul className="my-todos">
          {todoList.todos.map((todo) => (
            <li key={todo.id}>
              <Todo
                todo={todo}
                toggleTodoDone={toggleTodoDone}
                deleteTodo={deleteTodo}
              />
            </li>
          ))}
        </ul>
      )}
      {(allDone || todoList.todos?.length === 0) && (
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
            onClick={() => deleteList(activeId)}
          />
        </Container>
      )}
    </section>
  );
};

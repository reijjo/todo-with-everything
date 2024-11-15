import "./TodoList.css";
import { Todo } from "./Todo";
import { Button, Container, TextInput } from "../common";
import { TodoLists } from "../../utils/types";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { listApi } from "../../api/listApi";
import { todoApi } from "../../api/todoApi";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await listApi.getOneList(activeId);
        setTodoList(response.data);
      } catch (error: unknown) {
        console.log("Error fetching list: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [activeId]);

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      console.log("Todo content is required");
      return;
    }

    try {
      const response = await todoApi.createTodo(activeId, newTodo);
      console.log(response);
    } catch (error: unknown) {
      console.log("Error creating todo: ", error);
    }
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
      {(allDone || todoList.todos.length === 0) && !loading && (
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

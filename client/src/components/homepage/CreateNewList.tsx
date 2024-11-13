import { ChangeEvent, SyntheticEvent, useState } from "react";
import { TextInput } from "../common";
import { TodoLists } from "../../utils/types";

type CreateNewListProps = {
  todoList: TodoLists[];
  setTodoList: (value: TodoLists[]) => void;
};

export const CreateNewList = ({
  todoList,
  setTodoList,
}: CreateNewListProps) => {
  const [inputErrors, setInputErrors] = useState<string[]>([]);
  const [newList, setNewList] = useState("");

  const handleCreateNewList = (e: ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };

  const createNewList = (e: SyntheticEvent) => {
    e.preventDefault();

    const errorMessages = [];

    if (!newList.trim()) {
      console.log("CANT BE EMPTY!");
      errorMessages.push("List name can't be empty");
    }

    if (errorMessages.length > 0) {
      setInputErrors(errorMessages);
      return;
    }

    setTodoList([
      ...todoList,
      { id: todoList.length + 1, title: newList, todos: [] },
    ]);

    setNewList("");
    setInputErrors([]);
  };

  return (
    <div className="create-new-list">
      <TextInput
        name="newList"
        id="newList"
        placeholder="Create new list..."
        labelText="List name"
        className={`input-width-l ${
          inputErrors.length > 0 ? "input-error" : ""
        }`}
        buttonText="Create"
        onChange={handleCreateNewList}
        onClick={createNewList}
        value={newList}
        errorMessage={inputErrors}
      />
    </div>
  );
};

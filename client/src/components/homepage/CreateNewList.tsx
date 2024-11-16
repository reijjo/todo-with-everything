import "./CreateNewList.css";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { TextInput } from "../common";
import { TodoLists } from "../../utils/types";
import { listApi } from "../../api/listApi";

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

  const handleListChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewList(e.target.value);
  };

  // Create new list
  const createNewList = async (e: SyntheticEvent) => {
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

    try {
      const response = await listApi.createList(newList);
      console.log("created list", response);

      setTodoList([...todoList, { id: 0, title: newList, todos: [] }]);

      setNewList("");
      setInputErrors([]);
    } catch (error: unknown) {
      console.log("Error creating list: ", error);
    }
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
        onChange={handleListChange}
        onClick={createNewList}
        value={newList}
        errorMessage={inputErrors}
      />
    </div>
  );
};

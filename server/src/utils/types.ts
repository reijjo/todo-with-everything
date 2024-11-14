export type TodoContent = {
  id: number;
  content: string;
  done: boolean;
};

export type TodoLists = {
  id: number;
  title: string;
  todos: TodoContent[];
};

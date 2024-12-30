export interface StyleProps {
  width?: string;
  height?: string;
  border?: string;
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  display?: string;
  justifyContent?: string;
}

export interface Todo {
  id: number | string;
  content: string;
  done: boolean;
}

export interface TodosResponse {
  data: Todo[];
  ok: boolean;
  message: string;
}

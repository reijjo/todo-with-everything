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
  id: number;
  content: string;
  done: boolean;
}

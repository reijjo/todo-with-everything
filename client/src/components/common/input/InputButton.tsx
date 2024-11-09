import { SyntheticEvent } from "react";

type InputButtonProps = {
  buttonText: string;
  onClick: (e: SyntheticEvent) => void;
};

export const InputButton = ({ buttonText, onClick }: InputButtonProps) => {
  return (
    <div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

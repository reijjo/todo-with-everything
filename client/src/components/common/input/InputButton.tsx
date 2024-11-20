import { SyntheticEvent } from "react";

type InputButtonProps = {
  buttonText: string;
  onClick: (e: SyntheticEvent) => void;
};

export const InputButton = ({ buttonText, onClick }: InputButtonProps) => {
  return (
    <div className="text-input-button-container">
      <button className="montserrat-style" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

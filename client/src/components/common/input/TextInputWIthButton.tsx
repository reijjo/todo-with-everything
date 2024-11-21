import "./TextInput.css";

import { StyleProps } from "../../../utils/types";
import { InputButton } from "./InputButton";

import { InputHTMLAttributes, SyntheticEvent } from "react";

interface TextInputWithButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "width" | "height">,
    StyleProps {
  name: string;
  id: string;
  label: string;
  showLabel?: boolean;
  onClick: (e: SyntheticEvent) => void;
}

export const TextInputWithButton = ({
  name,
  id,
  label,
  showLabel = true,
  width = "100%",
  height = "2.5rem",
  backgroundColor = "white",
  onClick,
  ...props
}: TextInputWithButtonProps) => {
  return (
    <div className="text-input-container">
      <div className="text-input-wrapper" style={{ width }}>
        {showLabel && (
          <label htmlFor={id} className="montserrat-style">
            {label}
          </label>
        )}
        <div className="text-input-button-wrapper">
          <input
            type="text"
            name={name}
            id={id}
            {...props}
            style={{
              height: height,
              backgroundColor: backgroundColor,
            }}
          />
          <InputButton buttonText="add" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
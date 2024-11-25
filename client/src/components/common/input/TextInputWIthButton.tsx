import "./TextInput.css";

import { useScreenWidth } from "../../../hooks/useScreenWidth";
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
  buttonText: string;
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
  buttonText,
  onClick,
  ...props
}: TextInputWithButtonProps) => {
  const isMobile = useScreenWidth();

  return (
    <div className="text-input-container">
      <div
        className="text-input-wrapper"
        style={{ width: isMobile ? "100%" : width }}
      >
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
          <InputButton buttonText={buttonText} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

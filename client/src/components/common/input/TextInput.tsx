import "./TextInput.css";

import { StyleProps } from "../../../utils/types";

import { InputHTMLAttributes } from "react";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "width" | "height">,
    StyleProps {
  name: string;
  id: string;
  label: string;
  showLabel?: boolean;
}

export const TextInput = ({
  name,
  id,
  label,
  showLabel = true,
  width = "100%",
  height = "2.5rem",
  backgroundColor = "white",
  ...props
}: TextInputProps) => {
  return (
    <div className="text-input-container">
      <div className="text-input-wrapper" style={{ width }}>
        {showLabel && (
          <label htmlFor={id} className="montserrat-style">
            {label}
          </label>
        )}
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
      </div>
    </div>
  );
};

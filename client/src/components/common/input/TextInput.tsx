import "./TextInput.css";
import { ChangeEvent, SyntheticEvent } from "react";
import { IconProps } from "../icon/Icon";
import { Label } from "./Label";
import { InputIcon } from "./InputIcon";
import { InputButton } from "./InputButton";

interface TextInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  name: string;
  id: string;
  labelText?: string;
  optional?: boolean;
  iconName?: IconProps["name"];
  buttonText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: SyntheticEvent) => void;
}

export const TextInput = ({
  labelText,
  placeholder,
  className,
  value,
  name,
  id,
  optional,
  iconName,
  buttonText,
  onChange,
  onClick,
}: TextInputProps) => {
  return (
    <div className={`text-input-wrapper ${className}`}>
      <div className="input-label">
        {labelText && (
          <Label labelText={labelText} id={id} optional={optional} />
        )}
        <div className="input-extra">
          <input
            placeholder={placeholder}
            type="text"
            value={value}
            name={name}
            id={id}
            onChange={onChange}
          />
          {iconName && <InputIcon iconName={iconName} />}
        </div>
      </div>
      {buttonText && <InputButton buttonText={buttonText} onClick={onClick} />}
    </div>
  );
};

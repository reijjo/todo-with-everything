import "./TextInput.css";
import { ChangeEvent } from "react";
import { Icon, IconProps } from "../icon/Icon";

interface TextInputProps {
  labelText?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  name: string;
  id: string;
  optional?: boolean;
  iconName?: IconProps["name"];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  onChange,
}: TextInputProps) => {
  return (
    <div className={`text-input-wrapper ${className}`}>
      <div className="todo-optional">
        {labelText && <label htmlFor={id}>{labelText}</label>}
        {optional && <p className="optional">(optional)</p>}
      </div>
      <div className="input-extra">
        <input
          placeholder={placeholder}
          type="text"
          value={value}
          name={name}
          id={id}
          onChange={onChange}
        />
        {iconName && (
          <span>
            <Icon name={iconName} size={20} />{" "}
          </span>
        )}
      </div>
    </div>
  );
};

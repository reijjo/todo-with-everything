import "./IconButton.css";
import { Icon, IconProps } from "../icon/Icon";
import { CSSProperties } from "react";

type IconButtonProps = {
  iconName: IconProps["name"];
  size?: number;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
};

export const IconButton = ({
  iconName,
  size,
  onClick,
  style,
  disabled,
}: IconButtonProps) => {
  return (
    <button
      className="btn-icon"
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <div>
        <Icon size={size} name={iconName} />
      </div>
    </button>
  );
};

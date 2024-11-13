import "./IconButton.css";
import { Icon, IconProps } from "../icon/Icon";
import { CSSProperties } from "react";

type IconButtonProps = {
  iconName: IconProps["name"];
  size?: number;
  style?: CSSProperties;
  onClick?: () => void;
};

export const IconButton = ({
  iconName,
  size,
  onClick,
  style,
}: IconButtonProps) => {
  return (
    <button className="btn-icon" onClick={onClick} style={style}>
      <div>
        <Icon size={size} name={iconName} />
      </div>
    </button>
  );
};

import "./IconButton.css";
import { Icon, IconProps } from "../icon/Icon";

type IconButtonProps = {
  iconName: IconProps["name"];
  size?: number;
};

export const IconButton = ({ iconName, size }: IconButtonProps) => {
  return (
    <button className="btn-icon">
      <div>
        <Icon size={size} name={iconName} />
      </div>
    </button>
  );
};

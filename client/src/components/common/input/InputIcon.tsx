import { Icon, IconProps } from "../icon/Icon";

type InputIconProps = {
  iconName: IconProps["name"];
  size?: number;
};

export const InputIcon = ({ iconName, size }: InputIconProps) => (
  <span>
    <Icon name={iconName} size={size || 20} />{" "}
  </span>
);

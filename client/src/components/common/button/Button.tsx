import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export const Button = ({
  children,
  type,
  className,
  onClick,
  style,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

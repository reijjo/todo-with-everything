import { CSSProperties } from "react";

type DividerProps = {
  padding: number;
  color?: string;
  thickness?: string;
};

export const Divider = ({
  padding,
  color = "var(--primary)",
  thickness = "1px",
}: DividerProps) => {
  const style: CSSProperties = {
    padding: `${padding}px 0`,
    width: "100%",
    backgroundColor: "transparent",
  };

  const dividerStyle: CSSProperties = {
    borderTop: `${thickness} solid ${color}`,
    margin: 0,
    width: "100%",
  };
  return (
    <div style={style}>
      <hr className="divider" style={dividerStyle} />
    </div>
  );
};

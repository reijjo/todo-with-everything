import "./Divider.css";
import { CSSProperties } from "react";

type DividerProps = {
  margin: number | CSSProperties;
  hasText?: boolean;
};

export const Divider = ({ margin }: DividerProps) => {
  const style =
    typeof margin === "number" ? { margin: `${margin}px 0` } : margin;
  return <hr className="divider" style={style} />;
};

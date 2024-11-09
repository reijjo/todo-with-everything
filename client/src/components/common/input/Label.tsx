type LabelProps = {
  labelText?: string;
  id: string;
  optional?: boolean;
};

export const Label = ({ labelText, id, optional }: LabelProps) => (
  <div className="todo-optional">
    {labelText && <label htmlFor={id}>{labelText}</label>}
    {optional && <p className="optional">(optional)</p>}
  </div>
);

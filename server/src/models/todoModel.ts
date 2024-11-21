import { sequelize } from "../utils/db/db";
import type { TodoAttributes } from "../utils/types";
import { DataTypes, Model, type Optional } from "sequelize";

// Mark `id` as optional since it will be auto-generated
export interface TodoCreation extends Optional<TodoAttributes, "id"> {}

class Todo
  extends Model<TodoAttributes, TodoCreation>
  implements TodoAttributes
{
  public id!: number; // `!` tells TypeScript this field is required
  public content!: string;
  public done!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "todo",
  },
);

export { Todo };

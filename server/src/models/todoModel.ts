import { sequelize } from "../utils/db/db";
import type { Todo } from "../utils/types";
import { DataTypes, Model, type Optional } from "sequelize";

export interface TodoInput extends Optional<Todo, "id" | "done"> {}

class TodoModel extends Model<Todo, TodoInput> implements Todo {
  id!: number;
  content!: string;
  done!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TodoModel.init(
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
		tableName: "todos",
  },
);

export { TodoModel };

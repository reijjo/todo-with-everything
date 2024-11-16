import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db/db";

class Todos extends Model {}

Todos.init(
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
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "lists", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
  }
);

export { Todos };

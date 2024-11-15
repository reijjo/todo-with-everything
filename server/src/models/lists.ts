import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db/db";

class Lists extends Model {}

Lists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
  }
);

export { Lists };

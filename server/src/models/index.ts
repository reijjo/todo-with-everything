import { sequelize } from "../utils/db/db";
import { Lists } from "./lists";
import { Todos } from "./todos";

Lists.hasMany(Todos, {
  foreignKey: "listId",
  as: "todos",
});
Todos.belongsTo(Lists, {
  foreignKey: "listId",
  as: "list",
});

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

syncDatabase();

export { Lists, Todos };

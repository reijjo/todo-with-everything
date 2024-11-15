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

Lists.sync({ alter: true });
Todos.sync({ alter: true });

export { Lists, Todos };

import { Lists } from "./lists";
import { Todos } from "./todos";

Lists.hasMany(Todos, {
  foreignKey: "listId",
});
Todos.belongsTo(Lists, {
  foreignKey: "listId",
});

Lists.sync({ alter: true });
Todos.sync({ alter: true });

export { Lists, Todos };

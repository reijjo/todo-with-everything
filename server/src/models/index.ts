import { Todos } from "./todos";

// Lists.hasMany(Todos, {
//   foreignKey: "listId",
//   as: "todos",
// });
// Todos.belongsTo(Lists, {
//   foreignKey: "listId",
//   as: "list",
// });

Todos.sync({ alter: true });

// const syncDatabase = async () => {
//   await sequelize.sync({ alter: true });
// };

// syncDatabase();

export { Todos };

import { Sequelize } from "sequelize";
import { config } from "../config";
import { cyanBright } from "colorette";

const { DATABASE_URL } = config;

console.log(DATABASE_URL);

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(cyanBright("Connected to database."));
  } catch (error: unknown) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
};

import { Sequelize } from "sequelize";
import { config } from "./config";
import { cyanBright } from "colorette";

const { DATABASE_URL } = config;

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(cyanBright("Connected to database."));
  } catch (error: unknown) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }
};

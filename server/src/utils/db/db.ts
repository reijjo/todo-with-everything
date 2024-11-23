import { Sequelize } from "sequelize";
import { config } from "../config";
import { cyanBright } from "colorette";

const { DATABASE_URL, DATABASE_TEST_URL } = config;
const URL = Bun.env.NODE_ENV === "test" ? DATABASE_TEST_URL : DATABASE_URL;

console.log("DATA", URL);


export const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  logging: console.log,
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

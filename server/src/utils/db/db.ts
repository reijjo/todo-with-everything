import { Sequelize } from "sequelize";
import { config } from "../config";
import { cyanBright, yellowBright } from "colorette";

const { DATABASE_URL, DATABASE_TEST_URL } = config;
// const isTestEnv = Bun.env.NODE_ENV === "test" || Bun.env.NODE_ENV === "testcicd"
const URL =  Bun.env.NODE_ENV === "test" ? DATABASE_TEST_URL : DATABASE_URL;

console.log(yellowBright("Environment:"), Bun.env.NODE_ENV);
console.log(yellowBright("Using Database URL:"), URL);


export const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  logging: false,
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
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error('Database connection failed: ' + String(error));
		}
  }
}

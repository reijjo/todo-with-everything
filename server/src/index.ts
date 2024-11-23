import * as http from "http";
import { magentaBright, yellowBright } from "colorette";
import { connectToDB } from "./utils/db/db";
import app from "./app";
import { config } from "./utils/config";

const { PORT, TEST_PORT } = config;
const PORT_TO_USE = Bun.env.NODE_ENV === "test" ? TEST_PORT : PORT;

const server = http.createServer(app);

const start = async () => {
  try {
    await connectToDB();

    server.listen(PORT_TO_USE, () => {
      console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
      console.log(magentaBright(`Server on port ${PORT_TO_USE}.`));
    });
  } catch (error: unknown) {
    throw error;
  }
};

start();

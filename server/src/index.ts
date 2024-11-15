import * as http from "http";
import { magentaBright, yellowBright } from "colorette";
import { connectToDB } from "./utils/db/db";
import app from "./app";
import { config } from "./utils/config";

const { PORT } = config;

const server = http.createServer(app);

const start = async () => {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
    console.log(magentaBright(`Server on port ${PORT}.`));
  });
};

start();

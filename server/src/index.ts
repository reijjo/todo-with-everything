import * as http from "http";
import { magentaBright, yellowBright } from "colorette";
import { connectToDB } from "./utils/db/db";
import app from "./app";
import { config } from "./utils/config";

const { PORT, TEST_PORT } = config;
const PORT_TO_USE = Bun.env.NODE_ENV === "testcicd" ? TEST_PORT : PORT;

console.log('port-to-use', PORT_TO_USE);

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
		// console.error('Failed to start server', error);
    // return process.exit(1);

  }
};

process.on("uncaughtException", (error) => {
	console.error("Uncaught exception:", error);
	process.exit(1);
});

start().catch((error) => {
	console.error('Failed to start server', error);
	return process.exit(1);
})

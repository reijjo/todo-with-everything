type EnvConfig = {
  PORT: number;
	TEST_PORT: number;
  DATABASE_URL: string;
	DATABASE_TEST_URL: string;
};

const { PORT, TEST_PORT, DATABASE_URL, DATABASE_TEST_URL } = Bun.env;

export const config: EnvConfig = {
  PORT: PORT ? parseInt(PORT) : 3001,
	TEST_PORT: TEST_PORT ? parseInt(TEST_PORT) : 3000,
  DATABASE_URL: DATABASE_URL as string,
	DATABASE_TEST_URL: DATABASE_TEST_URL as string
};

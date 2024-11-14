type EnvConfig = {
  PORT: number;
  DATABASE_URL: string;
};

const { PORT, DATABASE_URL } = Bun.env;

export const config: EnvConfig = {
  PORT: PORT ? parseInt(PORT) : 3000,
  DATABASE_URL: DATABASE_URL as string,
};

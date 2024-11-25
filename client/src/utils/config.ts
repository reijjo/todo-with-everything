interface EnvConfig {
  BASE_URL: string;
  TEST_URL: string;
  URL: string;
}

const { VITE_BASE_URL, VITE_TEST_URL, VITE_NODE_ENV } = import.meta.env;

const BASE_URL = VITE_BASE_URL;
const TEST_URL = VITE_TEST_URL;
const URL = VITE_NODE_ENV === "testcicd" ? VITE_TEST_URL : VITE_BASE_URL;

export const config: EnvConfig = {
  BASE_URL: BASE_URL as string,
  TEST_URL: TEST_URL as string,
  URL: URL as string,
};

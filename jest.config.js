/** @type {import ('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: [],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};

module.exports = jestConfig;

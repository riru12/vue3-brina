export default {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.(js|ts)$': 'babel-jest',
    },
    moduleFileExtensions: ['vue', 'js', 'ts', 'json'],
    testPathIgnorePatterns: [
      "/quasar-project/e2e/" // ignore playwright tests
    ],
  };
  
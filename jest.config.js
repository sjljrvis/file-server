module.exports = {
  roots: ['test'],
  globalSetup: "./test/setup.js",
  globalTeardown: "./test/teardown.js",
  testPathIgnorePatterns: ["/node_modules/"],
  testTimeout: 5000,
};
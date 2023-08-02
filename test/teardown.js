module.exports = function teardown() {
  console.log('Teardown')
  process.kill(globalThis.__INTEG_TEST_SERVER_PID__);
};
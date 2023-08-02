const { spawn } = require("child_process");

const path = require("path");
const _path = path.join(process.env.PWD, "index.js");

module.exports = () => {
  const child = spawn("node", [_path], {});
  globalThis.__INTEG_TEST_SERVER_PID__ = child.pid;
  child.stdout.on("data", (data) => {
    const str = data.toString();
    console.log("[server]", str);
  });
};

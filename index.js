const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("./db");
global.__base = __dirname;

app.use("/api", require("./routes"));
app.listen(5555, () => {
  console.log("Server listening to port 5555");
});

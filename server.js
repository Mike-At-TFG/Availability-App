const express = require("express");
const server = express();
const router = express.Router();

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.use(express.static(__dirname + "/"));
server.use("/", router);

const port = 8080;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

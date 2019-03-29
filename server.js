const express = require("express");
const actionRouter = require("./data/actions/action-router");
const projectRouter = require("./data/projects/project-router");

const server = express();

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send("sanity check 123");
});

module.exports = server;

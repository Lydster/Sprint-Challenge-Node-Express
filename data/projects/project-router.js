const express = require("express");

const Projects = require("../helpers/projectModel.js");

const router = express.Router();

//GET ALL

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving projects" });
  }
});

module.exports = router;

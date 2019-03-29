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

//ADD

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    req.status(400).json({ message: "Please Provide a name and description." });
  }
  try {
    newProject = await Projects.insert(req.body);
    res.status(201).json({ message: "Successfully Added!" });
  } catch (error) {
    res.status(500).json({ errorMessage: "A server error occured." });
  }
});

module.exports = router;

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

//GET ONE

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while trying to retrieve that action" });
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

//UPDATE
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { name, description } = changes;

  if (!name || !description) {
    req.status(400).json({
      message: "Please provide a name and description."
    });
  }
  try {
    const updated = await Projects.update(id, changes);
    res.status(200).json({ message: `Project was successfully updated` });
  } catch (error) {
    res.status(500).json({ message: "An error occured while updating" });
  }
});

//DELETE
router.delete("/:id", async (res, req) => {
  const id = req.params.id;
  Projects.remove(id)
    .then(project => {
      if (id) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "The project with this id does not exist" });
      }
    })
    .catch(err => {
      res.status(505).json({ message: "error deleting project" });
    });
});

//GET PROJECT ACTIONS

router.get("/:id/actions", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const project = await Projects.get(id);
    res.status(200).json(project.actions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while trying to retrieve that action" });
  }
});

module.exports = router;

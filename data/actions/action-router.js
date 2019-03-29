const express = require("express");

const Actions = require("../helpers/actionModel.js");

const router = express.Router();

//GET ALL

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving actions." });
  }
});

//ADD

router.post("/", async (req, res) => {
  const newAction = req.body;
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    req.status(400).json({
      message:
        "Please provide project id, description, and notes for the action."
    });
  }
  try {
    newAction = await Actions.insert(req.body);
    res.status(201).json({ message: "Successfully added." });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Could not add action to the server. " });
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Actions.update(id, req.body);
    if (!updated) {
      res.status(404).json({
        message: "The action you are trying to update does not exist"
      });
    } else {
      res.status(200).json({ message: "update successful" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error while updating the action." });
  }
});

module.exports = router;

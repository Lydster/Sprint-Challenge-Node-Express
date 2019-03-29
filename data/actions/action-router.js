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

//GET ONE

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while trying to retrieve that action" });
  }
});

//ADD

router.post("/", async (req, res) => {
  const { project_id, description, notes } = req.body;
  console.log(req.body);
  try {
    if (!project_id || !description || !notes) {
      req.status(400).json({
        message:
          "Please Provide a  project id, description, and notes for the action"
      });
    } else {
      const newAction = await Actions.insert(req.body);
      res.status(201).json(newAction);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "A server error occured." });
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

//DELETE

router.delete("/", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const toDelete = await Actions.get(id);
    if (!toDelete) {
      res
        .status(404)
        .json({ message: "the action you want to delete does not exist." });
    } else {
      const removed = await Actions.remove(id);
      res.status(200).json({ message: "Successfully Deleted." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: " There was an error while deleting this post." });
  }
});

module.exports = router;

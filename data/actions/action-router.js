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

module.exports = router;

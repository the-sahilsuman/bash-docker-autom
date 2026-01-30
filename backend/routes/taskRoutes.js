const express = require("express");
const router = express.Router();
const Task = require("../models/Task");


// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

// TOGGLE
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.done = !task.done;
  await task.save();
  res.json(task);
});

module.exports = router;

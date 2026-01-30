const Task = require("../models/Task");

// create
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

// read all
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// update
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

// delete
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  projectId: mongoose.Schema.Types.ObjectId,
  assignedTo: [Number] // Nuevo campo
});

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  projectId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Event', eventSchema);

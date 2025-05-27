const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  assessmentText: { type: String, default: '' },
  grade: { type: String, default: '' }
});

module.exports = mongoose.model('Project', projectSchema);

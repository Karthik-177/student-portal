// backend/routes/project.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');
const { logMessage } = require('../src/logger');

const JWT_SECRET = process.env.JWT_SECRET;

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// Middleware to verify JWT and extract user role
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// POST route to submit project
router.post('/submit', upload.single('file'), async (req, res) => {
  const { name, title } = req.body;
  const file = req.file;

  if (!name || !title || !file) {
    return res.status(400).json({ message: 'Missing name, title, or file' });
  }

  try {
    const newProject = new Project({
      studentName: name,
      projectTitle: title,
      filename: file.filename,
    });
    await newProject.save();

    logMessage(`Received project submission: name=${name}, title=${title}, file=${file.filename}`);
    res.status(200).json({ message: 'Project submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project' });
  }
});

// GET route to get all projects (faculty access only)
router.get('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

router.patch('/:id/assess', authenticateToken, async (req, res) => {
  if (req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  const { assessmentText, grade } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.assessmentText = assessmentText || project.assessmentText;
    project.grade = grade || project.grade;

    await project.save();

    res.json({ message: 'Assessment updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating assessment' });
  }
});

module.exports = router;

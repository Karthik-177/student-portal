const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project'); // For project upload
const studentRoutes = require('./routes/student'); // For student details

const app = express();

const mongoUri = process.env.MONGODB_URI || '';

console.log("MongoDB URI:", mongoUri);

// Middleware
app.use(cors());
app.use(express.json()); // Accept JSON
app.use('/uploads', express.static('uploads')); // To serve uploaded files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/students', studentRoutes); // Register student routes

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,            // NOTE: Deprecated but safe to keep for now
  useUnifiedTopology: true          // NOTE: Deprecated but safe to keep for now
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
})
.catch(err => console.error("MongoDB connection error:", err));

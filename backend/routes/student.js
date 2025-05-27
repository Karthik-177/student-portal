const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/students - create or update student details
router.post('/', async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    if (!name || !email || !password || !course) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update existing user details
      user.name = name;
      user.password = password; // In real app, hash password before saving
      user.course = course;
      user.role = 'student';
      await user.save();
    } else {
      // Create new user
      user = new User({
        name,
        email,
        password, // In real app, hash password before saving
        course,
        role: 'student',
      });
      await user.save();
    }

    res.status(200).json({ message: 'Student details saved successfully', user });
  } catch (error) {
    console.error('Error saving student details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

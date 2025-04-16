const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'faculty'], default: 'student' },
  profilePic: String,
  course: String
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model in a Node.js application. The schema includes fields for name, email, password, role (with a default value of 'student'), profile picture URL, and course. The email field is unique to ensure no two users can have the same email address. The model is then exported for use in other parts of the application.
// This code is typically used in a backend application to interact with a MongoDB database, allowing for the creation, retrieval, updating, and deletion of user records.
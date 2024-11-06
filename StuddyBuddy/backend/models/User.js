const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  studyField: { type: String, required: true } // Field of study, e.g., JEE, NEET
});

module.exports = mongoose.model('User', userSchema);

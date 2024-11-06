// routes/profile.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth'); 
const router = express.Router();

// Profile route
router.get('/', authenticateToken, (req, res) => {
  const user = req.user;
//   console.log(user)
  res.json({
    name: user.name,
    email: user.email,
    studyField: user.studyField,
  });
});

module.exports = router;

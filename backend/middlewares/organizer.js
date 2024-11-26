const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.get('/organizer', auth, (req, res) => {
  res.json({ msg: 'Bienvenue sur la page des organisateurs' });
});

module.exports = router;

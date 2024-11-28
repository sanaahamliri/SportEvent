const express = require('express');
const router = express.Router();
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createEvent);
router.get('/events', auth, getEvents);
router.put('/events/:id', auth, updateEvent);
router.delete('/events/:id', auth, deleteEvent);

module.exports = router;

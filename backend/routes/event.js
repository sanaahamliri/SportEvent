const express = require('express');
const router = express.Router();
const { createEvent, getEvents, updateEvent,getEventById, deleteEvent } = require('../controllers/eventController');
const auth = require('../middlewares/authMiddleware');

router.post('/events', auth,  createEvent);
router.get('/events', auth, getEvents);
router.put('/events/:id', auth, updateEvent);
router.get('/events/:id', auth, getEventById);
router.delete('/events/:id', auth, deleteEvent);

module.exports = router;

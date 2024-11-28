const express = require('express');
const router = express.Router();
const { createParticipant, getParticipants, getParticipantsByEventId, updateParticipant, deleteParticipant } = require('../controllers/participantController');
const auth = require('../middlewares/authMiddleware');

router.post('/participants', auth, createParticipant);
router.get('/participants', auth, getParticipants);
router.get('/participants/event/:eventId', auth, getParticipantsByEventId);
router.put('/participants/:id', auth, updateParticipant);
router.delete('/participants/:id', auth, deleteParticipant);

module.exports = router;

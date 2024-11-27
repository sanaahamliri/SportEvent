const Participant = require('../models/Participant');
const Event = require('../models/Event');

exports.createParticipant = async (req, res) => {
  const { name, email, event } = req.body;
  try {
    const eventExists = await Event.findById(event);
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newParticipant = new Participant({ name, email, event });
    const savedParticipant = await newParticipant.save();
    res.status(201).json(savedParticipant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating participant', error });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate('event');
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants', error });
  }
};

exports.getParticipantsByEventId = async (req, res) => {
  try {
    const participants = await Participant.find({ event: req.params.eventId }).populate('event');
    if (!participants.length) {
      return res.status(404).json({ message: 'No participants found for this event' });
    }
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants', error });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParticipant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.status(200).json(updatedParticipant);
  } catch (error) {
    res.status(400).json({ message: 'Error updating participant', error });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);
    if (!deletedParticipant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.status(200).json({ message: 'Participant deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting participant', error });
  }
};

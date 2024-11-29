const Participant = require('../models/Participant');
const Event = require('../models/Event');
const {
  createParticipant,
  getParticipants,
  getParticipantsByEventId,
  updateParticipant,
  deleteParticipant
} = require('../controllers/participantController');

jest.mock('../models/Participant');
jest.mock('../models/Event');

describe('Participants tests', () => {
  it('should create a new participant', async () => {
    const req = {
      body: {
        name: 'Hamliri Sanaa',
        email: 'hamlirisanaa@gmail.com',
        event: 'event_id'
      }
    };

    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    Event.findById.mockResolvedValue(true);
    Participant.prototype.save = jest.fn().mockResolvedValue(req.body);

    await createParticipant(req, res);

    expect(Event.findById).toHaveBeenCalledWith('event_id');
    expect(Participant.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it('should respond with all participants', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const participants = [
      { name: 'Hamliri Sanaa', email: 'hamlirisanaa@gmail.com', event: 'event_id' },
      { name: 'Js Sanaa', email: 'jsSanaa@gmail.com', event: 'event_id' }
    ];

    Participant.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(participants)
    });

    await getParticipants(req, res);

    expect(Participant.find).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(participants);
  });

  it('should respond with participants by event ID', async () => {
    const req = {
      params: { eventId: 'event_id' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const participants = [
      { name: 'Hamliri Sanaa', email: 'hamlirisanaa@gmail.com', event: 'event_id' }
    ];

    Participant.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(participants)
    });

    await getParticipantsByEventId(req, res);

    expect(Participant.find).toHaveBeenCalledWith({ event: 'event_id' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(participants);
  });

  it('should update a participant', async () => {
    const req = {
      params: { id: 'participant_id' },
      body: {
        name: 'Hamliri Sanaa Updated',
        email: 'jhdbcj@gmail.com',
        event: 'event_id'
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    const updatedParticipant = { ...req.body, _id: 'participant_id' };

    Participant.findByIdAndUpdate.mockResolvedValue(updatedParticipant);

    await updateParticipant(req, res);

    expect(Participant.findByIdAndUpdate).toHaveBeenCalledWith('participant_id', req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedParticipant);
  });

  it('should delete a participant', async () => {
    const req = {
      params: { id: 'participant_id' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    Participant.findByIdAndDelete.mockResolvedValue({ _id: 'participant_id' });

    await deleteParticipant(req, res);

    expect(Participant.findByIdAndDelete).toHaveBeenCalledWith('participant_id');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Participant deleted' });
  });
});

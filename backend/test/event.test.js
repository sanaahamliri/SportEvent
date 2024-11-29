const Event = require('../models/Event');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

jest.mock('../models/Event.js');

describe('Events tests', () => {
  it('should respond with a new event', async () => {
    const req = {
      body: {
        event_name: 'JsPirates',
        date: '11/29/2024',
        location: 'Youcode'
      },
    };
  
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  
    const eventSaved = jest.fn().mockResolvedValue({
      event_name: req.body.event_name,
      date: req.body.date,
      location: req.body.location
    });
  
    Event.mockResolvedValue({ save: eventSaved });
  
    await createEvent(req, res);
  
    expect(Event).toHaveBeenCalledTimes(1);
    expect(Event).toHaveBeenCalledWith({
      event_name: req.body.event_name,
      date: req.body.date,
      location: req.body.location
    });
  });

  it('should respond with all events', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  
    Event.find.mockResolvedValue([
      { event_name: 'JsPirates', date: '11/29/2024', location: 'Youcode' },
      { event_name: 'JsNinjas', date: '12/15/2024', location: 'Youcode2' }
    ]);
  
    await getEvents(req, res);
  
    expect(Event.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([
      { event_name: 'JsPirates', date: '11/29/2024', location: 'Youcode' },
      { event_name: 'JsNinjas', date: '12/15/2024', location: 'Youcode2' }
    ]);
  });

  it('should update an event', async () => {
    const req = {
      params: { id: 'event_id' },
      body: {
        event_name: 'Updated Event',
        date: '12/01/2024',
        location: 'Updated Location'
      }
    };
  
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  
    const updatedEvent = {
      event_name: req.body.event_name,
      date: req.body.date,
      location: req.body.location
    };
  
    Event.findByIdAndUpdate.mockResolvedValue(updatedEvent);
  
    await updateEvent(req, res);
  
    expect(Event.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Event.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
    expect(res.json).toHaveBeenCalledWith(updatedEvent);
  });

  it('should delete an event', async () => {
    const req = {
      params: { id: 'event_id' }
    };
  
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  
    Event.findByIdAndDelete.mockResolvedValue({ _id: req.params.id });
  
    await deleteEvent(req, res);
  
    expect(Event.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(Event.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully' });
  });
});

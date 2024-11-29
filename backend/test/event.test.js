const Event = require('../models/Event');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

jest.mock('../models/Event.js')

describe('Evnets test', () => {
    it('should response of event', async () => {
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
          })
          Event.mockResolvedValue({save: eventSaved})
          await createEvent(req, res)
          expect(Event).toHaveBeenCalledTimes(1)
          expect(Event).toHaveBeenCalledWith({
            event_name: req.body.event_name,
            date: req.body.date,
            location: req.body.location
          })
    });
})
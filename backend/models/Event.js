const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//---------------- Routes------------------
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/event');
const participantRoutes = require('./routes/participant');
app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', participantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

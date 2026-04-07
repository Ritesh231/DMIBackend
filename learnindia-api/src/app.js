const express = require('express');
const cors = require('cors');
const memberRoutes = require('./routes/memberRoutes');

const app = express();

app.use(
  cors({
    origin: ['https://decodemeindia.com'],
  })
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Learn India API is running' });
});

app.use('/api/members', memberRoutes);

module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 

app.use(cors()); 

app.get('/api/airports', (req, res) => {
  res.json(require('./mock-data/airports.json'));
});

app.get('/api/flights', (req, res) => {
  res.json(require('./mock-data/flights.json'));
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});

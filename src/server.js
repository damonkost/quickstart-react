const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001; // Choose a suitable port

app.use(cors());
app.use(bodyParser.json());

app.get('/api/attorneys', (req, res) => {
  const filePath = path.join(__dirname, '../../subdomain_config.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading subdomain_config.json:', err);
      return res.status(500).json({ error: 'Failed to fetch attorney data' });
    }

    try {
      const configData = JSON.parse(data);
      const attorneyData = Object.entries(configData).map(([subdomain, data]) => ({
        subdomain,
        ...data,
      }));

      res.json(attorneyData);
    } catch (parseError) {
      console.error('Error parsing subdomain_config.json:', parseError);
      return res.status(500).json({ error: 'Failed to parse attorney data' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
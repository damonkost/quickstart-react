const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/attorneys', (req, res) => {
  const subdomain = req.query.subdomain;
  const filePath = path.join(__dirname, '../../subdomain_config.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading subdomain_config.json:', err);
      return res.status(500).json({ error: 'Failed to fetch attorney data' });
    }

    try {
      const configData = JSON.parse(data);
      
      // If subdomain is provided, return specific attorney data
      if (subdomain && configData[subdomain]) {
        return res.json(configData[subdomain]);
      }
      
      // Otherwise return all attorney data
      res.json(configData);
    } catch (parseError) {
      console.error('Error parsing subdomain_config.json:', parseError);
      return res.status(500).json({ error: 'Failed to fetch attorney data' });
    }
  });
});

// POST request handler (to update attorney data)
app.post('/api/attorneys', (req, res) => {
  const newAttorneyData = req.body;
  const filePath = path.join(__dirname, '../../subdomain_config.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading subdomain_config.json:', err);
      return res.status(500).json({ error: 'Failed to update attorney data' });
    }

    try {
      const configData = JSON.parse(data);

      // Merge new data with existing data (example implementation)
      const updatedConfigData = { ...configData, ...newAttorneyData };

      fs.writeFile(filePath, JSON.stringify(updatedConfigData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing subdomain_config.json:', writeErr);
          return res.status(500).json({ error: 'Failed to update attorney data' });
        }

        res.json({ message: 'Attorney data updated successfully' });
      });
    } catch (parseError) {
      console.error('Error parsing subdomain_config.json:', parseError);
      return res.status(500).json({ error: 'Failed to update attorney data' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
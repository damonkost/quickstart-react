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
app.post('/api/attorneys', express.json(), (req, res) => {
  const { subdomain, firmName, logo, mascot, vapiInstructions, vapiContext, interactionDepositUrl } = req.body;
  
  const filePath = path.join(__dirname, '../../subdomain_config.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    let configData = {};
    if (!err) {
      try {
        configData = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing existing config:', parseError);
      }
    }

    // Update or add new subdomain configuration
    configData[subdomain] = {
      firmName,
      logoUrl: logo,
      mascotUrl: mascot,
      vapiAssistantId: vapiContext,
      agentInstructions: vapiInstructions,
      interactionDepositUrl
    };

    fs.writeFile(filePath, JSON.stringify(configData, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing config:', writeErr);
        return res.status(500).json({ error: 'Failed to save attorney data' });
      }
      res.json({ success: true, data: configData[subdomain] });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
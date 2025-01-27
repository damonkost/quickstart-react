import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const configPath = path.join(process.cwd(), 'src/utils/subdomain_config.json');
    
    // Initial configuration
    const initialConfig = {
      "gco": {
        "firmName": "GCO Law",
        "vapiInstructions": "I am a pa lawyer",
        "lastUpdated": new Date().toISOString()
      }
    };

    // Create the file with initial data
    fs.writeFileSync(configPath, JSON.stringify(initialConfig, null, 2));

    return res.status(200).json({
      status: 'success',
      message: 'Config file created',
      data: initialConfig
    });

  } catch (error) {
    console.error('Error creating config:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
} 
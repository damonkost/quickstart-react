import { getAttorneyConfig } from '../../../../src/config/attorneys';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Required parameters
      const subdomain = decodeURIComponent(req.query.subdomain);
      const firmName = decodeURIComponent(req.query.firmName);
      const logo = decodeURIComponent(req.query.logo);
      const vapiInstructions = decodeURIComponent(req.query.instructions).replace(/\\n/g, '\n');

      if (!subdomain || !firmName) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required parameters: subdomain and firmName'
        });
      }

      // Update configuration
      const config = getAttorneyConfig();
      config[subdomain] = {
        firmName,
        logo,
        vapiInstructions: vapiInstructions || config['default'].vapiInstructions
      };

      // Save updates (replace with database call later)
      fs.writeFileSync(
        path.resolve(process.cwd(), 'src/config/attorneys.js'),
        `export const getAttorneyConfig = () => (${JSON.stringify(config, null, 2)});`
      );

      return res.status(200).json({
        status: 'success',
        data: {
          subdomain,
          firmName,
          logo,
          vapiInstructions
        }
      });

    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  if (req.method === 'POST') {
    // Handle body instead of query
    const { subdomain, firmName, logo, instructions } = req.body;
  }

  return res.status(405).json({ 
    status: 'error',
    message: 'Method not allowed' 
  });
} 
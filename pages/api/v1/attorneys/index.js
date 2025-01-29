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
      const subdomain = req.query.subdomain;
      const firmName = req.query.firmName;
      const logo = req.query.logo;
      const vapiInstructions = req.query.instructions;

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

  return res.status(405).json({ 
    status: 'error',
    message: 'Method not allowed' 
  });
} 
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
      const subdomain = decodeURIComponent(req.query.subdomain || '');

      if (!subdomain) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required parameter: subdomain'
        });
      }

      const config = getAttorneyConfig();
      const attorneyConfig = config[subdomain] || config['default'];

      // Only update config if optional parameters are provided
      if (req.query.firmName || req.query.logo || req.query.instructions) {
        const firmName = decodeURIComponent(req.query.firmName || attorneyConfig.firmName);
        const logo = decodeURIComponent(req.query.logo || attorneyConfig.logo);
        const vapiInstructions = decodeURIComponent(req.query.instructions || '').replace(/\\n/g, '\n') || attorneyConfig.vapiInstructions;

        config[subdomain] = {
          firmName,
          logo,
          vapiInstructions
        };

        // Save updates (replace with database call later)
        fs.writeFileSync(
          path.resolve(process.cwd(), 'src/config/attorneys.js'),
          `export const getAttorneyConfig = () => (${JSON.stringify(config, null, 2)});`
        );
      }

      return res.status(200).json({
        status: 'success',
        data: config[subdomain] || config['default']
      });
    } catch (error) {
      console.error('Error handling attorney request:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  return res.status(405).json({
    status: 'error',
    message: 'Method not allowed'
  });
}
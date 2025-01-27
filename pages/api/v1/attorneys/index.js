import { getAttorneyConfig } from '../../../../src/config/attorneys';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const subdomain = req.query.subdomain;
      console.log('Handling request for subdomain:', subdomain);

      const config = getAttorneyConfig();
      const attorneyData = config[subdomain] || config['default'];

      if (!attorneyData) {
        return res.status(404).json({ status: 'error', message: 'Attorney not found' });
      }

      return res.status(200).json({
        status: 'success',
        data: attorneyData
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
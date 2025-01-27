import { parse } from 'url';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse URL
  const { pathname } = parse(req.url, true);
  console.log('Request path:', pathname);
  console.log('Request method:', req.method);

  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Log headers and body
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);

      return res.status(200).json({
        success: true,
        message: 'POST request received',
        data: req.body
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working' });
  }

  // Handle unsupported methods
  return res.status(405).json({ 
    error: 'Method not allowed',
    allowedMethods: ['GET', 'POST', 'OPTIONS']
  });
} 
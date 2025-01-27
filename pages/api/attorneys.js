export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Log the incoming request
      console.log('Received request:', {
        method: req.method,
        headers: req.headers,
        body: req.body
      });

      // Send response
      return res.status(200).json({
        success: true,
        message: 'Data received',
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
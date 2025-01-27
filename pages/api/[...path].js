export default function handler(req, res) {
  const { path } = req.query;
  console.log('API path:', path);
  
  // Force JSON content type
  res.setHeader('Content-Type', 'application/json');

  // Handle attorneys endpoint
  if (path.join('/') === 'v1/attorneys') {
    if (req.method === 'GET') {
      return res.status(200).json({
        status: 'success',
        message: 'API is working',
        timestamp: new Date().toISOString()
      });
    }
    
    if (req.method === 'POST') {
      return res.status(200).json({
        status: 'success',
        data: req.body
      });
    }
  }

  return res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
} 
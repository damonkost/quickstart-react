export default function handler(req, res) {
  // Set cache headers
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=59');
  
  // Log request info
  console.log('Request headers:', req.headers);
  console.log('Cache status:', req.headers['x-vercel-cache']);

  // Set JSON content type
  res.setHeader('Content-Type', 'application/json');

  // GET request
  if (req.method === 'GET') {
    try {
      return res.status(200).json({
        status: 'success',
        message: 'API is working',
        timestamp: new Date().toISOString(),
        cacheStatus: req.headers['x-vercel-cache']
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // POST request
  if (req.method === 'POST') {
    try {
      return res.status(200).json({
        status: 'success',
        message: 'Data received',
        data: req.body
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Other methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    status: 'error',
    message: `Method ${req.method} Not Allowed`
  });
} 
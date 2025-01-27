export default function handler(req, res) {
  // Log the request
  console.log('API Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  // GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'success',
      message: 'API is working',
      timestamp: new Date().toISOString()
    });
  }

  // POST request
  if (req.method === 'POST') {
    try {
      const data = req.body;
      return res.status(200).json({
        status: 'success',
        message: 'Data received',
        data: data
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
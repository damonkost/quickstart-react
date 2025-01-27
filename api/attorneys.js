export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const data = req.body;
      console.log('Received POST data:', data);
      
      // Your logic to handle the data here
      
      return res.status(200).json({ 
        success: true, 
        message: 'Data received successfully',
        data: data 
      });
    } catch (error) {
      console.error('Error processing POST request:', error);
      return res.status(500).json({ error: 'Failed to process request' });
    }
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'GET endpoint working' });
  }

  // Handle unsupported methods
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
} 
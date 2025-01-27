export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      console.log('Received data:', data);
      
      // Your logic to handle the data here
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else if (req.method === 'GET') {
    // Your existing GET logic
    res.status(200).json({ message: 'GET request received' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
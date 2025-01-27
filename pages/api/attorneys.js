import { parse } from 'url';

export default function handler(req, res) {
  // Basic logging
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // Handle POST
  if (req.method === 'POST') {
    return res.status(200).json({
      received: true,
      data: req.body
    });
  }

  // Handle GET
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'GET endpoint working'
    });
  }

  // Default response
  res.status(405).json({
    error: 'Method not allowed',
    method: req.method,
    allowed: ['GET', 'POST']
  });
} 
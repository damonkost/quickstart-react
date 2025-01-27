import { createRouter } from '@vercel/node';
const router = createRouter();

router.post(async (req, res) => {
  try {
    const { subdomain, firmName, logo, mascot, vapiInstructions, vapiContext, interactionDepositUrl } = req.body;
    
    // Your logic to save the data
    console.log('Received data:', req.body);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Data received successfully' 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

export default router; 
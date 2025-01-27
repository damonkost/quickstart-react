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
      const { subdomain } = req.query;
      
      // Default LegalScout configuration - no VAPI instructions
      let attorneyData = {
        firmName: 'LegalScout',
        logo: "https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c",
        vapiInstructions: null  // No default instructions
      };

      // If subdomain is gco, use General Counsel Online configuration
      if (subdomain === 'gco') {
        attorneyData = {
          firmName: "General Counsel Online",
          logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/pSrOHjaijGufsy7FzIva/pub/1ivEGn6E6pjoAmFHAwSU.png",
          vapiInstructions: "I provide Business Law for clients in Pennsylvania. I want to know their company domicile, business structure, and legal or business issue they're facing. I need to make sure this is a business and not an individual matter this is concerning. Refer the user to https://generalcounsel.online if they need more information about General Counsel Online."
        };
      }

      console.log('Returning data for subdomain:', subdomain);
      
      return res.status(200).json({
        status: 'success',
        data: attorneyData
      });
    } catch (error) {
      console.error('Error:', error);
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
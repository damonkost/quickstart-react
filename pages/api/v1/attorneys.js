import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log('API Request received:', {
    method: req.method,
    query: req.query,
    host: req.headers.host,
    url: req.url
  });

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the subdomain config file path
  const configPath = path.join(process.cwd(), 'subdomain_config.json');

  try {
    // Read the config file
    let configData = {};
    try {
      const fileData = await fs.promises.readFile(configPath, 'utf8');
      configData = JSON.parse(fileData);
    } catch (error) {
      console.warn('No existing config file found or error reading it:', error);
    }

    if (req.method === 'GET') {
      try {
        const subdomain = req.query.subdomain;
        console.log('Handling request for subdomain:', subdomain);

        // Handle General Counsel Online specifically
        if (subdomain === 'general-counsel-online' || subdomain === 'gco') {
          return res.status(200).json({
            status: 'success',
            data: {
              firmName: "General Counsel Online",
              logo: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/pSrOHjaijGufsy7FzIva/pub/1ivEGn6E6pjoAmFHAwSU.png",
              vapiInstructions: "I provide Business Law for clients in Pennsylvania. I want to know their company domicile, business structure, and legal or business issue they're facing. I need to make sure this is a business and not an individual matter this is concerning. Refer the user to https://generalcounsel.online if they need more information about General Counsel Online."
            }
          });
        }

        // Default response
        return res.status(200).json({
          status: 'success',
          data: {
            firmName: 'LegalScout',
            logo: "https://res.cloudinary.com/glide/image/fetch/f_auto,c_limit/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fglide-prod.appspot.com%2Fo%2Ficon-images%252Fanonymous-4ec86c98-f143-4160-851d-892f167b223c.png%3Falt%3Dmedia%26token%3Dcdc26513-26ae-48f6-b085-85b8bb806c4c"
          }
        });
      } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
          status: 'error',
          message: error.message
        });
      }
    }

    if (req.method === 'POST') {
      const { subdomain, firmName, logo, mascot, vapiInstructions, vapiContext, interactionDepositUrl } = req.body;

      if (!subdomain || !firmName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Update config
      configData[subdomain] = {
        firmName,
        logo,
        mascot,
        vapiInstructions,
        vapiContext,
        interactionDepositUrl
      };

      // Save updated config
      await fs.promises.writeFile(
        configPath,
        JSON.stringify(configData, null, 2),
        'utf8'
      );

      return res.status(200).json({
        status: 'success',
        data: configData[subdomain]
      });
    }

    return res.status(405).json({ 
      status: 'error',
      message: 'Method not allowed' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
} 
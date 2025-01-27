import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set caching headers
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  
  try {
    // Get the config file path
    const configPath = path.join(process.cwd(), 'src/utils/subdomain_config.json');
    
    // Check if file exists
    const fileExists = fs.existsSync(configPath);
    console.log('Config file exists:', fileExists);

    if (!fileExists) {
      return res.status(200).json({
        status: 'warning',
        message: 'Config file does not exist',
        path: configPath
      });
    }

    // Try to read and parse the file
    const rawData = fs.readFileSync(configPath, 'utf8');
    console.log('Raw file content:', rawData);

    const configData = JSON.parse(rawData);
    
    // Return detailed information
    return res.status(200).json({
      status: 'success',
      fileExists: true,
      path: configPath,
      subdomains: Object.keys(configData),
      data: configData,
      fileSize: rawData.length,
      lastModified: fs.statSync(configPath).mtime
    });

  } catch (error) {
    console.error('Error checking config:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
      stack: error.stack
    });
  }
} 
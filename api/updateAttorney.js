const fs = require('fs');
const path = require('path');

// Function to update the HTML table with subdomain data
async function updateTable() {
    const filePath = path.join(__dirname, '../../subdomain_config.json');
    console.log(`Checking if file exists: ${filePath}`);
    if (fs.existsSync(filePath)) {
        console.log(`File exists: ${filePath}`);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const configData = JSON.parse(fileContent);
        console.log('Config data loaded:', configData);

        // Create a table of different extensions
        let table = '<table><tr><th>Subdomain</th><th>Firm Name</th><th>Logo URL</th><th>Mascot URL</th><th>VAPI URL</th><th>VAPI Instructions</th><th>VAPI Context</th><th>Interaction Deposit URL</th></tr>';
        for (const subdomain in configData) {
            const data = configData[subdomain];
            table += `<tr>
                        <td>${subdomain}</td>
                        <td>${data.firmName}</td>
                        <td>${data.logo}</td>
                        <td>${data.mascot}</td>
                        <td>${data.vapi_url}</td>
                        <td>${data.vapiInstructions}</td>
                        <td>${data.vapiContext}</td>
                        <td>${data.interactionDepositUrl}</td>
                      </tr>`;
        }
        table += '</table>';

        // Write the table to an HTML file
        const tableFilePath = path.join(__dirname, '../../subdomain_table.html');
        fs.writeFileSync(tableFilePath, table, 'utf8');
        console.log(`Table written to: ${tableFilePath}`);
    } else {
        console.log(`File does not exist: ${filePath}`);
    }
}

module.exports = async (req, res) => {
    try {
        console.log('Received webhook request:', req.body);
        const payload = req.body;
        
        // Validate webhook source
        if (!payload || !payload.subdomain) {
            throw new Error('Invalid payload structure');
        }

        // Add validation for webhook source
        const webhookUrl = 'https://hook.us1.make.com/xovnaaoshufg71xjnx7h6blgdv1l2mwl';
        if (req.headers['x-webhook-source'] !== webhookUrl) {
            throw new Error('Invalid webhook source');
        }

        // Extract the relevant attorney data from the payload
        const { subdomain, logoUrl, mascotUrl, vapiUrl, firmName, vapiInstructions, vapiContext, interactionDepositUrl } = payload;

        if (!subdomain || !logoUrl || !firmName || !vapiInstructions || !vapiContext || !interactionDepositUrl) {
            throw new Error('Missing required attorney data in the payload.');
        }

        // Define the path to the JSON file
        const filePath = path.join(__dirname, '../../subdomain_config.json');
        console.log(`Reading file: ${filePath}`);

        // Read the existing data from the JSON file
        let configData = {};
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            configData = JSON.parse(fileContent);
            console.log('Existing config data:', configData);
        }

        // Update or create the entry for the subdomain
        configData[subdomain] = {
            logo: logoUrl,
            mascot: mascotUrl || configData[subdomain]?.mascot || null,
            vapi_url: vapiUrl || configData[subdomain]?.vapi_url || null,
            firmName: firmName,
            vapiInstructions: vapiInstructions,
            vapiContext: vapiContext,
            interactionDepositUrl: interactionDepositUrl
        };

        // Write the updated data back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(configData, null, 2), 'utf8');
        console.log('Updated config data written to file:', configData);

        // Update the table
        await updateTable();

        // Return success with CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.status(200).json({ 
            success: true,
            message: "Attorney data updated successfully!",
            subdomain: payload.subdomain
        });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: error.message });
    }
};

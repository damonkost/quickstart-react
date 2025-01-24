const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
    try {
        // Parse the JSON payload from the webhook request
        const payload = req.body;

        // Extract the relevant attorney data from the payload
        const { subdomain, logoUrl, mascotUrl, vapiUrl, firmName, vapiInstructions, vapiContext, interactionDepositUrl } = payload;

        if (!subdomain || !logoUrl || !firmName || !vapiInstructions || !vapiContext || !interactionDepositUrl) {
            throw new Error('Missing required attorney data in the payload.');
        }

        // Define the path to the JSON file
        const filePath = path.join(__dirname, '../../subdomain_config.json');

        // Read the existing data from the JSON file
        let configData = {};
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            configData = JSON.parse(fileContent);
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

        // Return a success message
        context.res = {
            status: 200,
            body: JSON.stringify({ message: "Attorney data updated successfully!" })
        };
    } catch (error) {
        // Handle any errors that occur during the process
        context.res = {
            status: 500,
            body: JSON.stringify({ error: `Error updating attorney data: ${error.message}` })
        };
    }
};

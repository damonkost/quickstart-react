const axios = require('axios');

const webhookUrl = 'https://hook.us1.make.com/xovnaaoshufg71xjnx7h6blgdv1l2mwl';

const payload = {
    subdomain: 'example-subdomain',
    logoUrl: 'https://example.com/logo.png',
    mascotUrl: 'https://example.com/mascot.png',
    vapiUrl: 'https://example.com/vapi',
    firmName: 'Example Firm',
    vapiInstructions: 'Example instructions',
    vapiContext: 'Example context',
    interactionDepositUrl: 'https://example.com/deposit'
};

axios.post(webhookUrl, payload)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

// Test the Webhook
// Use the `testWebhook.js` script to simulate the webhook call and verify that the serverless function processes the data correctly.

### Test the Integration

1. **Deploy the Application**:
   - Ensure the application is deployed to Vercel and configured to handle wildcard subdomains.

2. **Test the Webhook**:
   - Use the `testWebhook.js` script to simulate the webhook call and verify that the serverless function processes the data correctly.

3. **Verify the Output**:
   - Check the `subdomain_config.json` and `subdomain_table.html` files to ensure they are updated correctly.
   - Verify that the frontend components display the correct data based on the subdomain.

const axios = require('axios');

const webhookUrl = 'https://hook.us1.make.com/xovnaaoshufg71xjnx7h6blgdv1l2mwl';

async function runTests() {
    console.log('Running webhook integration tests...');
    
    try {
        const response = await axios.post(webhookUrl, {
            subdomain: 'test-law-firm',
            logoUrl: 'https://example.com/test-logo.png',
            mascotUrl: 'https://example.com/test-mascot.png',
            vapiUrl: 'https://example.com/test-vapi',
            firmName: 'Test Law Firm',
            vapiInstructions: 'Test instructions for the VAPI system',
            vapiContext: 'Test context for interactions',
            interactionDepositUrl: 'https://example.com/test-deposit'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-webhook-source': webhookUrl
            }
        });
        
        console.log('Test successful:', response.data);
    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
}

runTests();

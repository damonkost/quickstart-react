const axios = require('axios');

const webhookUrl = 'https://hook.us1.make.com/xovnaaoshufg71xjnx7h6blgdv1l2mwl';

// Test data for different scenarios
const testPayloads = [
    {
        subdomain: 'test-law-firm',
        logoUrl: 'https://example.com/test-logo.png',
        mascotUrl: 'https://example.com/test-mascot.png',
        vapiUrl: 'https://example.com/test-vapi',
        firmName: 'Test Law Firm',
        vapiInstructions: 'Test instructions for the VAPI system',
        vapiContext: 'Test context for interactions',
        interactionDepositUrl: 'https://example.com/test-deposit'
    },
    // Add more test cases as needed
];

async function runTests() {
    console.log('Starting webhook tests...');
    
    for (const payload of testPayloads) {
        try {
            console.log(`Testing payload for ${payload.firmName}...`);
            const response = await axios.post(webhookUrl, payload);
            console.log('Response:', response.data);
            console.log('Test successful!\n');
        } catch (error) {
            console.error('Test failed:', error.response ? error.response.data : error.message);
        }
    }
}

runTests();

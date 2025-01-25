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

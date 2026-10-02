const twilio = require('twilio');

exports.handler = async function(event, context) {
  // Only allow POST requests from your frontend
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { toNumber, message } = JSON.parse(event.body);

    // Initialize Twilio using environment variables (securely stored on Netlify)
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send the message via Twilio
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toNumber
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, sid: response.sid })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

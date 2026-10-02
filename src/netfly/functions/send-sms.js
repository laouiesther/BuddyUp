// netlify/functions/send-sms.js
// Place this file at: your-project/netlify/functions/send-sms.js

const twilio = require("twilio");

exports.handler = async function (event, context) {

  // ── Only allow POST requests ──────────────────────────────────
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // ── Parse the incoming data ───────────────────────────────────
    const { volunteerName, volunteerPhone } = JSON.parse(event.body);

    // ── Validate that we have what we need ────────────────────────
    if (!volunteerName || !volunteerPhone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing volunteerName or volunteerPhone" }),
      };
    }

    // ── Pull Twilio credentials from Netlify environment variables ─
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken  = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone  = process.env.TWILIO_PHONE_NUMBER;

    // ── Initialize Twilio client ──────────────────────────────────
    const client = twilio(accountSid, authToken);

    // ── Format the volunteer's phone number ───────────────────────
    // Strips all non-numeric characters and adds +1 for US numbers
    const cleanPhone = "+1" + volunteerPhone.replace(/\D/g, "");

    // ── Build the confirmation message ────────────────────────────
    const message =
      `Hi ${volunteerName}!! 🎉\n\n` +
      `Looking forward to seeing you Sunday at the MB JCC from 10:00-12:00.\n\n` +
      `All volunteers are expected to be there at 9:45AM.\n\n` +
      `Kathy will be running the program if you have any issues:\n` +
      `📞 (786) 683-0987\n\n` +
      `Thank you for volunteering with Friendship Circle! 💙`;

    // ── Send the SMS via Twilio ───────────────────────────────────
    const result = await client.messages.create({
      body: message,
      from: fromPhone,
      to:   cleanPhone,
    });

    console.log("SMS sent successfully. SID:", result.sid);

    // ── Return success response ───────────────────────────────────
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        success: true,
        messageSid: result.sid,
        sentTo: cleanPhone,
      }),
    };

  } catch (error) {
    console.error("Error sending SMS:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

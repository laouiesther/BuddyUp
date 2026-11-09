const twilio = require("twilio");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { volunteerName, volunteerPhone } = JSON.parse(event.body);

    if (!volunteerName || !volunteerPhone) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing name or phone" }) };
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const cleanPhone = "+1" + volunteerPhone.replace(/\D/g, "");

    const message =
      `Hi ${volunteerName}!! 🎉\n\n` +
      `Looking forward to seeing you Sunday at the MB JCC from 10:00-12:00.\n\n` +
      `All volunteers are expected to be there at 9:45AM.\n\n` +
      `Kathy will be running the program if you have any issues:\n` +
      `📞 (786) 683-0987\n\n` +
      `Thank you for volunteering with Friendship Circle! 💙`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: cleanPhone,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true, sid: result.sid }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};
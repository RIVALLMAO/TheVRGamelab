const axios = require('axios');

const sendDiscordNotification = async (game, status) => {
  const webhookURL = 'https://discord.com/api/webhooks/1346315175522996294/0V3TBK5a-8VlRxEyaN3hMVPM8dGiwLP4EriahbwxWb_YadxEDsfvYPwIFH0NjIAq5Cpe'; // Replace with your actual webhook URL

  const discordMessage = {
    content: `Game has been ${status}:\n**Name:** ${game.name}\n**Description:** ${game.description}\n**Image:** ${game.image}`,
  };

  try {
    await axios.post(webhookURL, discordMessage);
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
};

module.exports = { sendDiscordNotification };

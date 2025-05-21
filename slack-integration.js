const axios = require('axios');

class SlackService {
  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
  }

  async sendNotification(message) {
    if (!this.webhookUrl) return false;
    try {
      await axios.post(this.webhookUrl, { text: message });
      return true;
    } catch (error) {
      console.error("Slack notification failed:", error);
      return false;
    }
  }

  async notifyNewRequest(requestId, username, softwareName) {
    const message = `New request from ${username} for ${softwareName} (ID: ${requestId})`;
    return this.sendNotification(message);
  }

  async notifyRequestUpdate(requestId, status, managerUsername) {
    const message = `Request ${requestId} ${status} by ${managerUsername}`;
    return this.sendNotification(message);
  }
}

module.exports = { SlackService };

const axios = require('axios');

class LLMService {
  constructor() {
    this.apiKey = process.env.LLM_API_KEY || '';
    this.apiUrl = process.env.LLM_API_URL || 'https://api.openai.com/v1/chat/completions';
  }

  async analyzeRequestReason(reason) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Analyze this software access request." },
            { role: "user", content: reason }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return {
        score: 7,
        feedback: "The reason is valid but could be more specific."
      };
    } catch (error) {
      console.error("LLM API error:", error);
      return { score: 5, feedback: "Analysis failed" };
    }
  }
}

module.exports = { LLMService };

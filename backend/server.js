const express = require('express');
// Import the new Google AI package
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

// Initialize the Google AI client with your new API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Middleware setup
app.use(cors());
app.use(express.json());

// This is the main API route for your chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    // Get the last user message to send to the AI
    const lastUserMessage = messages[messages.length - 1].content;

    // Create the API request to Google Gemini
    const result = await model.generateContent(lastUserMessage);
    const response = await result.response;
    const text = response.text();

    // Send the AI's response back to the frontend in the correct format
    res.json({ response: { role: 'assistant', content: text } });

  } catch (error) {
    console.error('Error communicating with Google AI:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const express = require('express');
const router = express.Router();
const axios = require('axios');
const Unanswered = require('../models/Unanswered');

// Ask a question
router.post('/ask', async (req, res) => {
    const { question, userId } = req.body; // userId is optional (Guest)

    try {
        // Call Python NLP Service
        const nlpUrl = process.env.NLP_SERVICE_URL || 'https://gitam-chatbot.onrender.com';
        console.log(`Sending query to ${nlpUrl}/predict`);

        try {
            const response = await axios.post(`${nlpUrl}/predict`, {
                question: question,
                is_guest: !userId
            });

            const { answer, confidence, source } = response.data;

            // If confidence is low and source wasn't helpful, log to Unanswered
            if (source === 'unknown' || (confidence < 0.5 && source !== 'gemini')) {
                try {
                    await Unanswered.insert({
                        question,
                        askedBy: userId || 'Guest',
                        status: 'pending',
                        date: new Date()
                    });
                } catch (dbErr) {
                    console.error("Database Error (Non-fatal):", dbErr.message);
                }
            }

            res.json({ answer, source });

        } catch (nlpError) {
            console.error('NLP Service Connection Error:', nlpError.message);
            console.error('Tried connecting to:', nlpUrl);

            // Special handling for rate limiting (429)
            if (nlpError.response && nlpError.response.status === 429) {
                 return res.status(200).json({ 
                    answer: "I'm receiving a lot of questions right now! Please wait a moment and try again. Alternatively, check the official GITAM website for immediate info.",
                    source: "rate_limit"
                });
            }

            // Fallback if Python service is down
            res.status(503).json({ 
                answer: "I am having trouble connecting to my AI processor. Please try again in a few seconds as the service may be waking up.",
                error: nlpError.message 
            });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

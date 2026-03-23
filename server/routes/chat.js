const express = require('express');
const router = express.Router();
const axios = require('axios');
const Unanswered = require('../models/Unanswered');

// Ask a question
router.post('/ask', async (req, res) => {
    const { question, userId } = req.body; // userId is optional (Guest)

    try {
        // Call Python NLP Service
        const nlpUrl = process.env.NLP_SERVICE_URL || 'http://localhost:8000';
        console.log(`Sending query to ${nlpUrl}/predict`);

        try {
            const response = await axios.post(`${nlpUrl}/predict`, {
                question: question,
                is_guest: !userId
            });

            const { answer, confidence, source } = response.data;

            // If confidence is low and source wasn't helpful, log to Unanswered
            // Assuming Python returns source='unknown' or confidence < threshold
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
            console.error('NLP Service Error:', nlpError.message);
            // Fallback if Python service is down
            res.status(503).json({ answer: "I am currently experiencing issues. Please try again later." });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

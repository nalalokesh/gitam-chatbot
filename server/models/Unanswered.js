const mongoose = require('mongoose');

const UnansweredSchema = new mongoose.Schema({
    question: { type: String, required: true },
    askedBy: { type: String, default: 'Guest' },
    status: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('unanswered', UnansweredSchema);

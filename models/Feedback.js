const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    feedback: { type: String, required: true },
    studentId: { type: String } // Only stored in encrypted form to track participation
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

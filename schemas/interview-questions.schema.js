
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewQuestions = new Schema({
    id: { type: Number, required: true },
    category: { type: String, required: true },
    questionText: { type: String, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('InterviewQuestions', InterviewQuestions);

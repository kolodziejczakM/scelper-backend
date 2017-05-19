
const InterviewQuestions = require('../schemas/interview-questions.schema');

exports.getAll = () => {
    return InterviewQuestions.find();
};

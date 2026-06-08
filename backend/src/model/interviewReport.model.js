const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: {
        Type: String,
        required: [true, "technical question is required"]
    },
    intention: {
        Type: String,
        required: [true, "intention is required"]
    },
    answer: {
        Type: String,
        required: [true, "answer is required"]
    }, 
},  {
        _id: false
})

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        Type: String,
        required: [true, "behavioural question is required"]
    },
    intention: {
        Type: String,
        required: [true, "intention is required"]
    },
    answer: {
        Type: String,
        required: [true, "answer is required"]
    }, 
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        Type: String,
        required: [true, "skill is required"]
    },
    severity: {
        Type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        Type: String,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        Type: String,
        required: [true, "Task is required"]
    }
})

const interviewSchema = new mongoose.Schema({
    jobDescription:{
        Type: String,
        required: [true, "Job description is required"]
    },

    resume: {
        Type: String,
    },

    selfDescription: {
        Type: String,
    },

    matchScore: {
        Type: Number,
        min: 0,
        max: 100
    },

    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]

}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewSchema);
module.exports = interviewReportModel;
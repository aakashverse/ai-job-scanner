const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../model/interviewReport.model");

async function generateInterviewReportController(req, res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    }) 

    res.status(201).json({
        message: "interview report generated successfully",
        interviewReport
    })
}

async function getInterviewReportIdController(req, res) {
    const interviewId = req.params;

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id});

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })
}


async function getAllInterviewReportsController(req, res){
    const userId = req.body;

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "reports fetched successfully",
        interviewReports
    })
}


module.exports = {generateInterviewReportController, getInterviewReportIdController, getAllInterviewReportsController};




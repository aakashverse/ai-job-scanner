require("dotenv").config()
const express = require("express")
const connectToDB = require('./src/config/db')
const {resume, jobDescription, selfDescription} = require("./src/services/temp");
const generateInterviewReport = require("./src/services/ai.service");

const app = require("./app");


connectToDB()
generateInterviewReport({resume, jobDescription, selfDescription});

app.listen(3000, () => {
    console.log('app is running on port 3000..');
})
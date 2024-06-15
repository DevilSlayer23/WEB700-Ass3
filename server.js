/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Sagar Thapa    Student ID: 153855234    Date: 6/15/2024
*
********************************************************************************/ 
const HTTP_PORT = process.env.PORT || 8080;
import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
import{dirname}  from "path" ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {initialize,collegeData} from "./modules/collegeData.js";
const app = express();


// Helper function to handle promise-based routes
const handleRoute = (promise, res) => {
    promise
        .then(data => {
            if (data && data.length > 0) {
                res.json(data);
            } else {
                res.json({ message: "no results" });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "no results" });
        });
};

// GET /students
app.get("/students", (req, res) => {
    const course = req.query.course;
    if (course) {
        handleRoute(collegeData.getStudentsByCourse(course), res);
    } else {
        handleRoute(collegeData.getAllStudents(), res);
    }
});

// GET /tas
app.get("/tas", (req, res) => {
    handleRoute(collegeData.getTAs(), res);
});

// GET /courses
app.get("/courses", (req, res) => {
    handleRoute(collegeData.getCourses(), res);
});

// GET /student/:num
app.get("/student/:num", (req, res) => {
    const studentNum = req.params.num
    // console.log(`query : ${studentNum}`)

    handleRoute(collegeData.getStudentByNum(studentNum), res);
});

// GET /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

// GET /about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

// GET /htmlDemo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views/htmlDemo.html"));
});

// Handle 404
app.use((req, res) => {
    res.status(404).send("404 : Page Not Found");
});

// Initialize data and start the server
initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is listening on port ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Data initialization failed: ${err}`);
    });

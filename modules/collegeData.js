

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Use import.meta.url to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CollegeData {
  constructor(students = [], courses = []) {
    this.students = students;
    this.courses = courses;
  }

  getAllStudents() {
    if (!this.students || this.students.length === 0) {
      return Promise.reject('No students found in the data or data not initialized. Please call initialize() first.');
    }
    return Promise.resolve(this.students);
  }

  getTAs() {
    if (!this.students || this.students.length === 0) {
      return Promise.reject('No TAs found in the data or data not initialized. Please call initialize() first.');
    }

    const tas = this.students.filter(student => student.TA);
    return tas.length > 0 ? Promise.resolve(tas) : Promise.reject('No TAs found in the data');
  }

  getCourses() {
    if (!this.courses || this.courses.length === 0) {
      return Promise.reject('No courses found in the data or data not initialized. Please call initialize() first.');
    }
    return Promise.resolve(this.courses);
  }

  getStudentsByCourse(course) {
    if (!this.students || this.students.length === 0) {
      return Promise.reject('No students found in the data or data not initialized. Please call initialize() first.');
    }

    let student = [];
    for (let item of this.students)
    if(item.studentNum == num){
      student.push(item)
    }
    
    return student.length > 0 ? Promise.resolve(student) : Promise.reject('No results returned');
  }

  getStudentByNum(num) {
    if (!this.students || this.students.length === 0) {
      return Promise.reject('No students found in the data or data not initialized. Please call initialize() first.');
    }
    let student = [];
    for (let item of this.students)
    if(item.studentNum == num){
      student.push(item)
    }
    console.log(student)

    return student ? Promise.resolve(student) : Promise.reject('No results returned');
  }
}

let collegeData = new CollegeData();

async function initialize() {
  try {
    const studentData = await fs.readFile(path.join(__dirname, '../data/students.json'), 'utf8');
    const students = JSON.parse(studentData);
    // console.dir(students, { depth: null, colors: true });

    const courseData = await fs.readFile(path.join(__dirname, '../data/courses.json'), 'utf8');
    const courses = JSON.parse(courseData);
    // console.dir(courses, { depth: null, colors: true });

    // console.log(`[initialize] ${students}`);
    collegeData = new CollegeData(students, courses);
   
  } catch (error) {
    console.error('Error initializing college data:', error.message);
    throw new Error(error.message);
  }
}

export { initialize, collegeData };


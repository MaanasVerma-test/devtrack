console.log("Hello World");
// Student Grade Management System

// Array of student objects
let students = [
    { name: "Rahul", marks: [85, 78, 92] },
    { name: "Ananya", marks: [88, 61, 79] },
    { name: "Vikram", marks: [72, 68, 80] }
];

// Function to calculate average
function calculateAverage(marks) {
    let sum = 0;
    for (let i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    return sum / marks.length;
}

// Function to assign grade
function assignGrade(avg) {
    if (avg >= 90) return "A+";
    else if (avg >= 80) return "A";
    else if (avg >= 70) return "B";
    else if (avg >= 60) return "C";
    else return "Fail";
}

// Process each student
let topper = null;
let highestAvg = 0;

for (let student of students) {
    let avg = calculateAverage(student.marks);
    let grade = assignGrade(avg);

    console.log("Name:", student.name);
    console.log("Average:", avg.toFixed(2));
    console.log("Grade:", grade);
    console.log("--------------------");

    if (avg > highestAvg) {
        highestAvg = avg;
        topper = student.name;
    }
}

console.log("Topper of the class is:", topper);
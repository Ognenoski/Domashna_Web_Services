const studentsData = [
    {
        ime: "John",
        fakultet: "FINKI",
        prosek: 8.2,
        grad: "Skopje"
    },
    {
        ime: "Jane",
        fakultet: "FIKT",
        prosek: 9.3,
        grad: "Bitola"
    },
    {
        ime: "Mile",
        fakultet: "Goce Delcev",
        prosek: 7.6,
        grad: "Stip"
    },
    {
        ime: "Oliver",
        fakultet: "FIKT",
        prosek: 8.9,
        grad: "Skopje"
    },
    {
        ime: "Timco",
        fakultet: "American College",
        prosek: 9.9,
        grad: "Struga"
    },
    {
        ime: "Trpe",
        fakultet: "FINKI",
        prosek: 10,
        grad: "Ohrid"
    },
    {
        ime: "Marija",
        fakultet: "FINKI",
        prosek: 9.2,
        grad: "Resen"
    },
    {
        ime: "Ana",
        fakultet: "FINKI",
        prosek: 7.2,
        grad: "Skopje"
    },
    {
        ime: "Elena",
        fakultet: "FIKT",
        prosek: 6.0,
        grad: "Bitola"
    },
]

// Task 1: Find all students from Skopje and print their names
const studentsFromSkopje = studentsData
    .filter(student => student.grad === "Skopje")
    .map(student => student.ime);

console.log("Students from Skopje:", studentsFromSkopje);


// Task 2: Get all students ascending by prosek
const studentsAscending = [...studentsData]
    .sort((a, b) => a.prosek - b.prosek);

console.log("Ascending by prosek:", studentsAscending);


// Task 3: Find best student (one) from FINKI
const bestStudentFINKI = studentsData
    .filter(student => student.fakultet === "FINKI")
    .reduce((best, student) =>
        student.prosek > best.prosek ? student : best
    );

console.log("Best student from FINKI:", bestStudentFINKI);


// Task 4: Find worst student (one) from Bitola
const worstStudentBitola = studentsData
    .filter(student => student.grad === "Bitola")
    .reduce((worst, student) =>
        student.prosek < worst.prosek ? student : worst
    );

console.log("Worst student from Bitola:", worstStudentBitola);


// Task 5: Sort the cities by their students' GPA scores, descending
const citiesDescending = [...studentsData]
    .sort((a, b) => b.prosek - a.prosek)
    .map(student => ({
        grad: student.grad,
        prosek: student.prosek
    }));

console.log("Cities descending by GPA:", citiesDescending);
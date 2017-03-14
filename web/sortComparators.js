// JavaScript File
/*global _*/


function sortByName(students) {
    students = sortByFirstNames(students);
    return sortByLastNames(students);
}

function sortByFirstNames(students) {
    students = _.sortBy(students, function(student) {
        return student.fname.toLowerCase();
    });
    return students;
}

function sortByLastNames(students) {
    students = _.sortBy(students, function(student) {

        return student.lname.toLowerCase();
    });
    return students;
}

function sortByStartDate(students) {
    return students.sort(function(student1, student2) {
        let tempDate1 = new Date(student1.startDate);
        let tempDate2 = new Date(student2.startDate);
        if (tempDate1 > tempDate2) return 1;
        if (tempDate1 < tempDate2) return -1;
        return 0;
    });
}

function sortByPhoneNumber(students) {
    return students.sort(function(student1, student2) {
        if (student1.phone > student2.phone) return 1;
        if (student1.phone < student2.phone) return -1;
        return 0;
    });
}

function sortByYear(students) {
    return students.sort(function(student1, student2) {
        if (student1.year > student2.year) return 1;
        if (student1.year < student2.year) return -1;
        return 0;
    });
}

function sortByStreetAddress(students) {
    return students.sort(function(student1, student2) {
        if (student1.street > student2.street) return 1;
        if (student1.street < student2.street) return -1;
        return 0;
    });
}

function sortByCity(students) {
    return students.sort(function(student1, student2) {
        if (student1.city > student2.city) return 1;
        if (student1.city < student2.city) return -1;
        return 0;
    });
}

function sortByState(students) {
    return students.sort(function(student1, student2) {
        if (student1.state > student2.state) return 1;
        if (student1.state < student2.state) return -1;
        return 0;
    });
}

function sortByZip(students) {
    return students.sort(function(student1, student2) {
        if (student1.zip > student2.zip) return 1;
        if (student1.zip < student2.zip) return -1;
        return 0;
    });
}
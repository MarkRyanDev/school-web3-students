/*global expect*/

describe("sortFirstNames()", function() {
    it("should sort the list by first name of the students", function() { //spec
        window.uvuStudents = [{fname:"Steve"},{fname:"Bob"},{fname:"Joe"}];
        sortFirstNames();
        expect(window.uvuStudents[0].fname).toBe("Bob");
        expect(window.uvuStudents[1].fname).toBe("Joe");
        expect(window.uvuStudents[2].fname).toBe("Steve");
    });
    it("should sort the list by first name of the students regardless of case", function() { //spec
        window.uvuStudents = [{fname:"Steve"},{fname:"bob"},{fname:"Joe"}];
        sortFirstNames();
        expect(window.uvuStudents[0].fname).toBe("bob");
        expect(window.uvuStudents[1].fname).toBe("Joe");
        expect(window.uvuStudents[2].fname).toBe("Steve");
    });
});

describe("sortLastNames()", function() {
    it("should sort the list by last name of the students", function() { //spec
        window.uvuStudents = [{lname:"Hanson"},{lname:"Williams"},{lname:"Anderson"}];
        sortLastNames();
        expect(window.uvuStudents[0].lname).toBe("Anderson");
        expect(window.uvuStudents[1].lname).toBe("Hanson");
        expect(window.uvuStudents[2].lname).toBe("Williams");
    });
    it("should sort the list by last name of the students regardless of case", function() { //spec
        window.uvuStudents = [{lname:"Williams"},{lname:"Hanson"},{lname:"anderson"}];
        sortLastNames();
        expect(window.uvuStudents[0].lname).toBe("anderson");
        expect(window.uvuStudents[1].lname).toBe("Hanson");
        expect(window.uvuStudents[2].lname).toBe("Williams");
    });
});

describe("sortByStartDate()", function() {
    it("should sort the list by the starting date of the students by using Date()", function() { //spec
        window.uvuStudents = [{startDate:"3/12/93"},{startDate:"7/11/94"},{startDate:"12/23/92"}];
        sortByStartDate();
        expect(window.uvuStudents[0].startDate).toBe("12/23/92");
        expect(window.uvuStudents[1].startDate).toBe("3/12/93");
        expect(window.uvuStudents[2].startDate).toBe("7/11/94");
    });
    it("should sort the list by starting date of the students with using a different date format of dashes ( - ) instead of slash ( / )", function() { //spec
        window.uvuStudents = [{startDate:"3-12-93"},{startDate:"7-11-94"},{startDate:"12-23-92"}];
        sortByStartDate();
        expect(window.uvuStudents[0].startDate).toBe("12-23-92");
        expect(window.uvuStudents[1].startDate).toBe("3-12-93");
        expect(window.uvuStudents[2].startDate).toBe("7-11-94");
    });
    it("should sort the list by starting date of the students with adding leading zero to numbers less than 10", function() { //spec
        window.uvuStudents = [{startDate:"03-12-93"},{startDate:"7-11-94"},{startDate:"12-23-92"}];
        sortByStartDate();
        expect(window.uvuStudents[0].startDate).toBe("12-23-92");
        expect(window.uvuStudents[1].startDate).toBe("03-12-93");
        expect(window.uvuStudents[2].startDate).toBe("7-11-94");
    });
    it("should sort the list by starting date of the students with mixed year numbers of 2 digits and 4 digit years", function() { //spec
        window.uvuStudents = [{startDate:"03-12-93"},{startDate:"7-11-1994"},{startDate:"12-23-2092"}];
        sortByStartDate();
        expect(window.uvuStudents[0].startDate).toBe("03-12-93");
        expect(window.uvuStudents[1].startDate).toBe("7-11-1994");
        expect(window.uvuStudents[2].startDate).toBe("12-23-2092");
    });
});

describe("sortByPhoneNumber()", function() {
    it("should sort the list by the phone number of the students and the phone number format is uniform", function() { //spec
        window.uvuStudents = [{phone:"734-3219"},{phone:"369-3334"},{phone:"673-3114"}];
        sortByPhoneNumber();
        expect(window.uvuStudents[0].phone).toBe("369-3334");
        expect(window.uvuStudents[1].phone).toBe("673-3114");
        expect(window.uvuStudents[2].phone).toBe("734-3219");
    });
    it("should sort the list by the phone number of the students and the phone number format is not uniform", function() { //spec
        window.uvuStudents = [{phone:"734-3219"},{phone:"369.3334"},{phone:"673.3114"}];
        sortByPhoneNumber();
        expect(window.uvuStudents[0].phone).toBe("369.3334");
        expect(window.uvuStudents[1].phone).toBe("673.3114");
        expect(window.uvuStudents[2].phone).toBe("734-3219");
    });
});

describe("sortStreetAddress()", function() {
    it("should sort the list by street address of the students", function() { //spec
        window.uvuStudents = [{street:"923 North 1400 East"},{street:"1726 East 1330 North"},{street:"PO Box 33 463 West Main Street"}];
        sortStreetAddress();
        expect(window.uvuStudents[0].street).toBe("1726 East 1330 North");
        expect(window.uvuStudents[1].street).toBe("923 North 1400 East");
        expect(window.uvuStudents[2].street).toBe("PO Box 33 463 West Main Street");
    });
});

describe("sortByCity()", function() {
    it("should sort the list by the city of the students", function() { //spec
        window.uvuStudents = [{city:"Collinston"},{city:"Richards"},{city:"Jonefield"}];
        sortByCity();
        expect(window.uvuStudents[0].city).toBe("Collinston");
        expect(window.uvuStudents[1].city).toBe("Jonefield");
        expect(window.uvuStudents[2].city).toBe("Richards");
    });
});

describe("sortByState()", function() {
    it("should sort the list by the state of the students", function() { //spec
        window.uvuStudents = [{state:"ID"},{state:"ID"},{state:"ID"}];
        sortByState();
        expect(window.uvuStudents[0].state).toBe("ID");
        expect(window.uvuStudents[1].state).toBe("ID");
        expect(window.uvuStudents[2].state).toBe("ID");
    });
});

describe("sortZip()", function() {
    it("should sort the list by zip code of the students and doesn't matter if some have the additional 4 digits at the end or not", function() { //spec
        window.uvuStudents = [{zip:"93673-0422"},{zip:"93667"},{zip:"93622-9831"}];
        sortZip();
        expect(window.uvuStudents[0].zip).toBe("93622-9831");
        expect(window.uvuStudents[1].zip).toBe("93667");
        expect(window.uvuStudents[2].zip).toBe("93673-0422");
    });
});

describe("yearConverter()", function() {
    it("should convert the values of 1,2,3,4 into the actual word for that collegiate year. If less than 0 there's a message indicating outside of normal scope. If greater than 4 years then there is a congrat notice of being a CS student :) ", function() { //spec
        expect(yearConverter(1)).toBe("Freshman");
        expect(yearConverter(2)).toBe("Sophomore");
        expect(yearConverter(3)).toBe("Junior");
        expect(yearConverter(4)).toBe("Senior");
        expect(yearConverter(0)).toBe("You are outside of the so called normal collegiate years.")
        expect(yearConverter(10)).toBe("You have attended College for longer than 4 years. Congrats, you must be a CS student :)  Good Luck")
    });
});



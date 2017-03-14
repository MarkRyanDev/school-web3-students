// JavaScript File
/*global _*/
/*global $*/
/*global Cookies*/
/*global sortByName*/
/*global sortByCity*/
/*global sortByStreetAddress*/
/*global sortByStartDate*/
/*global sortByPhoneNumber*/
/*global sortByYear*/
/*global sortByState*/
/*global sortByZip*/

window.listOfRestores = [];

function yearNumberToWord(year) {
    if (year === 1) return "Freshman";
    if (year === 2) return "Sophomore";
    if (year === 3) return "Junior";
    if (year === 4) return "Senior";
    if (year > 4) return "You have attended College for longer than 4 years. Congrats, you must be a CS student :)  Good Luck";
    return "Error";
}

let propertyToSortFunctionMap = {
    'name': sortByName,
    'startDate': sortByStartDate,
    'street': sortByStreetAddress,
    'city': sortByCity,
    'state': sortByState,
    'zip': sortByZip,
    'year': sortByYear,
    'phoneNumber': sortByPhoneNumber
};

function orderBy(chosenColumn) {
    Cookies.set("chosenColumn", chosenColumn);

    let tempOrder = propertyToSortFunctionMap[chosenColumn](window.uvuStudents);

    if (window.currentlySelected === chosenColumn && window.ascendingOrder === true) {
        Cookies.set("ascView", "descending");

        tempOrder.reverse();
        window.ascendingOrder = false; // DESCENDING order section
        switch (chosenColumn) {
        case "name":
            $("#name").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet")
                .addClass("glyphicon glyphicon-sort-by-alphabet-alt");
            break;
        case  "startDate":
            $("#startingDate").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order")
                .addClass("glyphicon glyphicon-sort-by-order-alt");
            break;  
        case  "year":
            $("#year").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-attributes")
                .addClass("glyphicon glyphicon-sort-by-attributes-alt");

            break;  
        case  "street":
            $("#streetAddress").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-circle-arrow-down")
                .addClass("glyphicon glyphicon-circle-arrow-up");

            break;  
        case  "city":
            $("#city").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet")
                .addClass("glyphicon glyphicon-sort-by-alphabet-alt");
            break;  
        case  "state":
            $("#state").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet")
                .addClass("glyphicon glyphicon-sort-by-alphabet-alt");
            break;  
        case  "zip":
            $("#zip").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order")
                .addClass("glyphicon glyphicon-sort-by-order-alt");
            break;  
        case  "phoneNumber":
            $("#phoneNumber").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order")
                .addClass("glyphicon glyphicon-sort-by-order-alt");
            break;
        }
    }
    else {
        Cookies.set("ascView", "ascending");

        $("th span.glyphicon").addClass("makeItTransparent"); //hides all glyphicons in headers
        window.currentlySelected = chosenColumn;
        window.ascendingOrder = true; //ASCENDING order section
        
        switch(chosenColumn){
        case "name" :
            $("#name").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet-alt")
                .addClass("glyphicon glyphicon-sort-by-alphabet");
            break;
        case "startDate":
            $("#startingDate").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order-alt")
                .addClass("glyphicon glyphicon-sort-by-order");
            break;
        case "year":
            $("#year").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-attributes-alt")
                .addClass("glyphicon glyphicon-sort-by-attributes");
            break;
        case "street":
            $("#streetAddress").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-circle-arrow-up")
                .addClass("glyphicon glyphicon-circle-arrow-down");
            break;
        case "city":
            $("#city").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet-alt")
                .addClass("glyphicon glyphicon-sort-by-alphabet");
            break;
        case "state":
            $("#state").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-alphabet-alt")
                .addClass("glyphicon glyphicon-sort-by-alphabet");
            break;
        case "zip":
            $("#zip").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order-alt")
                .addClass("glyphicon glyphicon-sort-by-order");
            break;
        case "phoneNumber":
            $("#phoneNumber").children()
                .removeClass("makeItTransparent")
                .removeClass("glyphicon glyphicon-sort-by-order-alt")
                .addClass("glyphicon glyphicon-sort-by-order");
            break;
        }
    }
    displayStudentData(tempOrder);
}


function displayStudentData(students) {
    let studentsAsRows = students.map(function(eachStudent) {
        var date = `${eachStudent.startDate.getFullYear()}-${eachStudent.startDate.getMonth() + 1}-${eachStudent.startDate.getDate()}`;
        return `<tr>
            <td>
                <button id="edit${eachStudent.id}" type="button" data-toggle='tooltip' data-placement='top' title='Edit Student's Information class='editStudentDataButton btn btn-warning'> 
                    <span class="glyphicon glyphicon-pencil" ></span>
                </button>
                <button id="delete${eachStudent.id}" type="button" data-toggle='tooltip' data-placement='top' title="Delete Student" class='deleteStudentDataButton btn btn-danger'> 
                    <span class="glyphicon glyphicon-trash"></span>
                </button>
            </td>
            <td>${eachStudent.lname}, ${eachStudent.fname}</td>
            <td>${date}</td>
            <td>${yearNumberToWord(eachStudent.year)}</td>
            <td>${eachStudent.street}</td>
            <td>${eachStudent.city}</td>
            <td>${eachStudent.state}</td>
            <td>${eachStudent.zip}</td>
            <td>${eachStudent.phone}</td>
        </tr>`;
    });
    $("#tableBody").html(studentsAsRows.join(''));
    $('.editStudentDataButton').click(function() {
        upsert(parseInt($(this).attr('id').replace('edit', '')));
    });
    $('.deleteStudentDataButton').click(function() {
        window.idOfStudentToRemove = parseInt($(this).attr('id').replace('delete', ''));
        let studentToBeDeleted = window.uvuStudents.find(student => student.id === window.idOfStudentToRemove);
        $('#deleteStudentName').html(`${studentToBeDeleted.fname} ${studentToBeDeleted.lname}`);
        $('#deleteDoubleCheckModal').modal('show');
    });
    $('[data-toggle="tooltip"]').tooltip(); //make tooltips work
}

$(() => {
    $('#editStartDateInput').datepicker({format:'yyyy-m-d'});
    
    $('[data-toggle="tooltip"]').tooltip(); //enables tooltips everywhere
    
    $("#name").click(orderBy.bind(null, "name"));
    $("#startingDate").click(orderBy.bind(null, "startDate"));
    $("#year").click(orderBy.bind(null, "year"));
    $("#streetAddress").click(orderBy.bind(null, "street"));
    $("#city").click(orderBy.bind(null, "city"));
    $("#state").click(orderBy.bind(null, "state"));
    $("#zip").click(orderBy.bind(null, "zip"));
    $("#phoneNumber").click(orderBy.bind(null, "phoneNumber"));

    $('#deleteForRealButton').click(() => {
        $('#deleteDoubleCheckModal').modal('hide');
        
        //remove student from array
        let tempStudent = _.remove(window.uvuStudents, student => student.id === window.idOfStudentToRemove)[0];
        
        if(!tempStudent) throw 'couldn\'t find student to Remove';
        
        $('#restore').prop('disabled', false); //restore button is enabled
        //deleted students have no id
        tempStudent.id = undefined;
        window.listOfRestores.push(tempStudent);

        //redisplay table with same ordering
        orderBy(window.currentlySelected);
        orderBy(window.currentlySelected);

        $.ajax({
            url: `/api/v2/students/${window.idOfStudentToRemove}`,
            method: 'DELETE'
        });
    });

    $('#saveChangesButton').click(function() {
        //build student object


        let tempYear;
        switch ($('#yearSelect').val()) {
            case 'Freshman':
                tempYear = 1;
                // $('#student.year') = 1
                break;
            case 'Sophomore':
                tempYear = 2;
                break;
            case 'Junior':
                tempYear = 3;
                break;
            case 'Senior':
                tempYear = 4;
                break;
        }


        let newStudent = {
            "fname": $('#editFirstNameInput').val(),
            "lname": $('#editLastNameInput').val(),
            "startDate": new Date($('#editStartDateInput').val()),
            "street": $('#editStreetInput').val(),
            "city": $('#editCityInput').val(),
            "state": $('#editStateInput').val(),
            "zip": parseInt($('#editZipCodeInput').val()),
            "phone": $('#editPhoneInput').val(),
            "year": tempYear //$('#yearSelect').val() is retrieving whether Freshman, Sophomore etc is selected
        };
        if (window.currentStudentId) { //we are editing a student
            $.ajax({
                url: `/api/v2/students/${window.currentStudentId}`,
                data: newStudent,
                method: 'PATCH',
                success: function() {
                    //pull down loading modal
                    let indexOfCurrentStudent = window.uvuStudents.findIndex(function(student) {
                        return student.id === window.currentStudentId;
                    });
                    newStudent.id = window.currentStudentId;
                    window.uvuStudents[indexOfCurrentStudent] = newStudent;
                    $('#editStudentDataModal').modal('hide');
                    orderBy(window.currentlySelected);
                    orderBy(window.currentlySelected);
                    //order twice to get same direction as current with the new student info
                }
            });
        }
        else { //we are creating a new student
            $.ajax({
                url: '/api/v2/students',
                data: newStudent,
                method: 'POST',
                success: function(id) {
                    console.log(id);
                    newStudent.id = id;
                    window.uvuStudents.push(newStudent);
                    $('#editStudentDataModal').modal('hide');
                    orderBy(window.currentlySelected);
                    orderBy(window.currentlySelected);
                    //order twice to get same direction as current with the new student info
                }
            });
        }
    });

    $('#addNew').click(upsert.bind(null, undefined));
    $('#restore').click(function() {
        let studentToRestore = window.listOfRestores.pop();
        if (window.listOfRestores.length === 0) {
            $('#restore').prop('disabled', true)
                .tooltip('hide');
        }
        $.ajax({
            url: 'api/v2/students',
            method: 'POST',
            data: studentToRestore,
            success: function(id) {
                studentToRestore.id = id;
                window.uvuStudents.push(studentToRestore);
                orderBy(window.currentlySelected);
                orderBy(window.currentlySelected);
                //order twice to get same direction as current with the new student info
            }
        });
    });



    $("#tileButton").click(function() {
        Cookies.set("chosenView", "tiles");

        $(this).attr("title", "Tile View Selected");
        $("#tableButton").attr("title", "Click to select Table View");

        $("#tableClass").addClass("hidden"); //hides table view
        $("#tilesContainer").removeClass("hidden"); //shows tile view
        $("#tileButton").addClass("btn-primary") //makes the tile view button primary
            .removeClass("btn-default");
        $("#tableButton").removeClass("btn-primary")
            .addClass("btn-default");
    });
    $("#tableButton").click(function() {
        Cookies.set("chosenView", "table");

        $(this).attr("title", "Table View Selected");
        $("#tileButton").attr("title", "Click to select Tile View");

        $("#tilesContainer").addClass("hidden");
        $("#tableClass").removeClass("hidden");
        $("#tableButton").addClass("btn-primary")
            .removeClass("btn-default");
        $("#tileButton").removeClass("btn-primary")
            .addClass("btn-default");
    });

    $('#loadingModal').modal('show');

    $.ajax({
        url: '/api/v2/students',
        success: function(studentIds) {
            window.uvuStudents = [];
            studentIds = studentIds.slice(0, 10);
            for (let studentId of studentIds) {
                $.ajax({
                    url: `/api/v2/students/${studentId}`,
                    success: function(studentFromServer) {
                        //attach id to student
                        studentFromServer.id = studentId;
                        studentFromServer.startDate = new Date(studentFromServer.startDate);
                        window.uvuStudents.push(studentFromServer);

                        $('#progressBar').css('width', window.uvuStudents.length * 10 + '%').attr('aria-valuenow', window.uvuStudents.length * 10);

                        //DONE
                        if (window.uvuStudents.length === studentIds.length) {
                            $('#loadingModal').modal('hide');
                            
                            let tileInfo = window.uvuStudents.map(function(student) {
                                var date = `${student.startDate.getFullYear()}-${student.startDate.getMonth() + 1}-${student.startDate.getDate()}`;
                                return `
                                    <div class="floatingBox">
                                        ${student.lname}, ${student.fname}
                                        <br>
                                        ${student.phone}
                                        <br>
                                        <br>
                                        ${student.street}
                                        <br>
                                        ${student.city}, ${student.state}
                                        <br>
                                        ${student.zip}
                                        <br>
                                        <br>
                                        Started on ${date}
                                        <br>
                                        ${yearNumberToWord(student.year)}
                                    </div>`;
                            }).join('');
                            
                            $("#tilesContainer").html(tileInfo);

                            let testView = Cookies.get("ascView");
                            let testTile = Cookies.get("chosenView");
                            let testTable = Cookies.get("chosenColumn");

                            if (testTile === "tiles") $("#tileButton").click();

                            if (testTable === undefined) {
                                orderBy("name");
                            }
                            else {
                                orderBy(testTable);

                                if (testView === "descending") orderBy(testTable);
                                //order twice to get descending
                            }
                        }
                    }
                });
            }
        }
    });
});

function upsert(studentEditId) {
    if (studentEditId) { //if we are editing
        let studentToEdit = window.uvuStudents.find(student => student.id === studentEditId);
        if (studentToEdit === undefined) throw 'STUDENT ID NOT FOUND';
        let date = `${studentToEdit.startDate.getFullYear()}-${studentToEdit.startDate.getMonth() + 1}-${studentToEdit.startDate.getDate()}`;
        $('#editFirstNameInput').val(studentToEdit.fname);
        $('#editLastNameInput').val(studentToEdit.lname);
        $('#editStartDateInput').val(date);
        $('#editStartDateInput').datepicker('update', new Date(studentToEdit.startDate));
        $('#editCityInput').val(studentToEdit.city);
        $('#editStateInput').val(studentToEdit.state);
        $('#editZipCodeInput').val(studentToEdit.zip);
        $('#editPhoneInput').val(studentToEdit.phone);
        $('#editStreetInput').val(studentToEdit.street);
        $('#yearSelect').val(yearNumberToWord(studentToEdit.year));
    }
    else { //we are adding new
        $('#editFirstNameInput').val(''); 
        $('#editLastNameInput').val('');
        $('#editStartDateInput').val('');
        $('#editStartDateInput').datepicker('update', new Date());
        $('#editYearInput').val('Freshman'); 
        $('#editCityInput').val('');
        $('#editStateInput').val('');
        $('#editZipCodeInput').val('');
        $('#editPhoneInput').val('');
        $('#editStreetInput').val('');
    }
    window.currentStudentId = studentEditId;
    $('#editStudentDataModal').modal('show');
}
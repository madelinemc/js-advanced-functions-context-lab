/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

/* Your Code Here */


function createEmployeeRecord(employeeArray) {
    // returns javascript object with keys of new employee
    return {
        firstName: employeeArray[0], 
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmployeeArrays) {
    //returns array of objects
    return arrayOfEmployeeArrays.map(function(eachEmployeeArray){
        return createEmployeeRecord(eachEmployeeArray)
    })
}

function createTimeInEvent(dateStamp) {
    //returns the employee record after adding an object 
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this;
}

function createTimeOutEvent(dateStamp){
    //returns the employee record after adding an object 
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this;
}

function hoursWorkedOnDate(givenDate){
    //given a date find the number of hours elapsed between that dates timeInEvent and timeOutEvent
    //returns hours worked as an integer
    let timeIn = this.timeInEvents.find(function(e){
        return e.date === givenDate
    })

    let timeOut = this.timeOutEvents.find(function(e){
        return e.date === givenDate
    })

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(givenDate) {
    //using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed
    //returns pay owed as integer
    let wage = hoursWorkedOnDate.call(this, givenDate)
    return this.payPerHour * wage
}


function findEmployeeByFirstName(srcArray, firstName){
    //test the firstName field for a match with firstName argument
    //returns matching record or undefined
   return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arrayOfEmployeeRecords){
    //using wagesEarnedOnDate accumulate the value of all dates worked by the employee in the record used as context
    //returns the total amount of what is owed to all employees for all dates as a number
    return arrayOfEmployeeRecords.reduce(function(memo, record){
        return memo + allWagesFor.call(record)
    }, 0)
}

function form_to_gcal() { //takes answers from google-form and creates calendar-event
  var owner = "tse1.2017.18@gmail.com"; //owner of the calendar
  var calendar = CalendarApp.getCalendarById(owner); //calendar
  
  var form = FormApp.openById('15qlJu9Rq3CJGncPcc6VMiLN-2PzIyW95ZP8aSHnQJDY'); //opens form
  var formResponses = form.getResponses(); //array with all responses
  var formResponse = formResponses[formResponses.length-1]; //selects most recent form response
  var itemResponses = formResponse.getItemResponses();
  
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // array with all sheets of current spreadsheet
  var sheet = sheets[1]; //select second sheet
  var cell = sheet.getRange("G1");

  var subject = itemResponses[0].getResponse().toString(); //select subject
  var teacher = itemResponses[1].getResponse().toString();  //select teacher
  var kind = itemResponses[2].getResponse().toString(); //select kind of test
  var date = itemResponses[3].getResponse(); //select date in format yyyy-mm-dd
  var title = (subject + " / " + teacher + " " + kind); //title for the calendar event  
  var responseData = title + date; //all the data of the actual response in one string
  
    if (responseData == cell.getValue()) //check if event already exists and if so end script
  { 
    return;
  }
  
  date = date.replace("-",""); //format date to yyyymmdd
  date = date.replace("-",""); //format date to yyyymmdd
  
  var year = date.substring(0,4); //query year
  var monthNum = date.substring(4,6); //query month as numeral
  var dayNum = date.substring(6,8); //query day as numeral
  
  switch (monthNum) //convert month numeral to name
  {
    case "01":
      var month = "January";
      break;
    case "02":
      var month = "February";
      break;
    case "03":
      var month = "March";
      break;
    case "04":
      var month = "April";
      break;
    case "05":
      var month = "May";
      break;
    case "06":
      var month = "June";
      break;
    case "07":
      var month = "July";
      break;
    case "08":
      var month = "August";
      break;
    case "09":
      var month = "September";
      break;
    case "10":
      var month = "October";
      break;
    case "11":
      var month = "November";
      break;
    case "12":
      var month = "December";
      break;
    default:
      var month = "Error";
  }
  
  var start_time = new Date( month+" "+dayNum+", "+year ) //date for event
  
  var event = calendar.createAllDayEvent(title, start_time); //create new event
  event.setColor(11); //red color for event
  event.removeAllReminders();
  event.addPopupReminder(10080-960); //popup reminder one week prior to event ## -960 to compensate for event at 0100, reminder at 1700
 
  cell.setValue(responseData); //avoid event-duplication
  
}
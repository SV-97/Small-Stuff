function export_gcal() { //takes events from google calendar, applies certain criteria and transfers to google spreadsheet
  var owner = "tse1.2017.18@gmail.com"; //owner of the calendar
  var calendar = CalendarApp.getCalendarById(owner); //calendar
  var row = 4; //row in which to start ouputting data
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(); // array with all sheets of current spreadsheet
  var sheet = sheets[0]; //select first sheet

  var today = new Date(); //initializing date without argument returns current date and  time 
  var currentMonth = today.getMonth(); //Current month
  if( currentMonth.valueOf()+1 >= 9 ) //if current month is september or later ## +1 to compensate for January = 0
  {
    var start_time = new Date("September 01, " + today.getYear()) //set start time in current year
  } 
  else //if current month is earlier than september
  {
    var start_time = new Date("September 01, " + (today.getYear()-1)) //set start time in last year
  };
   
  var end_time = new Date(start_time.getTime() + 3.154*Math.pow(10, 10)); //3,154E10 miliseconds equal one year 
  Logger.log('start time is ' + start_time + ' with end time ' + end_time); 

  var events = CalendarApp.getEvents(start_time, end_time); //array with all events in current year
  var actEvents = []; //list of actually needed events 
  
  for (var i=0; i<events.length; i++) //criteria for events
  {if( (events[i].getColor()) != 11) //check if color of event is red(id:11) and append event to list if true
    {
      continue;
    }
   actEvents.push(events[i]); //push to array
  };
  
  for (var i=0; i<actEvents.length; i++) //transfer events that fit criteria to spreadsheet
  {
   var title = actEvents[i].getTitle(); //get title of event
   var date = actEvents[i].getStartTime(); //get date
   var subject = title.substring(0, title.indexOf("/")-1 ); //select substring subject (e.g. Math)  
   var teacher = title.substring(title.indexOf(" / ")+3, title.lastIndexOf(" ")); //select substring teacher
   var kind = title.substring(title.indexOf(teacher)+teacher.length, title.length); //select substring kind of event
   var description =actEvents[i].getDescription(); //description of event
   var details = [[date, subject, teacher, kind, description]]; //array of all event-metadata
   var range = sheet.getRange("C"+(row+i)+":G"+(row+i)); //range to write values in
   range.setValues(details); //write values to spreadsheet
  };
}
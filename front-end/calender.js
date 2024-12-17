document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth", 
    events: [
      {
        title: "Event 1",
        start: "2024-11-25", 
      },
      {
        title: "Event 2",
        start: "2024-11-28",
        end: "2024-11-30",
      },
    ],
    dateClick: function (info) {
      alert("Date clicked: " + info.dateStr); // 
    },
  });

  calendar.render(); 
});

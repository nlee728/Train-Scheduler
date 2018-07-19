// Initialize Firebase
var config = {
   apiKey: "AIzaSyCcmkhnfEsQXHAf9FqcWM2FRSXx_6wc1EM",
   authDomain: "test-907f3.firebaseapp.com",
   databaseURL: "https://test-907f3.firebaseio.com",
   projectId: "test-907f3",
   storageBucket: "test-907f3.appspot.com",
   messagingSenderId: "659721969084"
 };
 firebase.initializeApp(config);
 
 var database=firebase.database();
 var TS = database.ref("Train Schedule/Trains");
 class createEmployee {
  constructor(name, role, startDate, monthlyRate) {
  this.name = name;
  this.role = role;
  this.startDate = startDate;
  this.monthlyRate = monthlyRate;
  }
}

 function calculations() {
  var name = $("#name-input").val().trim();
     var role = $("#role-input").val().trim();
     var startDate = $("#sd-input").val();
     var monthlyRate = $("#mr-input").val().trim(); 
  var months = moment().diff(moment(startDate), "months");
    console.log(months);
    var totalBilled = (months*monthlyRate);
    console.log(totalBilled);
 };

   // Capture Button Click
   $("#add-user").on("click", function(event) {
     // prevent page from refreshing when form tries to submit itself
     event.preventDefault();
     // Capture user inputs and store them into variables
     var name = $("#name-input").val().trim();
     var role = $("#role-input").val().trim();
     var startDate = $("#sd-input").val();
     var monthlyRate = $("#mr-input").val().trim(); 
     calculations();

      TS.push(new createEmployee(name, role, startDate, monthlyRate, months, totalBilled));
    });
TS.on('child_added', function(snap) {
  const tr = $('<tr>');
  $('tbody').append(tr);
  tr.append($("<th>").text(snap.val().name));
  tr.append($("<th>").text(snap.val().role));
  tr.append($("<th>").text(snap.val().startDate));
  tr.append($("<th>").text(snap.val().months));
  tr.append($("<th>").text(snap.val().monthlyRate));
  tr.append($("<th>").text(snap.val().totalBilled));    
});


//Months worked and total billed calculations
var startDate = $("#sd-input").val();
var monthlyRate = $("#mr-input").val().trim(); 

var months = moment(startDate).diff(moment(), "months");

console.log(months);

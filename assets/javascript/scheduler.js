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
 
 var database = firebase.database().ref('TrainSchedule/trains');
 
 // Button for adding trains
 $("#add-train-btn").click(function(event) {
     // prevent form submisson
     event.preventDefault();
 
     // Creates local "temporary" object for holding train data
     var newTrain = {
         name: $("#train-name-input").val().trim(),
         destination: $("#destination-input").val().trim(),
         frequency: $("#frequency-input").val().trim(),
     };
 
     // Uploads train data to the database and resets inputs
     database.push(newTrain);
     console.log(newTrain);
     resetInputs();
 });
 
 // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
 database.on("child_added", function(childSnapshot) {
     // Train Info
     var newTrain = childSnapshot.val();
     console.log(newTrain);
     
     // Calculate the next arrival
     newTrain.nextArrival = moment().diff(moment.unix(newTrain.frequency, "X"), "minutes");
     console.log(newTrain.nextArrival);
     
     // Calculate the minutes away
     newTrain.minutesAway = moment().diff(moment.unix(newTrain.frequency, "X"), "minutes");
     console.log(newTrain.billed);
 
     // Add each train's data into the table
     $("#train-table > tbody").append(createTrainRow(newTrain));
 });
 
//  Add new train to table
 function createTrainRow(train) {
   var trow = $('<tr>');
   trow.append('<td>' + train.name + '</td>')
       .append(`<td>${train.destination}</td>`)
       .append(`<td>${train.frequency}</td>`)
       .append(`<td>${train.nextArrival}</td>`)
       .append(`<td>${train.minutesAway}</td>`);
   return trow;
 }
 
//  Reset form fields
 function resetInputs() { 
   $("form input:not([submit])").val('');
   $("#train-name-input").focus();
 }
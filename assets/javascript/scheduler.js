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

    database.on("value", function (snapshot) {
        var data = snapshot.val();

        // On-click event handler for submit button
        $("#submit").on("click", function () {
            var trainName = $("#train-name").val().trim();
            var destination = $("#destination").val().trim();
            var firstTrainTime = $("#first-train-time").val().trim();
            var frequency = $("#frequency").val().trim();
            console.log(trainName);
            console.log(destination);
            console.log(firstTrainTime);
            console.log(frequency);

            //Push values to Firebase 
            database.push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency

            });
            //Reset form values
            $("#train-name").val("");
            $("#destination").val("");
            $("#first-train-time").val("");
            $("#frequency").val("");

        })

        database.off();

        //Firebase Listener 
        database.on("child_added", function (childSnapshot) {
            var newTrain = childSnapshot.val().trainName;
            var newDestination = childSnapshot.val().destination;
            var newFirstTrain = childSnapshot.val().firstTrainTime;
            var newFrequency = childSnapshot.val().frequency;

            //First Train Time - push back one year
            var arrivalTime = moment(newFirstTrain, 'HH:mm').subtract(1, "years");
            console.log(moment(arrivalTime).format("hh:mm"));

            //Difference between the times
            var diffTime = moment().diff(moment(arrivalTime), "minutes");
            console.log(diffTime);

            //Time Apart (remainder)
            var tRemainder = diffTime % newFrequency;
            console.log(tRemainder);

            //Minutes until train
            var tMinutesTilTrain = newFrequency - tRemainder;
            console.log(tMinutesTilTrain);

            //Next Train
            var nextTrain = moment().add(tMinutesTilTrain, "minutes");
            console.log(moment(nextTrain).format("hh:mm"));

            //Format Time to AM PM
            var newFirstTrain = moment(nextTrain).format("hh:mm a");

            //Show trains in HTML
            $("#trains").append("<tr>")
                        .append("<td>" + newTrain + "</td>")
                        .append("<td>" + newDestination + "</td>")
                        .append("<td>" + newFrequency + "</td>")
                        .append("<td>" + newFirstTrain + "</td>")
                        .append("<td>" + tMinutesTilTrain + "</td>")
                        .append("</tr>");
        });
    });

//  Show current time on clock
function update() {
    $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
  }
  setInterval(update, 1000);
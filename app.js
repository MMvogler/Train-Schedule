// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCtq7aQ0pgFuJIgTOlNQ-7ZfN6nsgr4OU0",
    authDomain: "trainschedule-81c4c.firebaseapp.com",
    databaseURL: "https://trainschedule-81c4c.firebaseio.com",
    projectId: "trainschedule-81c4c",
    storageBucket: "",
    messagingSenderId: "904131159394",
    appId: "1:904131159394:web:dbe0ef10dcbe2445fdb83b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Button to add trains 
  $(".btn").on("click", function(event) {
      event.preventDefault();

    // To grab user input in form
    var inputTrain = $("#input-train").val().trim();
    var inputDestination = $("#input-destination").val().trim();
    var inputFirstTrain = $("#input-first-train").val().trim();
    var inputFrequency = $("#input-frequency").val().trim();

   

    // Pushes new train data to database
    database.ref().push({
      train: inputTrain,
      destination: inputDestination,
      first: inputFirstTrain,
      frequency: inputFrequency
  });

    // Clears the form once a train is added
    $("#input-train").val("");
    $("#input-destination").val("");
    $("#input-first-train").val("");
    $("#input-frequency").val("");

  });

  // Firebase event that adds trains to the database 
  database.ref().on("child_added", function(childSnapshot){


    // Variables to store train information
    var trainName = childSnapshot.val().train;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    
    //  var tFrequency = 3;
    //  var firstTime = "03:30";
 
     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);
 
     // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
 
     // Calculates the difference and puts into minutes
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Remainder 
     var tRemainder = diffTime % trainFrequency;
     console.log(tRemainder);
 
     // Minutes until train arrives 
     var minutesAway = trainFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + minutesAway);
 
     // Next train's arrival time
     var arrival = moment().add(minutesAway, "minutes");
     console.log("ARRIVAL TIME: " + moment(arrival).format("hh:mm"));

    // // Variable for train calculations  
    // var minutes = moment().diff(firstTrain,"minutes");
    // var minutesAway = minutes % frequency;
    // var nextTrain = moment().add(minutesAway,"m").format("hh:mm");

    // moment() --> currentTime;
    // moment().diff(firsttrain,"minutes");
    // moment().add(minutesAway,"m");

   

    //Add a new row for the new train user added
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(trainFrequency),
        $("<td>").text(arrival),
        $("<td>").text(minutesAway),
        
    );

    //Append new row to the train display
    $("#trains-display > tbody").append(newRow);

});
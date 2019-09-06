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

  var dataRef = firebase.database();

  // Button to add trains 
  $(".btn").on("click", function(event) {
      event.preventDefault();

    // To grab user input in form
    var inputTrain = $("input-train").val().trim();
    var inputDestination = $("input-destination").val().trim();
    var inputFirstTrain = $("input-first-train").val().trim();
    var inputFrequency = $("input-frequency").val().trim();

    // Temporarily holds data
    var newTrain = {
        train: inputTrain,
        destination: inputDestination,
        first: inputFirstTrain,
        frequency: nputFrequency
    }

    // Pushes new train data to database
    database.ref().push(newTrain);
    
  });
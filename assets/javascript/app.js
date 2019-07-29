// $(document).ready(function(){

// Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyD5lyDmWZM6fjcTsSJtfp-SI5JxfNR1POc",
    authDomain: "train-scheduler-39916.firebaseapp.com",
    databaseURL: "https://train-scheduler-39916.firebaseio.com",
    projectId: "train-scheduler-39916",
    storageBucket: "",
    messagingSenderId: "367588429764",
    appId: "1:367588429764:web:83dc74e6333da4dc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//console.log(moment());
// Variables

$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    // Grab user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    // firstTrain time format converted, and pushed back a year to ensure it is not interpretted as a future date
   // var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(trainName);
    // Temp object for newTrain properties
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency 
    };

    // Push that data!
    database.ref().push(newTrain);
    
    // Console log data
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainConverted);
    console.log(newTrain.frequency);
  
    alert("data pushed");

});
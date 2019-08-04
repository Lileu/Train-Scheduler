$(document).ready(function () {

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
    const database = firebase.database();

    // Variables

    $("#submitBtn").on("click", function (event) {
        event.preventDefault();

        // Grab user input
        let trainName = $("#trainNameInput").val().trim();
        let destination = $("#destinationInput").val().trim();
        let firstTrain = $("#firstTrainInput").val().trim();
        let frequency = $("#frequencyInput").val().trim();

        // Temp object for newTrain properties
        const newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        alert("Train information has been added!");

        // Push that data!
        database.ref().push(newTrain);
        // Clear input fields
        $("#trainNameInput").val('');
        $("#destinationInput").val('');
        $("#firstTrainInput").val('');
        $("#frequencyInput").val('');
    });

    // Referencing the data when firebase has been updated
    database.ref().on("child_added", function (childSnapshot) {
        var sv = childSnapshot.val();
        const trainName = sv.trainName;
        const destination = sv.destination;
        const firstTrain = sv.firstTrain;
        const frequency = sv.frequency;

        // Formatting + Calcs
        var currentTime = moment();
        var firstTrainConverted = moment(sv.firstTrain, "HH:mm A").subtract(1, "years");
        var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
        var timeRemaining = timeDifference % parseInt(sv.frequency, 10);
        var minutesAway = parseInt(sv.frequency, 10) - timeRemaining;
        var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm A");

        // Console log data
        console.log("Train name: " + sv.trainName);
        console.log("Destination: " + sv.destination);
        console.log("First train from: " + sv.firstTrain);
        console.log("Comes every: " + sv.frequency);
        console.log("Mins until next train: " + minutesAway);
        console.log("Next train time: " + nextTrain);

        // Add table data to html
        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway)
        );

        $('tbody').append(newRow);
    })
});
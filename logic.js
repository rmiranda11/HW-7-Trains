
var config = {
    apiKey: "AIzaSyDOIsmtwICjQg1oyUP1fkaVi-rO78E7HoM",
    authDomain: "hw-7-trains.firebaseapp.com",
    databaseURL: "https://hw-7-trains.firebaseio.com",
    projectId: "hw-7-trains",
    storageBucket: "",
    messagingSenderId: "311275094089"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//-------------On Click for button --------------------

$("#add-train-btn").on("click",function(event){
    event.preventDefault();

    var train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);


    alert("Train successfully added");

    $("#train-name-input").val(train);
    $("#destination-input").val(destination);
    $("#first-train-input").val(firstTrain);
    $("#requency-input").val(frequency);

});

//-----------------database call----------------------
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

 console.log(childSnapshot.val());

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    console.log(train);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var firstTimeConverted = moment(firstTrain, "HH:mm");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    $("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain.format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

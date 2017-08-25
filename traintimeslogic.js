var config = {
  apiKey: "AIzaSyCcPFcbAjIsgXGQwE-A3AcOXkeD40qypE8",
  authDomain: "train-times-93583.firebaseapp.com",
  databaseURL: "https://train-times-93583.firebaseio.com",
  storageBucket: "train-times-93583.appspot.com"
};
firebase.initializeApp(config);
var trainData = firebase.database();
$("#add-train-btn").on("click", function() {

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainUnix = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrainUnix,
    frequency: frequency
  };
  
  trainData.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(firstTrainUnix);
  console.log(newTrain.frequency);
  
  alert("Train successfully added");
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  return false;

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});
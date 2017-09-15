// Initialize Firebase
var config = {
apiKey: "AIzaSyAcruevxY7g0LFQRSd3FsmeRM90ZoEJsMM",
authDomain: "rpsbroh.firebaseapp.com",
databaseURL: "https://rpsbroh.firebaseio.com",
projectId: "rpsbroh",
storageBucket: "",
messagingSenderId: "183966497546"
};
firebase.initializeApp(config);


// Create reference to firebase database.
var dataRef = firebase.database();


// location to store connections
var connectionsRef = dataRef.ref("/connections");

// keep track of user connections
var connectedRef = dataRef.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").html(snap.numChildren());
});
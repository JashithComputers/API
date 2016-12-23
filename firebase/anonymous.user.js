var anonUser;

firebase.auth().signInAnonymously().then(function(user) {
	anonUser = user;
}).catch(function(error) {
	console.error("Anon sign in failed", error);
});



function deleteAndLink(credential) {
	firebase.auth().currentUser.delete().then(function() {
		anonUser.link(credential);
	}).then(function() {
		console.log("Link succeeded");
	}).catch(function(error) {
		console.error("Something went wrong", error);
	});
}

var credential = firebase.auth.EmailAuthProvider.credential(
	    email,
	    password
	);


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});

firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});


var userId = firebase.auth().currentUser.uid;
firebase.database().ref('users/' + userId + "/wishlish").set({
	    products: p
	  });
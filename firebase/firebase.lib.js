console.log("<script src='https://www.gstatic.com/firebasejs/3.6.2/firebase.js'></script>" +
		"\n" +
		"<script src='https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js'></script>" +
		"\n" +
		"<script src='https://www.gstatic.com/firebasejs/3.6.2/firebase-auth.js'></script>" +
		"\n" +
"<script src='https://www.gstatic.com/firebasejs/3.6.2/firebase-database.js'></script>");
var JCL_firebase = {
		DB_DOMAIN : "unknown",
		setup: function (config)
		{
			this.DB_DOMAIN = config.DB_DOMAIN;
			$(document).ready(function(){
				// Initialize Firebase
				var config = {
						apiKey: "AIzaSyAOOe1uvfZ79LW93w65Dv6L9JWqDYVaN4A",
						authDomain: "jashith-computers.firebaseapp.com",
						databaseURL: "https://jashith-computers.firebaseio.com"
				};
				firebase.initializeApp(config);
			});
		},
		getDatabase:function(){
			// Get a reference to the database service
			var database = firebase.database();
			return database;
		},
		getDomain:function(){
			return this.DB_DOMAIN;
		},
		getUser:function(){
			var user = firebase.auth().currentUser;
			return user;
		},
		is_auth:function(){
			var user = firebase.auth().currentUser;
			return user ? true : false;
		},
		getUID:function(){
			var user = firebase.auth().currentUser;
			return user ? user.uid : null;
		},
		getEmail:function(){
			var user = firebase.auth().currentUser;
			return user ? user.email : null;
		},
		getName:function(){
			var user = firebase.auth().currentUser;
			return user ? (user.displayName ? user.displayName : "User") : null;
		},
		getPhotoURL:function(){
			var user = firebase.auth().currentUser;
			return user ? user.photoURL : null;
		},
		createUserWithEmailAndPassword:function(email, password, errorFn)
		{
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				if(typeof(errorFn)=="function") errorFn(error);
			});
		},
		signInWithEmailAndPassword:function(email, password, errorFn)
		{
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				if(typeof(errorFn)=="function") errorFn(error);
			});
		},
		sendEmailVerification:function(){
			var user = firebase.auth().currentUser;

			user.sendEmailVerification().then(function() {
				// Email sent.
			}, function(error) {
				// An error happened.
			});
		},
		sendPasswordResetEmail:function(email){
			var auth = firebase.auth();

			auth.sendPasswordResetEmail(email).then(function() {
				// Email sent.
			}, function(error) {
				// An error happened.
			});
		},
		signOut:function(success, error){
			firebase.auth().signOut().then(function() {
				// Sign-out successful.
				console.log("Sign-out successful");
				if(typeof(success)=="function") success();
			}, function(error) {
				// An error happened.
				console.log(error);
				if(typeof(error)=="function") error(error);
			});
		},
		_logUserData:function(user){
			var th = this;
			//store all user data
			if(user)
			{
				var lastActiveOn = new Date();
				var userData = {
						email: user.email
						, name: user.displayName
						, photoURL: user.photoURL
						, emailVerified: user.emailVerified
						, lastActiveOn : lastActiveOn
				};
				firebase.database().ref('admin/users/' + user.uid ).update(userData);
				firebase.database().ref(th.getDomain() + '/users/' + user.uid ).update({lastActiveOn:lastActiveOn});
				console.log("user data updated");
			}
		},
		onAuthStateChanged:function(callback)
		{
			var th = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if(user)
				{
					if (user.emailVerified) {
						console.log('Email is verified');
					}
					else {
						console.log('Email is not verified');
					}
				}
				if(typeof(callback)=="function") callback(user);
				
				th._logUserData(user);
			});
		},
		signInWithPopup:function(provider, successFn, errorFn){
			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...

				console.log(user);
				if(typeof(successFn)=="function") successFn(user);
			}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...

				console.log(error);
				if(typeof(errorFn)=="function") errorFn(error);
			});
		},
		googleLogin:function(successFn, errorFn){
			var provider = new firebase.auth.GoogleAuthProvider();
			this.signInWithPopup(provider, successFn, errorFn);
		},
		facebookLogin:function(successFn, errorFn){
			var provider = new firebase.auth.FacebookAuthProvider();
			this.signInWithPopup(provider, successFn, errorFn);
		}
};
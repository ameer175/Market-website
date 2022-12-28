/*
$(document).ready(function(){ 
document.getElementById("img1").style.display = "block";
})
*/
//contact us
function contact_function() {
    window.open(href = "pop_contact.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=800,height=400");
}



var user = null;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	
	window.location ='HomePage.html';  
	var user = firebase.auth().currentUser;
	
	if(user != null){
		
		var email_id = user.email;

	}
	  
  } else {
    // No user is signed in.
	console.log("wait for sign up");
  }
});
function personal_ar_func()
{
	document.getElementById("img1").style.display = "block";
	if (isDiv == 1)
	{
	    document.getElementById("output").parentNode.removeChild(logdiv);
		isDiv = 0;
	}
}
var isDiv = 0;
  function login_function() {
	document.getElementById("img1").style.display = "none";
	document.getElementById("img2").style.display = "none";
	  if (isDiv == 0){
		  isDiv=1;

 document.getElementById("output").insertAdjacentHTML("afterend",
				"<div id='logdiv'>\
                <label for='uname'><b>Username</b></label> \
				<script> src='https://www.gstatic.com/firebasejs/6.3.4/firebase.js'></script>\
				<input type='text' placeholder='Enter Username' name='uname' id='email_field' required> \
				<label for='psw'><b>Password</b></label> \
				<input type='password' placeholder='Enter Password' name='psw' id='password_field' required>\
				<button type='submit' id='btnLogin' onclick='login()'>Login</button>\
				<div>\
				</div>\
				</div>"); 
	  }
	  else
	  {
		  document.getElementById("output").parentNode.removeChild(logdiv);
		  
	  }
  }

  function signin_function() {
	document.getElementById("img1").style.display = "none";
	document.getElementById("img2").style.display = "none";
    
    if (isDiv == 0){
		  isDiv=1;
		document.getElementById("output").insertAdjacentHTML("afterend",
				"<div id='logdiv'>\
                <label for='uname'><b>Username</b></label> \
				<script> src='https://www.gstatic.com/firebasejs/6.3.4/firebase.js'></script>\
				<input type='text' placeholder='Enter Username' name='uname' id='email_field' required> \
				<label for='psw'><b>Password</b></label> \
				<input type='password' placeholder='Enter Password' name='psw' id='password_field' required>\
				<button type='submit' id='btnSignup' onclick='create_acc()'>Sign up</button>\
				</div>"); 		
		
		}
	  else
	  {
		  document.getElementById("main").parentNode.removeChild(logdiv);
	  }  
  }
 
function create_acc()
{
	var signup_userEmail = document.getElementById("email_field").value;
	var signup_userPass = document.getElementById("password_field").value;	
	
	firebase.auth().createUserWithEmailAndPassword(signup_userEmail,signup_userPass).catch(function(error){
	 // Handle Errors here.
 	 var errorCode = error.code;
	 var errorMessage = error.message;
         window.alert("Error : "+ errorMessage);
	  // ...
	})

}

function logout(){  
	firebase.auth().signOut();
	window.location ='index.html';
	
}


var userEmail;
///////////////////

function login(){
	
	userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;
	
	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error : "+ errorMessage);
  window.close();
  // ...
});
	
}



function logout(){ //logout user
	firebase.auth().signOut();
		window.location ='index.html';  
}

// firebase - database
var firebaseConfig = {
  apiKey: "AIzaSyDIf7KnM9yc4sOzKvb9gr_AF9LxtrtSuVs",
  authDomain: "budjetitnew.firebaseapp.com",
  databaseURL: "https://budjetitnew.firebaseio.com",
  projectId: "budjetitnew",
  storageBucket: "budjetitnew.appspot.com",
  messagingSenderId: "3172549884",
  appId: "1:3172549884:web:ace42db237e84edade0379",
  measurementId: "G-70Z4ZGEZPV"
};
// Initialize Firebase
var str="";
var userEmail="";
var isMyFirstTime=true;
var isGetInToCheck=false;
var myId;
firebase.initializeApp(firebaseConfig);

//check user and login
firebase.auth().onAuthStateChanged(function(user) { 
if (user) {
var user = firebase.auth().currentUser;	
userEmail=user.email; 
var i=0;
c=userEmail[i];
while (c!='@') //get name from email
{
str=str+userEmail[i];
i++;
c=userEmail[i];
}
console.log("MY USER IS " + str);
document.getElementById("welcomId").innerHTML="welcom "+str;
var databaseRef = firebase.database().ref('users/'); 

databaseRef.once('value', function(snapshot) { //check if user is connected  			
  snapshot.forEach(function(childSnapshot) {
    var numOfChild=snapshot.numChildren();
    var childKey = childSnapshot.key;	
    var childData = childSnapshot.val();
    if(childData.user_Email==userEmail)
    {
    isMyFirstTime=false;
    myId=childData.user_id;
    console.log("get into my user ");
    }
});
if(isMyFirstTime) //&& isGetInToCheck)
{
var uid = firebase.database().ref().child('users').push().key;
  myId = uid;
  var data = {
    user_id: uid,
    user_name: str,
    user_Email: userEmail,
	  numExpence: '0',
	  numIncome: '0', 
  }
  var updates = {};
  updates['/users/' + uid] = data;
  firebase.database().ref().update(updates); 
}		
}); //end databaseRef.once
}
}); //end firebase.auth().onAuthStateChanged


var numOfIncom;
var a;

function click_income(){ //save income
  if(!IsText($('#name_input_income').val()) || !IsNumber($('#sum_input_income').val()))
  {
    alert("Empty field or invalid character")
  }
 else
 {
  console.log("get into income submit");
  //take num of income
  firebase.database().ref('/users/' + myId+'/numIncome').once('value').then(function(snapshot) {
  numOfIncom = (snapshot.val());
    console.log("numIncome ="+numOfIncom);
  a = numOfIncom*1;
  a=a+1;
 numOfIncom = parseInt(a);
 changeIncom();
 });
}

} //end click_income()

function changeIncom(){ 
   console.log("a ="+numOfIncom);
  //change the incom number
  firebase.database().ref('users/' + myId).update({
  numIncome: numOfIncom,
});

 var databaseRef = firebase.database().ref('users/'+myId); 
 var nameIncome=document.getElementById("name_input_income").value;
 var sumIncome=document.getElementById("sum_input_income").value;
 var strIncom='income'+numOfIncom+'_'+nameIncome;
 var strDiv = 'logdiv'+strIncom;
 var a = sumIncome*1;
 var tempTotal = document.getElementById("total_id").innerHTML;
 var t = tempTotal.slice(7);
 console.log("tempTotal="+t);
 total=t*1;
 total=total+a;
 document.getElementById("total_id").innerHTML = "Total: "+total;

 console.log(strIncom);
 var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
 console.log("imonth is: "+imonth);
 eval("databaseRef.child('year').child('"+iyear+"').child('"+imonth+"').update({"+strIncom+":"+sumIncome+"})");
 if(fisrtToch==1){

 document.getElementById('output').insertAdjacentHTML('afterend',
        "<div id="+strDiv+">\
         <label style='margin:7px'><b>income:&#160;"+nameIncome+"&#160;&#160;&#160;&#160;value="+sumIncome+"</b></label> \
				<script> src='https://www.gstatic.com/firebasejs/6.3.4/firebase.js'></script>\
				<br><button id='btn_"+strDiv+"'  onclick='deleteExpOrInc()' style= 'border: 1px solid black; font-size:x-small; padding: 0.5px 0.5px; margin-left:7px; width:4%; background-color:red;'>DELETE</button>\
				<div>\
				</div>\
				</div>"); 
      }
      document.getElementById("myForm").reset();
} //end changeIncom()

var numOfExpence;
function click_expence(){ //save expence
  if(!IsText($('#name_input_expence').val()) || !IsNumber($('#sum_input_expence').val()))
  {
    alert("Empty field or invalid character")
  }
  else
  {
    console.log("get into expence submit");
    //take num of income
    firebase.database().ref('/users/' + myId+'/numExpence').once('value').then(function(snapshot) {
    numOfExpence = (snapshot.val());
    console.log("numExpence ="+numOfExpence);
    a = numOfExpence*1;
    a=a+1;
   numOfExpence = parseInt(a);
   changeExpence();
     // ...
   });
  }
} //end click_expence()

function changeExpence(){
   console.log("a ="+numOfExpence);
  //change the incom number
  firebase.database().ref('users/' + myId).update({
  numExpence: numOfExpence,
  });

 var databaseRef = firebase.database().ref('users/'+myId); 
 var nameIncome=document.getElementById("name_input_expence").value;
 var sumIncome=document.getElementById("sum_input_expence").value;
 var strIncom='Expence'+numOfExpence+'_'+nameIncome;
 var strDiv = 'logdiv'+strIncom;
 console.log(strIncom);
 var a = sumIncome*1;
 var tempTotal = document.getElementById("total_id").innerHTML;
 var t = tempTotal.slice(7);
 console.log("tempTotal="+t);
 total=t*1;
 total=total-a;
 document.getElementById("total_id").innerHTML = "Total: "+total;

 var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
 console.log("imonth is: "+imonth);
 eval("databaseRef.child('year').child('"+iyear+"').child('"+imonth+"').update({"+strIncom+":"+sumIncome+"})");
		if(fisrtToch==1){
      document.getElementById('output').insertAdjacentHTML('afterend',
      "<div id="+strDiv+">\
       <label style='margin:7px'><b>Expence:&#160;"+nameIncome+"&#160;&#160;&#160;&#160;value="+sumIncome+"</b></label> \
      <script> src='https://www.gstatic.com/firebasejs/6.3.4/firebase.js'></script>\
      <br><button id='btn_"+strDiv+"'  onclick='deleteExpOrInc()' style= 'border: 1px solid black; font-size:x-small; padding: 0.5px 0.5px; margin-left:7px; width:4%; background-color:red;'>DELETE</button>\
      <div>\
      </div>\
      </div>"); 
    }
    document.getElementById("myForm").reset();
} //end changeExpence()

var fisrtToch = 0;
var flag=0;
var showOrUnshow=0; //0-show 1-unshow
function click_show()
{
 var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
 console.log("imonth is: "+imonth);
 firebase.database().ref('/users/' + myId+'/year/'+iyear+'/'+imonth+'/').once('value').then(function(snapshot) {
 var numOfChild=snapshot.exists ();
 console.log("the number of the children is: "+numOfChild);
 if(numOfChild) 
 { 
    clSh();
 }
 else
 {
  alert("there is no data, you can save new data and then show it");
 }
});
} //end click_show()


function clSh(){ //callback click_show()
var total = 0;
if(showOrUnshow==0)
{
  showOrUnshow=1;
  document.getElementById("id_clickShow").innerHTML="Unshow";
  document.getElementById("total_id").style.display = "block";
}
else
{
  showOrUnshow=0;
  document.getElementById("id_clickShow").innerHTML="Show";
  document.getElementById("total_id").style.display = "none";
}
 console.log("get into click_show"+"fisrtToch is: "+fisrtToch);
 var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
 console.log("imonth is: "+imonth);
 firebase.database().ref('/users/' + myId+'/year/'+iyear+'/'+imonth+'/').once('value').then(function(snapshot) { 
 			
 snapshot.forEach(function(childSnapshot) {
  var numOfChild=snapshot.numChildren();
  var childKey = childSnapshot.key;	
  var childData = childSnapshot.val();
  console.log(childKey+": "+childData+'\n');
  var i=0;
  a = childData*1;
  // update total
  if(childKey[0]=='i')
  {
    total=total+a;
  }
  
  if(childKey[0]=='E')
  {
    total=total-a;
  } 
  document.getElementById("total_id").innerHTML = "Total: "+total;
  numOfExpence = parseInt(a);

  while(childKey[i] != '_')
  {
	  i++;
  }
  var realName=childKey.slice(i+1);
  var incomOrExpence="";
  if(childKey[0]=='i')
  {incomeOrExpence='income';}
  else{incomeOrExpence='Expence';}
  if (fisrtToch == 0 || showOrUnshow){		  	  
  flag=1;
  var strDiv = 'logdiv'+childKey;
  console.log(strDiv);
  document.getElementById('output').insertAdjacentHTML('afterend',
				"<div id="+strDiv+">\
                <label style='margin:7px'><b>"+incomeOrExpence+":&#160;"+realName+"&#160;&#160;&#160;&#160;value="+childData+"</b></label> \
				<script> src='https://www.gstatic.com/firebasejs/6.3.4/firebase.js'></script>\
				<br><button id='btn_"+strDiv+"'  onclick='deleteExpOrInc()' style= 'border: 1px solid black; font-size:x-small; padding: 0.5px 0.5px; margin-left:7px; width:4%; background-color:red;' >DELETE</button>\
				<div>\
				</div>\
				</div>"); 
	  
  }
  else
  {
		  var strDiv = "document.getElementById('output').parentNode.removeChild(logdiv"+childKey+");";
		  console.log("strDiv is: "+strDiv);
		  eval(strDiv);
		  flag=0;
	}
});

if(flag==1){fisrtToch=1;}
if(flag==0){fisrtToch=0;}
});
} //end clSh()

function deleteExpOrInc()
{
console.log("OK");
console.log("deleteExpOrInc: "+event.target.id);
var s = event.target.id;
var divId = s.slice(4);
//update total
var div = document.getElementById(divId);
var num = div.innerText;
console.log("num is: "+num);
var i=0;
while(num[i]!='=')
{
  i++;
}
var exp = num.slice(i+1,-6);
console.log("exp is: "+exp);

var a = exp*1;
var tempTotal = document.getElementById("total_id").innerHTML;
var t = tempTotal.slice(7);
console.log("tempTotal="+t);
 total=t*1;
 if(num[0]=='i')
 {
   console.log("inc= "+num[0]);
  total=total-a;
 }
 else{
  console.log("Expence= "+num[0]);
  total=total+a; 
 }
 document.getElementById("total_id").innerHTML = "Total: "+total;
  //end update total
	var strDiv = "document.getElementById('output').parentNode.removeChild("+divId+");";
		  console.log("strDiv is: "+strDiv);
		  eval(strDiv);
  var elmId = s.slice(10);
  console.log("s is: "+s);	  
  var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
	var adaRef = firebase.database().ref('users/'+myId+'/year/'+iyear+'/'+imonth+'/'+elmId);
	adaRef.remove()
	.then(function() {
    console.log("Remove succeeded.")
    firebase.database().ref('/users/' + myId+'/year/'+iyear+'/'+imonth+'/').once('value').then(function(snapshot) {
      var numOfChild=snapshot.exists ();
      console.log("the number of the children is: "+numOfChild);
    if(!numOfChild) { 
      showOrUnshow=0;
      document.getElementById("id_clickShow").innerHTML="Show";
      document.getElementById("total_id").style.display = "none";
    }
    });
	})
	.catch(function(error) {
		console.log("Remove failed: " + error.message)
	});
} // end deleteExpOrInc()

function stop_show()
{
 var output = document.getElementById('output').parentNode;
 console.log("output= "+output);
 var x = $('#output').length;

 console.log("output.childNodes.length= "+x);
if(showOrUnshow)
 {
  stpshow();
 }
} //end stop_show()


function stpshow() //callback stop_show()
{
var total = 0;
showOrUnshow=0;
document.getElementById("id_clickShow").innerHTML="Show";
document.getElementById("total_id").style.display = "none";

var iyear =$('#input_year').val() ;
 var imonth =$('#input_month').val() ;
 console.log("imonth is: "+imonth);
 firebase.database().ref('/users/' + myId+'/year/'+iyear+'/'+imonth+'/').once('value').then(function(snapshot) {   			
  snapshot.forEach(function(childSnapshot) {
     var numOfChild=snapshot.numChildren();
     var childKey = childSnapshot.key;	
     var childData = childSnapshot.val();
     console.log(childKey+": "+childData+'\n');
	  
		 var strDiv = "document.getElementById('output').parentNode.removeChild(logdiv"+childKey+");";
		 console.log("strDiv is: "+strDiv);
		 eval(strDiv);	  
});
});
} //end stpshow()


function IsText(Text){
  var regex = /^([a-zA-Z0-9_.+-])+/;
  return regex.test(Text);
}

function IsNumber(Number){
  var regex = /^([0-9])+/;
  return regex.test(Number);
}

function func_monthly(){
  document.getElementById("row_graph").style.display = "none";
  document.getElementById("drawGraph").style.display = "none"; 
  document.getElementById("idclick_monthly").style.display = "block";
  document.getElementById("output").style.display = "block";
}

function func_graph(){
  stop_show()
  document.getElementById("idclick_monthly").style.display = "none";
  document.getElementById("output").style.display = "none";
  document.getElementById("row_graph").style.display = "block";
  document.getElementById("drawGraph").style.display = "block";
}

$(document).ready(function(){
  func_monthly()
})

var a;
var monthArray = Array.from(Array(12), () => 0); //total array
var monthArrayincome = Array.from(Array(12), () => 0); //incom array
var monthArrayExpanc = Array.from(Array(12), () => 0); //expence array
var numOfExpence;
var fisrtToch = 0;
var flag=0;
var showOrUnshow2=0; //0-show 1-unshow

function click_show_graph(){
  if(showOrUnshow2==0){
    showOrUnshow2=1;
    document.getElementById("drawGraph").style.display = "block";

    var iyear =$('#input_year2').val() ;

    console.log("iyear is: "+iyear);
    firebase.database().ref('/users/' + myId+'/year/'+iyear+'/').once('value').then(function(snapshot) {
    var numOfChild=snapshot.exists ();
    console.log("the number of the children is: "+numOfChild);
    if(numOfChild) { 
      clSh2();
    }
    else
    {
      alert("there is no data, you can save new data and then show it");
    }
    });
  }
else{
  showOrUnshow2=0;
  


}
}

var totalForYear=0;
var iyear;

function clSh2(){

var total = 0;
monthArray = Array.from(Array(12), () => 0);
monthArrayincome = Array.from(Array(12), () => 0);
monthArrayExpanc = Array.from(Array(12), () => 0);
console.log("showOrUnshow= "+showOrUnshow);
if(showOrUnshow==0)
{
  showOrUnshow=1;
 
}
else
{
  showOrUnshow=0;

}
 console.log("get into click_show"+"fisrtToch is: "+fisrtToch);

iyear =$('#input_year2').val() ;

  firebase.database().ref('/users/' + myId+'/year/'+iyear+'/').once('value').then(function(snapshot) {    			
     snapshot.forEach(function(childSnapshot) {
        var numOfChild=snapshot.numChildren();
        var childKey = childSnapshot.key;	
        var monthPlace=childKey*1-1;
        firebase.database().ref('/users/' + myId+'/year/'+iyear+'/'+childKey+'/').once('value').then(function(snapshot) { 
        snapshot.forEach(function(childSnapshot) {
   var numOfChild=snapshot.numChildren();
     var childKey = childSnapshot.key;	
     var childData = childSnapshot.val();
  console.log(childKey+": "+childData+'\n');
  var i=0;
  a = childData*1;
  var a2=a;
  if(childKey[0]=='i'){
    total=total+a;
    monthArrayincome[monthPlace]+=a;
  }
  
  if(childKey[0]=='E'){
    total=total-a;
    a2=-1*a;
    monthArrayExpanc[monthPlace]+=a;

  } 
 console.log("total= "+total);
 totalForYear=total;
 monthArray[monthPlace]+=a2;
 console.log(monthArray);
 console.log(monthArrayincome);
 console.log(monthArrayExpanc);
 drawChart()
});
});
});
});
}

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Month');
  data.addColumn('number', 'Incoms');
  data.addColumn('number', 'Expences');
  data.addColumn('number', 'Total');
//blue - red  - orange
  data.addRows([
    [1, monthArrayincome[0], monthArrayExpanc[0], monthArray[0]],
    [2,  monthArrayincome[1], monthArrayExpanc[1], monthArray[1]],
    [3,  monthArrayincome[2],   monthArrayExpanc[2], monthArray[2]],
    [4,  monthArrayincome[3], monthArrayExpanc[3], monthArray[3]],
    [5,  monthArrayincome[4], monthArrayExpanc[4], monthArray[4]],
    [6,  monthArrayincome[5], monthArrayExpanc[5],  monthArray[5]],
    [7,  monthArrayincome[6], monthArrayExpanc[6],  monthArray[6]],
    [8,  monthArrayincome[7], monthArrayExpanc[7], monthArray[7]],
    [9,  monthArrayincome[8], monthArrayExpanc[8], monthArray[8]],
    [10, monthArrayincome[9], monthArrayExpanc[9], monthArray[9]],
    [11, monthArrayincome[10],  monthArrayExpanc[10],  monthArray[10]],
    [12, monthArrayincome[11],  monthArrayExpanc[11],  monthArray[11]],
  ]);


  var options = {
    chart: {
      title: '  Total for year '+ iyear +': ' + totalForYear,
    },
    width: 900,
    height: 500,
    axes: {
      x: {
        0: {side: 'top'}
      }
    }
  };

  var chart = new google.charts.Line(document.getElementById('line_top_x'));

  chart.draw(data, google.charts.Line.convertOptions(options));
}

function stop_show2()
{
  showOrUnshow2=0;
  document.getElementById("drawGraph").style.display = "none"; 
  
  
} //end stop_show2()


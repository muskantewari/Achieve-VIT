// function forget_password(){
//   var email= document.getElementById('email_forgot_password').value
//   var data = JSON.stringify({"email":email});
//   var xhr = new XMLHttpRequest();
//   xhr.withCredentials = true;

//   xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//       console.log(this.responseText);
//     }
//   });

//   xhr.open("POST", "https://achieve-vit.herokuapp.com/accounts/verifyOTP");
//   xhr.setRequestHeader("Content-Type", "application/json");

//   xhr.send(data);
//}


function forget_password(){
    console.log("Hi");
    var data={
        "email":document.getElementById('email_forgot_password').value
    }
    var xhr = new XMLHttpRequest();
    console.log(data);
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  console.log("Hi2");

  xhr.open("POST", "https://achieve-vit.herokuapp.com/accounts/verifyOTP");
  console.log("Hi3");

  xhr.setRequestHeader("Content-Type", "application/json");

  //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
		xhr.setRequestHeader("Access-Control-Max-Age", "1800");
		//xhr.setRequestHeader("Access-Control-Allow-Headers", "content-type");
    xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    
    xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		// res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
  console.log("Hi4");

  xhr.send(JSON.stringify(data));
  console.log("Hi5");

  xhr.onload = function () {
      console.log("HIii")
      console.log(this.responseText)
      console.log(this.status)
      // debugger;
      if(this.status!=202)
      {
          alert("Re-enter your email")
      }
  }
  console.log("Hi6");

}
//var data = JSON.stringify({"email":"shreyachatterjeeshreyash@gmail.com"});

function new_password(){

  var data={
    "email":document.getElementById('email_forgot_password').value,
    "otp":document.getElementById('otp').value,
    "password":document.getElementById('new-password').value

}

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://achieve-vit.herokuapp.com/accounts/checkOTP");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
xhr.setRequestHeader("Access-Control-Max-Age", "1800");
xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

xhr.send(JSON.stringify(data));

xhr.onload = function () {
  console.log("HIii")
  console.log(this.responseText)
  console.log(this.status)
  // debugger;
  if(this.status==200)
  {
    window.location.replace('homepage_emp.html')
    alert("Your password is changed successfully")

  }
  else{
    window.location.replace('login_employee.html')
    alert("OTP didnt match. Try again!")
  }
}
}


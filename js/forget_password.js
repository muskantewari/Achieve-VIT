function forget_password(){
    console.log("Hi");
    var data={
        "email":document.getElementById('email_forgot_password').value
    }
    var xhr = new XMLHttpRequest();
    console.log(data);
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://achieve-vit.herokuapp.com/accounts/verifyOTP");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(JSON.stringify(data));
xhr.onload = function () {
    console.log("HIii")
    console.log(this.responseText)
    console.log(this.status)
    // debugger;
    if(this.status!=200)
    {
        alert("Re-enter your email")
    }
}
}
//var data = JSON.stringify({"email":"shreyachatterjeeshreyash@gmail.com"});




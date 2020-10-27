function login(){
    console.log('Hii')
    // debugger;
    var data = {
        "empid" : document.getElementById('username').value,
        "password" : document.getElementById('password').value
    }

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/accounts/login/", true);
    xh.setRequestHeader('Content-Type', 'application/json');
    xh.send(JSON.stringify(data));
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xh.onload = function () {
        console.log("HIii")
        console.log(this.responseText)
        console.log(this.status)
        // debugger;
        if(this.status==200)
        {
            var data = JSON.parse(this.responseText)
            localStorage.setItem("Token", "Token " + data.token)
            window.location.replace('homepage_hr.html')
        }
        else{
            alert('Invalid login credentials')
            window.location.replace('login_employee.html')
        }
    }
}
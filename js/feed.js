function initRequests(){

    if (localStorage.hasOwnProperty("Token")){
        var empid = localStorage.getItem('EmpID')
        var acType = localStorage.getItem("ACtype")
        var initNode = `<button class="dropbtn" id="AVIT">${empid} (${acType})
        <i class="fa fa-caret-down"></i>
        </button>`

        $('#dropdown').append(initNode);
        myDetails()
    }
    else{
        alert("You need to login first")
        window.location.replace('index.html')
    }
   
}

function logout(){
    localStorage.removeItem("Token");
    window.location.replace('index.html')
}

function myDetails(){
    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/profile/faculty/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();
    xh.onload = function() {
        if(this.status==200 && (this.responseText).length>2)
        {
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var name = resp[data]["name"]
                var post = resp[data]["post"]


                var node = `<div class="col-7 ml-2 mt-1" style="color: white;">
                <span style="font-weight: bolder;">${name}</span><br>
                ${post}<br>
                Vellore Institute of Technology
                </div>`
                
                $('#myDetails').append(node);
            }

        }
    }
}
function initRequests(){  

    if (localStorage.hasOwnProperty("Token")){

        $('#searchTable').hide()
        var empid = localStorage.getItem('EmpID')
        var acType = localStorage.getItem("ACtype")
        var initNode = `<button class="dropbtn" id="AVIT">${empid} (${acType})
        <i class="fa fa-caret-down"></i>
        </button>`

        $('#dropdown').append(initNode);
        seeDetails()
        myFeed()
    }
    else{
        alert("You need to login first")
        window.location.replace('index.html')
    }
   
}

function seeDetails(){
    var ac = localStorage.getItem("ACtype")
    if (ac=='Faculty')
        myFacDetails()

    else
        myHRDetails()
}

function logout(){
    localStorage.removeItem("Token");
    window.location.replace('index.html')
}

function myHRDetails(){

    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/profile/hr/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();
    xh.onload = function() {
        console.log(this.responseText)
        if(this.status==200 && (this.responseText).length>2)
        {
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var name = resp[data]["name"]
                var post = resp[data]["post"]
                var email = resp[data]["email"]

                var node = `<div class="col-7 ml-2 mt-1" style="color: white;">
                <span style="font-weight: bolder;">${name}</span><br>
                ${post}<br>
                ${email}<br>
                Vellore Institute of Technology
                </div>`
                
                $('#myDetails').append(node);
            }

        }
    }
}

function myFacDetails(){
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

function myFeed(){
    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/feed/view/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        if (this.status == 200){
            var feed = JSON.parse(this.responseText)
            for (let data in feed.feed)
            {
                var post = feed.feed[data]
                var uuid = post["uuid"]
                var name = post["Name"]
                var title = post["Title"]
                var likes = post["Likes"]
                var empID = post["empID"]
                var content = ""
                if (title == " added a Skill")
                {
                    content = post["Skill"]
                }

                else if (title == " updated their Education.")
                {
                    content = "Completed " + post["Degree"] + " from " + post["University"]
                    content += "<br>" + post["From"] + " to " + post["To"]

                }

                else if (title == " updated their Work Experience"){
                    content = "Worked as " + post["Position"] + " at " + post["Company"] + " as "
                    content += post["Work description"] + " for " + post["period"]
                }

                else if (title == " added an Achievement"){
                    content = post["Details"]
                }


                var node = `<div class="container mt-5">
                                <div class="row">
                                    <div class="col-1">
                                        <img src="img/Ellipse 5.png" width="40px">
                                    </div>
                                    <div class="col-11 mt-2">
                                        <span style="font-size: larger;"><span style="font-weight: bolder; cursor:pointer" id = ${empID} onclick = "viewProfile(this.id)">${name}</span></span><i> &nbsp; &nbsp; ${title}</i>
                                    </div>
                                </div>
                                <div class="row announce mt-3">
                                    ${content}
                                    <button class="ml-auto mt-1 like" id = "${uuid}" onClick = "addLike(this.id)">
                                        LIKE <span style="font-weight: bolder;">${likes}</span>
                                    </button>
                                </div>
                            </div>`

                $('#feed').append(node);
            }
        }

        else{
            console.log("Error loading Feed")
        }
        
    }
}

function viewProfile(id){
    var empid = localStorage.getItem("EmpID")
    if (id == empid)
    
        window.location.replace('myprofile.html')
    else{
        window.location.replace('view_employee.html')
        localStorage.setItem('viewEmp', id)
    }
        
}

function addLike(uuid){

    var data = {
        "uuid" : uuid
    }

    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/feed/like", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data));

    xh.onload = function(){
        if (this.status == 202){
            var btn = document.getElementById(uuid);
            var btnChild = btn.childNodes;
            var btnVal = (btnChild[1].innerHTML)
            btnVal = parseInt(btnVal) + 1
            btnChild[1].innerHTML = btnVal;
        }
    }
}




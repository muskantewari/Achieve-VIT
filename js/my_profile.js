function allGETRequests(){

    if (localStorage.hasOwnProperty("Token")){
        myDetails()
        getEducation()
        getAchievements()
    }
    else{
        alert("You need to login first")
        window.location.replace('index.html')
    }
   
}

function getAchievements(){
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/portfolio/achievements/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        if(this.status==200 && (this.responseText).length>5)
        {
            var empid = localStorage.getItem('EmpID')
            var acType = localStorage.getItem("ACtype")
            var initNode = `<button class="dropbtn" id="AVIT">${empid} (${acType})
            <i class="fa fa-caret-down"></i>
            </button>`

            $('#dropdown').append(initNode);
            
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var uuid = resp[data]["uuid"]
                var details = resp[data]["details"]

                var node = `<div class="row mt-3" id = "${uuid}">

                        <div class = "col-md-6 ml-5">${details}</div>

                        <div class="col-md-4"><input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row">hello</div>
                    </div>`

                $('#achievement').append(node);
            }

        }
        
    }
}

function getEducation(){
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/portfolio/education/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        if(this.status==200 && (this.responseText).length>5)
        {
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var uuid = resp[data]["uuid"]
                var uni = resp[data]["university"]
                var degree = resp[data]["degree"]
                var start = resp[data]["start_year"]
                var end = resp[data]["end_year"]

                var node = `<div class="row mt-3" id = "${uuid}">
                <div class="col-md-8">
                    &nbsp;${uni}<br>
                    &nbsp;${degree}<br>
                    &nbsp;${start} to ${end}
                </div>
                <div class="col-md-4">
                    <input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row">
                </div>
                </div>`
                console.log(node)
                $('#education').append(node);
            }

        }
        
    }

}

function getExperience(){
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/portfolio/experience/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();
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

                var node = `<div class="mt-2 mb-1">
                <span style="font-weight: bolder;">${name}</span><br>
                ${post}<br> 
                Vellore Institute Of Technology
            </div>`
                
                $('#personal').append(node);
            }

        }


    }
}

function addAchievements()
{
    var data = {
        "details" : document.getElementById("details").value
    }
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/portfolio/achievements/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data));

    xh.onload=function(){
        console.log(this.responseText)
        if(this.status==201)
        {

            var node = `<div class="row mt-3" id = "${JSON.parse(this.responseText).uuid}">
                            <div class = "col-md-6 ml-5">&nbsp; ${JSON.parse(this.responseText).details}</div>

                            <div class="col-md-4"><input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row">hello</div>
                        </div>`

            $('#achievement').append(node);

            $("#add-achievement").modal("hide");

        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
        else{
            alert("Could not save")
        }
    }
}

function logout(){
    localStorage.removeItem("Token");
    window.location.replace('index.html')
}



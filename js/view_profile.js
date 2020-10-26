function allRequests(){

    if (localStorage.hasOwnProperty("Token")){

        var empid = localStorage.getItem('EmpID')
        var acType = localStorage.getItem("ACtype")
        var initNode = `<button class="dropbtn" id="AVIT">${empid} (${acType})
        <i class="fa fa-caret-down"></i>
        </button>`

        $('#dropdown').append(initNode);
        viewDetails()
        // getEducation()
        getAchievements()
        getExperience()
        // getSkill()
    }
    else{
        alert("You need to login first")
        window.location.replace('index.html')
    }
}

function viewDetails()
{
    var viewEmp = localStorage.getItem('viewEmp')
    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", `https://achieve-vit.herokuapp.com/profile/view/${viewEmp}/`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        if(this.status==200 && (this.responseText).length>2)
        {
            resp = JSON.parse(this.responseText)
            var name = resp["name"]
            var post = resp["post"]
            var email = resp["email"]
            var empid = resp["empid"]
            var school = resp["school"]

            var node = `<div class="mt-2 mb-1">
            <span style="font-weight: bolder;">${name}</span><br>
            ${email}<br>
            ${post}<br>                
            ${school}<br>
            Employee ID : ${empid}<br>
            Vellore Institute of Technology
            </div>`
            
            $('#personal').append(node);

        }
    }
}

function getAchievements(){
    var jwt = localStorage.getItem('Token')
    var viewEmp = localStorage.getItem('viewEmp')

    var xh = new XMLHttpRequest();
    xh.open("GET", `https://achieve-vit.herokuapp.com/portfolio/viewAchievements?empid=${viewEmp}`, true)
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
                var details = resp[data]["details"]

                var node = `<div class="row mt-3" id = "${uuid}">

                        <div class = "col-md-6 ml-5">${details}</div>
                    </div>`

                $('#achievement').append(node);
            }

        }
        
    }
}

function getEducation(){
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("GET", `https://achieve-vit.herokuapp.com/portfolio/viewEducation?empid=`, true)
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
                $('#education').append(node);
            }

        }
        
    }

}

function getExperience(){
    var jwt = localStorage.getItem('Token')
    var viewEmp = localStorage.getItem('viewEmp')

    var xh = new XMLHttpRequest();
    xh.open("GET", `https://achieve-vit.herokuapp.com/portfolio/viewExperience?empid=${viewEmp}`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        if(this.status==200 && (this.responseText).length>5){
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var uuid = resp[data]["uuid"]
                var position = resp[data]["position"]
                var comp_name = resp[data]["comp_name"]
                var description = resp[data]["description"]
                var period = resp[data]["period"]

                var node = `<div class="row mt-3" id = "${uuid}">
                                <div class="col-md-8">
                                    &nbsp;<b>${position}</b><br>
                                    &nbsp;${comp_name}<br>
                                    &nbsp;${description}<br>
                                    &nbsp;${period}
                                </div>
                            </div>`

                $('#experience').append(node);
            }

        }
    }
}

function getSkill()
{
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("GET", "https://achieve-vit.herokuapp.com/portfolio/skill/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        console.log(this.responseText);
        if(this.status==200 && (this.responseText).length>5){
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp){
                var uuid = resp[data]["uuid"]
                var skill = resp[data]["skill"]
                var node = `<div class="skill col-12 col-md-3 ml-4" ${uuid}>
                    ${skill}
                </div>`

                $('#skill').append(node);
            }
        }

    }
}





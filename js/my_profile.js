function allGETRequests(){

    if (localStorage.hasOwnProperty("Token")){
        $('#searchTable').hide()

        var empid = localStorage.getItem('EmpID')
        var acType = localStorage.getItem("ACtype")
        var initNode = `<button class="dropbtn" id="AVIT">${empid} (${acType})
        <i class="fa fa-caret-down"></i>
        </button>`

        $('#dropdown').append(initNode);
        myDetails()
        getEducation()
        getAchievements()
        getExperience()
        getSkill()
    }
    else{
        window.location.replace('index.html')
        alert("You need to login first")
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
            
            var resp = eval('(' + this.responseText + ')');

            for (let data in resp)
            {
                var uuid = resp[data]["uuid"]
                var details = resp[data]["details"]

                var node = `<div class="row mt-3" id = "${uuid}">

                        <div class = "col-md-6 ml-5">${details}</div>

                        <div class="col-md-4">
                            <input type="image" style="float: right; width: 50px; height: 50px;"
                            src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row" onClick = "storeID(this.parentNode.parentNode.id, 'Achievements')">
                        </div>
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
                    <input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row" onClick = "storeID(this.parentNode.parentNode.id, 'Education')">
                </div>
                </div>`
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
                                    &nbsp;${position}<br>
                                    &nbsp;${comp_name}<br>
                                    &nbsp;${description}<br>
                                    &nbsp;${period}
                                </div>
                                <div class="col-md-4">
                                    <input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row" data-toggle="modal" data-target="#delete-row" onClick = "storeID(this.parentNode.parentNode.id, 'Experience')">
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
                var email = resp[data]["email"]
                var empid = resp[data]["empid"]
                var school = resp[data]["school"]

                var node = `<div class="mt-2 mb-1">
                <span style="font-weight: bolder;">${name}</span><br>
                ${school}<br>
                ${email}<br>
                ${post}<br> 
                Employee ID : ${empid}<br>
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
        if(this.status==201)
        {

            var node = `<div class="row mt-3" id = "${JSON.parse(this.responseText).uuid}">
                            <div class = "col-md-6 ml-5">&nbsp; ${JSON.parse(this.responseText).details}</div>
                            <div class="col-md-4"><input type="image" style="float: right; width: 50px; 
                            height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" 
                            data-target="#delete-row" 
                            onClick = "storeID(this.parentNode.parentNode.id, 'Achievements')">
                            </div>
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

function addExperience(){
    var data = {
            "position" : document.getElementById('position').value,
            "comp_name" : document.getElementById('comp_name').value ,
            "description" : document.getElementById('description').value,
            "period" : document.getElementById('period').value,
    }
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/portfolio/experience/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data));   

    xh.onload=function(){
        if(this.status==201)
        {
            var node = `<div class="row mt-3" id = "${JSON.parse(this.responseText).uuid}">
            <div class="col-md-8">
                &nbsp;${JSON.parse(this.responseText).position}<br>
                &nbsp;${JSON.parse(this.responseText).comp_name}<br>
                &nbsp;${JSON.parse(this.responseText).description}<br>
                &nbsp;${JSON.parse(this.responseText).period}
            </div>
            <div class="col-md-4">
                <input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row">
            </div>
        </div>`

        $('#experience').append(node);

        $("#add-experience").modal("hide");
        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
        else{
            alert("Could not save")
        }
    }
}

function addEducation(){
    
    var data = {
        "university" : document.getElementById('university').value,
        "degree" : document.getElementById('degree').value,
        "start_year" : document.getElementById('start_year').value,
        "end_year" : document.getElementById('end_year').value
    }

    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/portfolio/education/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data)); 

    xh.onload=function(){
        if(this.status==201)
        {
            var node = `<div class="row mt-3" id = "${JSON.parse(this.responseText).uuid}">
                <div class="col-md-8">
                    &nbsp;${JSON.parse(this.responseText).university}<br>
                    &nbsp;${JSON.parse(this.responseText).degree}<br>
                    &nbsp;${JSON.parse(this.responseText).start_year} to ${JSON.parse(this.responseText).end_year}
                </div>
                <div class="col-md-4">
                    <input type="image" style="float: right; width: 50px; height: 50px;" src="img/icons8-delete-bin-64.png" data-toggle="modal" data-target="#delete-row">
                </div>
                </div>`

            $('#education').append(node);

            $("#add-education").modal("hide");
        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
        else{
            alert("Could not save")
        }
    }
}

function addSkill()
{
    var data={
        "skill" : document.getElementById('my_skill').value
    }

    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/portfolio/skill/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data));

    xh.onload=function(){
        if (this.status == 201)
        {
            var node = `<div class="skill col-12 col-md-3 ml-4" ${JSON.parse(this.responseText).uuid}>
                    ${JSON.parse(this.responseText).skill}
                </div>`

            $('#skill').append(node);
            $('#add-skill').modal('hide');
        }

        else{
            alert('Error in adding skill')
        }

    }
}
function logout(){
    localStorage.removeItem("Token");
    window.location.replace('index.html')
}

function storeID(id, type){
    localStorage.setItem("deleteID", id);
    localStorage.setItem("type", type)
}

function Delete(){
    var type = localStorage.getItem('type');
    var id = localStorage.getItem('deleteID');

    if (type == 'Achievements')
        deleteAchievements(id)
    else if(type=='Education')
        deleteEducation(id)
    else if(type=='Experience')
        deleteExperience(id)
}

function deleteAchievements(id){
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("DELETE", `https://achieve-vit.herokuapp.com/portfolio/achievements/${id}/`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(); 

    xh.onload = function(){
        if (this.status == 204){
            $('#delete-row').modal('hide');
            var uuid = '#' + id;
            $(uuid).hide();
            localStorage.removeItem("deleteID");
            localStorage.removeItem("type");
        }

        else{
            alert('Unable to delete, try again!')
        }
    }
}

function hideModal(id){
    var uuid = '#' + id;
    $(uuid).modal('hide');
}

function deleteEducation(id)
{
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("DELETE", `https://achieve-vit.herokuapp.com/portfolio/education/${id}/`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(); 

    xh.onload = function(){
        if (this.status == 204){
            $('#delete-row').modal('hide');
            var uuid = '#' + id;
            $(uuid).hide();
            localStorage.removeItem("deleteID");
            localStorage.removeItem("type");
        }

        else{
            alert('Unable to delete, try again!')
        }
    }
}

function deleteExperience(id)
{
    var jwt = localStorage.getItem('Token')

    var xh = new XMLHttpRequest();
    xh.open("DELETE", `https://achieve-vit.herokuapp.com/portfolio/experience/${id}/`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(); 

    xh.onload = function(){
        if (this.status == 204){
            $('#delete-row').modal('hide');
            var uuid = '#' + id;
            $(uuid).hide();
            localStorage.removeItem("deleteID");
            localStorage.removeItem("type");
        }

        else{
            alert('Unable to delete, try again!')
        }
    }  
}
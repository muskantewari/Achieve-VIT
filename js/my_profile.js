function addAchievements()
{
    var data = {
        "details" : document.getElementById("details").value
    }
    var jwt = localStorage.getItem('Token')

    console.log(jwt)
    var xh = new XMLHttpRequest();
    xh.open("POST", "https://achieve-vit.herokuapp.com/portfolio/achievements/", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send(JSON.stringify(data));

    xh.onload=function(){
        console.log(this.responseText)
        if(this.status==201)
        {
            var node = document.createElement('div')
            // node.setAttribute("class", "col-md-6 ml-5")
            node.innerHTML = "&nbsp" + JSON.parse(this.responseText).details;
            divReqd = document.getElementById("achievement").appendChild(node);
            $("#add-achievement").modal("hide");
            // document.getElementById("add-achievement").style.visibility = "hidden";
        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
        else{
            alert("Could not save")
        }
    }
}
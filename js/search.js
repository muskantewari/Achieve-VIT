function search(){

    var name = document.getElementById('searchFac').value;
    
    var jwt = localStorage.getItem('Token')
    var xh = new XMLHttpRequest();
    xh.open("GET", `https://achieve-vit.herokuapp.com/feed/search?name=${name}`, true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt);
    xh.send();

    xh.onload = function(){
        
        var list = document.getElementById('searchResults')
        while (list.hasChildNodes()) {  
            list.removeChild(list.firstChild);
          }

        if(this.status==200 && (this.responseText).length>5)
        {
            var resp = eval('(' + this.responseText + ')');
            var count = 1
            for (let data in resp)
            {
                var name = resp[data]['name']
                var empid = resp[data]['empid']
                var school = resp[data]['school']
                
                $('#searchTable').show()

                var node = `<tr id = "${empid}" style="cursor: pointer;" onClick = "viewProfile(this.id)">
                                <th scope="row">${count}</th>
                                <td>${name}</td>
                                <td>${school}</td>
                                <td>${empid}</td>
                            </tr>`

                count+=1;
                
                $('#searchResults').append(node);
            }            
        }

        else
        {
            $('#searchTable').hide()
            alert('No results found!')
        }
    }
}

function viewProfile(id){
    window.location.replace('view_employee.html')
    localStorage.setItem('viewEmp', id)
}

const myform = document.querySelector('#form-input');
// const task = document.querySelector('#task');
const msg = document.querySelector('.msg');
const tasklist= document.querySelector('#items');
const filter= document.querySelector("#task-search");


myform.addEventListener('submit', addevent);
// filter.addEventListener('keyup', filteritems);
tasklist.addEventListener('click', complete);


function getCookie(name){
    var cookieValue = null;
    if(document.cookie && document.cookie !==''){
        var cookies = document.cookie.split(';');
        for(var i=0; i<cookies.length; i++){
            var cookie =cookies[i].trim();

            if(cookie.substring(0,name.length +1) === (name +'=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken')


function addevent(d){
    const task = document.querySelector('#task');
    d.preventDefault();

    
    if(activeitem != null){
        var urlz = `http://127.0.0.1:8000/api/task-update/${activeitem.id}/`
    }else{urlz = `http://127.0.0.1:8000/api/task-create`}
    axios({
        method:'post',
        url: urlz,
        headers:{
            'content-type':'application/json',
            'X-CSRFToken': csrftoken},
        data: {"title":task.value}
    })
    .then(res => showlist())
    .catch(err => console.log(err))
    
    task.value = ""
}

var activeitem = null

showlist()
function showlist(){
    axios({
    method:'get',
    url: `http://127.0.0.1:8000/api/task-list`, 
    })
    .then(res =>showitem(res))
    .catch(err => console.log(err));



    function showitem(res){
        let tasks = res.data
        output = ""
        
        for(i=0; i<tasks.length ; i++){
            
            
            if(tasks[i].complete== true){
                console.log("yes")
                const title = `<li class="item completed">${tasks[i].title}
                <button type="submit" class="btn btn-secondary" id="delete">X</button>
                <button type="submit" class=" btn btn-sm hide" id="edit">Edit</button>
                <button type="submit" class=" btn btn-sb" id="complete">Completed</button>
                </li>`
                output += title
            }
            else{
                const title = `<li class="item">${tasks[i].title}
                <button type="submit" class="btn btn-secondary" id="delete">X</button>
                <button type="submit" class=" btn btn-sm" id="edit">Edit</button>
                <button type="submit" class=" btn btn-sb" id="complete">Completed</button>
                </li>`
                output += title
            }
               tasklist.innerHTML = output
            }
            
            for(i=0; i<tasks.length ; i++){
                const editbutton = document.querySelectorAll("#edit")[i]
                editbutton.addEventListener('click', (function(item){
                    return function(){
                        edititem(item)}
                    })(tasks[i]))
            }
                
            for(i=0; i<tasks.length ; i++){
                const deletebutton = document.querySelectorAll("#delete")[i]
                deletebutton.addEventListener('click', (function(item){
                    return function(){
                        deleteitem(item)}
                })(tasks[i]))
            }

            for(i=0; i<tasks.length ; i++){
                const completebutton = document.querySelectorAll("#complete")[i]
                completebutton.addEventListener('click', (function(item){
                    return function(){
                        complete(item)}
                })(tasks[i]))
            }

        }
    }

    function edititem(item){
        activeitem = item
        const task = document.querySelector('#task').value = item.title
    }
    
    
    function deleteitem(item){
        
        axios({
            method:'delete',
            url: `http://127.0.0.1:8000/api/task-delete/${item.id}/`, 
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': csrftoken},
            })
            .then(res =>showlist())
            console.log("clicked",item.id)
        
    }


    function complete(item){
        axios({
            method:'post',
            url: `http://127.0.0.1:8000/api/task-update/${item.id}/`, 
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': csrftoken},
            data: {"title":item.title, "complete":true}

            })
            .then(res =>showlist())
            console.log("clicked",item.complete)
        
    }

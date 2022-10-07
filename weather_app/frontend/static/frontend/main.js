const myform = document.querySelector('#form-input');
const tasklist = document.querySelector('.weather_app');

myform.addEventListener('submit', addevent);

function addevent(d){
    d.preventDefault()

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
    var csfroken = getCookie('csrftoken')
        
                
    const task = document.querySelector('#city');
    axios({
        method:'post',
        url: `http://127.0.0.1:8000/api/task-create`, 
        headers:{
            'content-type':'application/json',
            'X-CSRFToken': csfroken},
        data: {"city":task.value}
    })
    .then(res => showcities())
    .catch(err => console.log(err))
    task.value = ""
}
        
showcities()
function showcities(){
    axios({
    method:'get',
    url: `http://127.0.0.1:8000/api/task-list`, 
    })
    .then(res =>showitem(res))
    .catch(err => console.log(err));
    

    function showitem(res){
    // let cities = JSON.stringify(res.data)
    let cities = res.data

        for(i=0; i<cities.length ; i++){
        axios({
            method:'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cities[i].city}&units=metric&appid=6ef7648b487b22a1a83952b58d64fdd1`
            })
            .then(response => displayitem(response))

            
            function displayitem(response){
                let user = response.data
                output = ""
                output += `<div class="container2">
                        <div class="content">
                            <h1>${user.name}</h1>
                            <p>${user["main"]["temp"]} °F </p>
                            <p>${user["main"]["pressure"]} mmHg</p>
                            <p>${user["main"]["humidity"]} %</p>
                            <p>${user["weather"][0]["description"]} sky</p>
                        </div>
                        <div class="icon">
                            <img src="http://openweathermap.org/img/w/${user["weather"][0]["icon"]}.png " alt="">
                        </div>
                    </div>`
                
                    const li= document.createElement('div')
                    li.innerHTML = output
                    tasklist.appendChild(li)
            }
        }
    }
}
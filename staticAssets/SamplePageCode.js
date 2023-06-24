let ID = sessionStorage.getItem("ID");
let Auth = sessionStorage.getItem("Auth");

if (ID !=null && Auth !=null){
    window.location.href='/main';
}

function open_tab(evt, id){
    var tab_button, tab;

    tab = document.getElementsByClassName("tab");
    for (let index = 0; index < tab.length; index++) {
        tab[index].style.display = "none";
    }

    tab_button = document.getElementsByClassName("tab_button");
    for (let index = 0; index < tab.length; index++) {
        tab_button[index].className = tab_button[index].className.replace(" active", "")
    }

    document.getElementById(id).style.display="block";
    evt.currentTarget.className += " active";
}

function login(){
    var data = {
        "name":"",
        "password":""
    }

    data.name = document.getElementById('login-name').value;
    data.password = document.getElementById('login-password').value;

    let req = new XMLHttpRequest();
    req.onload = function () {
        let jsonRes=JSON.parse(this.response);
        if(jsonRes.result == false){
            document.getElementById("user_not_found").style.display="block";
        }
        if(jsonRes.result == true){
            sessionStorage.setItem("ID",jsonRes.ID);
            sessionStorage.setItem("Auth",jsonRes.Auth);
            window.location.href='/main';
        }
    }
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(data));
}

function newWebPost(input){
    let req = new XMLHttpRequest();
    items = {
        "Content":input,
        "ID":ID,
        "Auth":Auth
    };
    req.onload = ()=>{
        if (this.response==='false') {
            console.log('failed to post');
        }else{
            if (this.response==='true'){
                console.log('sucessful post');
            }
        }
    }
    req.open('POST','/newPost');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(items));
}

function webPost(){
    let req = new XMLHttpRequest();
    req.onload = ()=>{
        let feed = document.getElementById('feed');
        console.log(this.response);
    }
    req.open('POST','/newPost');
    req.setRequestHeader('Content-Type','application/json');
    req.send(input);
}
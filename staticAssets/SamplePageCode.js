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
    console.log("starting login");

    var data = {
        "name":"",
        "password":""
    }

    data.name = document.getElementById('login-name').value;
    data.password = document.getElementById('login-password').value;

    let req = new XMLHttpRequest();
    req.onload = function () {
        let jsonRes=JSON.parse(this.response);
        console.log("response = \n"+jsonRes);
        if(jsonRes.result == false){
            document.getElementById("user_not_found").style.display="block";
        }
        if(jsonRes.result == true){
            window.location.href='/main';
        }
    }
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(data));
}

function newWebPost(input){
    let req = new XMLHttpRequest();
    req.onload = ()=>{
        
    }
    req.open('POST','/newPost');
    req.setRequestHeader('Content-Type','text/plain');
    req.send(input);
}

function webPost(){

}
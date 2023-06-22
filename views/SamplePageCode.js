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
        console.log("response = \n"+this.response);
        if(this.responseText==="false"){
            document.getElementById("user_not_found").style.display="block";
        }
    }
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(data));
}
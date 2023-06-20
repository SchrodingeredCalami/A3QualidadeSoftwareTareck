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
        "name/email":"",
        "password":""
    }

    data["name/email"] = document.getElementById('login-name/email').value;
    data.password = document.getElementById('login-password').value;

    let req = new XMLHttpRequest();
    req.onload = function () {
        var res = JSON.parse(this.response);
        console.log("response = \n"+res.value);
        if(!res.value){
            document.getElementById("user_not_found").style.property=block;
        }
    }
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(data));
}
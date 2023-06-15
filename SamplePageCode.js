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
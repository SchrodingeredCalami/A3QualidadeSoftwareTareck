function login(){
    function cycle(username,password){
        document.getElementById('login-name').value=username; // set username auth
        document.getElementById('login-password').value=password; // set password auth
        document.getElementById('login-button').click(); // click login button
        console.log("auth working");
        try {
            document.getElementById('').click(); // logout
            console.log("logout working");
        } catch (error) {
            console.log("error:\n"+error);
        }
    }
    /*
    //not found
    cycle('','');

    //auth1
    cycle('','');
    */
}

function likes(){

}

function lowKarma(){
    
}

function tests(){

}

tests()
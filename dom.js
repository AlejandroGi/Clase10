

/*----------------------------FORMS-----------------------------*/
var btnSub = document.getElementById('btnSub');
btnSub.addEventListener('click',openForm);

var allForm= document.getElementById('form');

function openForm(){

    allForm.style.display="flex";
}


var btnClose = document.getElementById('btnClose');
btnClose.addEventListener('click',closeForm);

function closeForm(){
    allForm.style.display="none";
    
    var allMsgError;
    var allInputs;

    allMsgError=document.getElementsByClassName('error');

    for (x = 0; x < allMsgError.length; x++) {
        allMsgError[x].innerText = '';
    }

    allInputs=document.querySelectorAll('form input');

    for (x = 0; x < allInputs.length; x++) {
        allInputs[x].value = '';
    }

}

var btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click',apiValidate);
//https://www.youtube.com/watch?v=TTf0mMl0Sc4
//https://jsonplaceholder.typicode.com/guide

function apiValidate(){
    var inputsForm= document.getElementById('inputsForm');
    var prePayLoad = new FormData(inputsForm) //array de array.
    var payLoad = new URLSearchParams(prePayLoad); //"parametros" de link de busqueda.

    console.log([...prePayLoad])
    console.log([...payLoad])

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "GET",
        //body:payLoad,
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));

}


/*----------------------------COLORS-----------------------------*/

var form = document.querySelector('body');
form.addEventListener('mousemove', changeColorByMove);

function changeColorByMove(e){
    var titleColor = document.getElementById('title');
    titleColor.style.color = "rgb("+e.offsetX+","+ e.offsetY+",40)";
}

/*----------------------------CLEAR INPUT-----------------------------*/

function clearWarningInput(){
    this.nextElementSibling.innerText = "";
}


/*----------------------------NAME SURNAME-----------------------------*/

var nameSurname = document.getElementById('nameSurname');
nameSurname.addEventListener('keyup',namePlus);
nameSurname.addEventListener('blur',validateNameSurname);
nameSurname.addEventListener('focus',clearWarningInput);

/*-----------------CHANGE HELLO-----------------*/
function namePlus(){
    var subTitle = document.getElementById('subTitle');
    subTitle.innerText = 'Hola, ' + nameSurname.value;
}

/*-----------------VALIDATE NAME SURNAME-----------------*/
function validateNameSurname(){
var acum=0;
var acumEspacios=0;    
var errorMsg = "";


    for (x=0; x <= nameSurname.value.length; x++){
        if(nameSurname.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){ 
            /*!! Si pongo igual a 0 y no mayor o igual tira error*/
            /*Al consultar siempre el indice 0 (por separarlos en chart) tiene que ser igual a 0*/
            acum++;
        }
        if(nameSurname.value.charAt(x).search(/[ ]/) >= 0){
            acumEspacios++;
        }
    }
    if ((acum+acumEspacios) != nameSurname.value.length){
        errorMsg= errorMsg+ "El Nombre y Apellido no puede contener numeros o caracteres especiales.\n";
        
    }else {
        if(nameSurname.value.length < 6){
            errorMsg= errorMsg+ "El Nombre y Apellido tiene menos de 6 caracteres alfabeticos.\n";
        }
        
        if (acumEspacios != 1){
            if (acumEspacios < 1){
                errorMsg= errorMsg+ "El Nombre y Apellido no cuenta con un espacio intermedio.\n";
            }
            if (acumEspacios > 1){
                errorMsg= errorMsg+ "El Nombre y Apellido cuenta con mas de un espacio intermedio.\n";
            }
        }
    }
    
    document.getElementById('error-nameSurname').innerText = errorMsg;
    //innerText no respeta los salto de linea?
}



/*----------------------------VALIDATE EMAIL-----------------------------*/

var email = document.getElementById('email');
email.addEventListener('blur',validateEmail);
email.addEventListener('focus',clearWarningInput);

function validateEmail(){

    var errorMsg="";

    if(email.value.search(/[@]/) < 0) { 
        errorMsg = errorMsg + " El formato de email debe contener'@'.\n";
    } 
    if(email.value.search(/[.]/) < 0) { 
        errorMsg = errorMsg + " El formato de email debe contener'.'.\n";
    } 
    document.getElementById('error-email').innerText = errorMsg;
}


/*----------------------------VALDIATE PASSWORD-----------------------------*/

var password = document.getElementById('password');
password.addEventListener('blur', validatePassword);
password.addEventListener('focus',clearWarningInput);

function validatePassword(){

    var errorMsg = "";

    if(password.value.length < 8) { 
        errorMsg = errorMsg + "La contraseña debe ser de 8 o mas caracteres alfanumericos.\n";
        document.getElementById('error-password').innerText = errorMsg;
        return;
    } 

    if(password.value.search(/[a-z]/) < 0) { 
        errorMsg = errorMsg + " La contraseña debe contener por letras MINUSCULAS.\n";
    }
    if(password.value.search(/[A-Z]/) < 0) { 
        errorMsg = errorMsg + " La contraseña debe contener letras MAYSUCULAS.\n";
    }
    if(password.value.search(/[0-9]/) < 0) { 
        errorMsg = errorMsg+ " La contraseña debe contener NUMEROS.\n";
    } 
    document.getElementById('error-password').innerText = errorMsg;
}


/*----------------------------VALDIATE AGE-----------------------------*/

var age = document.getElementById('age');
age.addEventListener('blur', validateAge);
age.addEventListener('focus',clearWarningInput);

function validateAge(){

    var errorMsg="";

    if(!Number.isInteger(Number(age.value))){
        errorMsg="La edad debe ser numerica y no tener decimales.\n";
    }else {
        if (age.value < 18){
            errorMsg = "La edad debe ser mayor o igual a 18.\n";
        }
    }
    document.getElementById('error-age').innerText = errorMsg;
}


/*----------------------------VALDIATE CELLPHONENUMBER-----------------------------*/

var cellPhoneNumber = document.getElementById('cellPhoneNumber');
cellPhoneNumber.addEventListener('blur',validatecellPhoneNumber);
cellPhoneNumber.addEventListener('focus',clearWarningInput);

function validatecellPhoneNumber(){

    var errorMsg = "";
    
    if(!Number.isInteger(Number(cellPhoneNumber.value))){
        errorMsg="El telefono debe ser numerico.\n";
        return;
    }else{
        if (cellPhoneNumber.value.length < 7){
        errorMsg= errorMsg+ "El numero de telefono debe tener al menos 7 digitos.\n";
        }
    }

    document.getElementById('error-cellPhoneNumber').innerText = errorMsg;
    /*Por si algun dia necesito filtrar otras cosas  \!\@\#\$\%\^\&\*\)\(+\=\._-    ||    /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/  */
    /*  if (cellPhoneNumber.value.search(/[\s\s()-_]/) >= 0){
            errorMsg= errorMsg+ "El numero de telefono no puede contener espacios, guiones y/o parentesis. ";
        }*/
}


/*----------------------------VALIDATE ADDRESS-----------------------------*/

var address = document.getElementById('address');
address.addEventListener('blur',validateAddress);
address.addEventListener('focus',clearWarningInput);

function validateAddress(){
    var acumChar=0;
    var acumNum =0;
    var acumEsp = 0;
    /* Porque no me deja var acumChar, acumNum, acumESP = 0; ? */
    var errorMsg = "";

    if (address.value.length < 5){
        errorMsg= errorMsg+ "La direccion debe tener al menos 5 caracteres.\n";
    }

    for (x=0; x <= address.value.length; x++){
        if(address.value.charAt(x).toLowerCase().search(/[a-z]/) >= 0){
            acumChar++;
            console.log(acumChar)
        }
        if(address.value.charAt(x).search(/[0-9]/) >= 0){
            acumNum++;
        }
        if(address.value.charAt(x).search(' ') >= 0){
            acumEsp++;
        }
    }
    

    if (acumChar === 0){
        errorMsg= errorMsg+ "La direccion debe contar con letras.\n";
    }
    if (acumNum === 0){
        errorMsg= errorMsg+ "La direccion debe contar con numeros.\n";
    }
    if (acumEsp != 1){
        errorMsg= errorMsg+ "La direccion debe contar con un espacio.\n";
    }

    if ((acumChar+acumNum+acumEsp) != address.value.length){
        errorMsg= errorMsg+ "La direccion no puede contener caracteres especiales.\n";
    }
    document.getElementById('error-address').innerText = errorMsg;

}


/*----------------------------VALIDATE CITY-----------------------------*/

var city = document.getElementById('city');
city.addEventListener('blur',validateCity);
city.addEventListener('focus',clearWarningInput);



function validateCity(){
    var errorMsg = "";
    if (city.value.length < 3){
        errorMsg= "La ciudad debe contar con 3 o mas caracteres.\n";
        document.getElementById('error-city').innerText = errorMsg;
    }
}


/*----------------------------VALIDATE POSTAL CODE-----------------------------*/

var postalCode = document.getElementById('postalCode');
postalCode.addEventListener('blur',validatePostalCode);
postalCode.addEventListener('focus',clearWarningInput);


function validatePostalCode(){
    var errorMsg = "";
    if (postalCode.value.length < 3){
        var errorMsg= "El codigo postla debe contar con 3 o mas caracteres.\n";
        document.getElementById('error-postalCode').innerText = errorMsg;
    }
}


/*----------------------------VALIDATE PASSPORT CARD-----------------------------*/

var passportCard = document.getElementById('passportCard');
passportCard.addEventListener('blur',validatePassportCard);
passportCard.addEventListener('focus',clearWarningInput);


function validatePassportCard(){

    var errorMsg = "";

    if(!Number.isInteger(Number(passportCard.value))){
        errorMsg="El DNI debe ser numerico y no tener decimales.\n";
    }else if(passportCard.value.length < 7 || passportCard.value.length > 8){
        errorMsg= "El DNI debe contener 7 u 8 digitios.\n";
    }
    
    document.getElementById('error-passportCard').innerText = errorMsg;
}


/*----------------------------BTN SEND-----------------------------*/

btnSend.addEventListener('click', checkInputs)

function checkInputs(){
var flagErrorEmpty = true;
var flagErrorInputEmpty=true;
var allMsgErrorString =[];
var allInputs = [];

    allMsgError=document.getElementsByClassName('error');

    for (x = 0; x < allMsgError.length; x++) {
        if (allMsgError[x].innerText != '') {
            flagErrorEmpty = false; //Si encuentra un error -> Falso
        }
    }

    allInputs=document.querySelectorAll('form input');

    for (x = 0; x < allInputs.length; x++) {
        if (allInputs[x].value === '') { 
            flagErrorInputEmpty = false; //Si encuentra un campo vacio ->Falso
        }
    }
    
    if (flagErrorEmpty && flagErrorInputEmpty){
        var response = confirm('Verifique sus datos:'+'\nNombre: '+nameSurname.value +'\nEmail: '+email.value +'\nContraseña: '+password.value+ '\nEdad: '+age.value+'\nTelefono: '+cellPhoneNumber.value+'\nDireccion: '+address.value+'\nCiudad: '+city.value+'\nCodigo Postal: '+postalCode.value+'\nDNI: '+passportCard.value);
        if (response) {
            /*alert('Usuario creado con exito');*/
            var url = 'https://jsonplaceholder.typicode.com/todos/';
            fetch(url).then(function (response) {
                if (response.ok) {
                    allForm.style.display="none";
                    localStorage.clear();
                    localStorage.setItem('name',nameSurname.value);
                    localStorage.setItem('email',email.value);
                    localStorage.setItem('password',password.value);
                    localStorage.setItem('age',age.value);
                    localStorage.setItem('tel',cellPhoneNumber.value);
                    localStorage.setItem('adress',address.value);
                    localStorage.setItem('city',city.value);
                    localStorage.setItem('postal',postalCode.value);
                    localStorage.setItem('dni',passportCard.value);
                    alert('Usuario creado con exito');
                } else {
                    alert('No se ha podido conectar con el servidor');
                }
            });
        }else{
            alert('Subscipcion cancelada con exito');
        }

    }else{
        if (flagErrorEmpty){
            alert('Debe completar todos los campos');
        }else{
            for(x = 0; x < allMsgError.length; x++){
                allMsgErrorString=allMsgErrorString+ allMsgError[x].innerText;
            }
            alert(allMsgErrorString);
        }
    } 
    
    allMsgErrorString= "";

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))


}
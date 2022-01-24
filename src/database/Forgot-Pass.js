// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC0zer2obvU5MQrJ2Pe-8_MMCzuwbB-ItU",
    authDomain: "tutoria-electron.firebaseapp.com",
    projectId: "tutoria-electron",
    storageBucket: "tutoria-electron.appspot.com",
    messagingSenderId: "933581286361",
    appId: "1:933581286361:web:bbfe963bc60d1a770fc7c8",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
const db = firebase.firestore();


const getPass = (id) => db.collection("docentes").doc(id).get();
  
const onGetPass = (callback) =>
    db.collection("docentes").onSnapshot(callback);
//recupera 1 Courses por ID
    const getAPass = (id) => db.collection("docentes").doc(id).get();

const formEmail = document.querySelector('#formEmail')
const inputemail = document.querySelector('#InputEmail')

var Email = { 
    send: function (a) { 
        return new Promise(function (n, e) { 
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; 
            var t = JSON.stringify(a); 
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, 
    ajaxPost: function (e, n, t) { 
        var a = Email.createCORSRequest("POST", e); 
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
        a.onload = function () { var e = a.responseText; null != t && t(e) }, 
        a.send(n) }, 
    ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); 
        t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, 
    createCORSRequest: function (e, n) { 
        var t = new XMLHttpRequest; 
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

formEmail.addEventListener('submit',async e => {
    e.preventDefault();
    const datos = {
        Email: inputemail.value,
    }
    Email.send({
        SecureToken : "9b5bd31f-ef4c-4aa6-9cbf-39cf9f4c20a5",
        To : "sistema.unsaac22@gmail.com",
        From : Email,
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
});

//mandando mi contraseña al correo ingresado 


// ////======================================================
// formCodigo.addEventListener('submit', async e => {
//     e.preventDefault();
//     const datos = {
//         codigo: inputCodigo.value,
//     }

//     try {
//         const document = {
//             name: '',
//             password: '',
//         }
//         const collectionAdmin = await db.collection("docentes").get().then((querySnapshot) => {
//             console.log(querySnapshot);
//             querySnapshot.forEach((doc) => {
//                 if(doc.data().codigo_docente === datos.codigo){
//                     document.name = doc.data().name
//                     document.password = doc.data().password
//                 }
//             });
//         });
//         if(document.name === ''){
//             alert("ERROR: No existe administrador");
//         }else{
//             if(document.password === admin.password){
//                 console.log("password correcto");
//                 window.location="../admin/admin.html"; 
//             }else{
//                 alert("ERROR: Error en contraseña");
//             }
//         }
//     } catch (error) {
//         console.log('Error encontrado: ',error);
//     }

//     formLoginAdmin.reset();
// });
//<!--class="user" action="https://formsubmit.co/151450@unsaac.edu.pe" method="POST"-->

//<div class="form-group">
  //                                          <input type="text" class="form-control form-control-user"
    //                                            name="exampleInputPass" aria-describedby="emailHelp"
      //                                          placeholder="afasf..." required>
        //                                </div>
          //                              <div class="form-group">
            //                                <input type="text" class="form-control form-control-user"
              //                                  name="exampleInputOld" aria-describedby="emailHelp"
                //                                placeholder="asfsaf..." required>
                  //                              
                    //                    </div>


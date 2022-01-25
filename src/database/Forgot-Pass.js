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


// const getPass = (id) => db.collection("docentes").doc(id).get();
  
// const onGetPass = (callback) =>
//     db.collection("docentes").onSnapshot(callback);
// //recupera 1 Courses por ID
//     const getAPass = (id) => db.collection("docentes").doc(id).get();

const formUser = document.querySelector('#form-user')
const inputemail = document.querySelector('#InputEmail')



const inputCodigo = document.querySelector('#InputCodigo')

formUser.addEventListener('submit',async e=>{
  e.preventDefault();
  const aux = {
  
    codigo: inputCodigo.value,
  }
  if(aux.codigo !== ''){
    const document = {
        contraseña:'',
        codigo: '',
    }
  
  const collectionDocente = await db.collection("docentes").get().then((querySnapshot) => {
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        if(doc.data().codigo_docente === aux.codigo){
          document.codigo= doc.data().codigo_docente
            document.contraseña = doc.data().password
        }
    });
  });
    if(aux.codigo==document.codigo){
      console.log("codigo igual");
      window.location="../admin/admin.html"; 
    }
  }
  formUser.reset();
  
})
// function sendMail(params){
// 	var	tempParams = {
// 		to_name: document.getElementById("toName").value,
// 		//from_name: document.getElementById("fromName").value,
// 		email: document.getElementById("email").value,
// 		message: document.getElementById("msg").value,		
// 	};

// 	emailjs.send('gmail','email_bruno',tempParams)
// 	.then(function(res){
// 		console.log("success", res.status);
// 	})
// }
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


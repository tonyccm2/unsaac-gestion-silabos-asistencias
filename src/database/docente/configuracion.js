
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

  const onGetDocente = (callback) =>
    db.collection("docentes").onSnapshot(callback);
    
const updateDocente = (id, updatedDocente) => db.collection('docentes').doc(id).update(updatedDocente);

const formDocente = document.getElementById("formDocente");


  //boton cargar docentes
  formDocente.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    try {
        var nombredocente = localStorage.getItem('docente');
        
        var password = formDocente["password"].value;
        var docentes = formDocente["regimen"].value;
        //var categoria = formDocente["categoria"].value;
        var cambio =true;
        onGetDocente((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var docente = doc.data();
                if(docente.codigo_docente==nombredocente && cambio)
                {
                    console.log(password,docentes, docente);
                    updateDocente(doc.id, {
                        codigo_docente: docentes,
                        password: password,
                        nombre: docente.nombre,
                        ap: docente.ap,
                        am: docente.am,
                        regimen: docente.regimen,
                        categoria: docente.categoria
                    });
                    cambio=false;
                    alert("Se Cambiaron los datos correctamente.");
                }
        
            });
        });
        formDocente.reset();
    } catch (error) {
        console.log(error);
    }
  });


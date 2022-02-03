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

  const onGetContenido = (callback) =>
    db.collection("ContenidoAca").onSnapshot(callback);
    
const updateTema = (id, updatedTema) => db.collection('ContenidoAca').doc(id).update(updatedTema);

const formTema = document.getElementById("formTema");


  //boton cargar docentes
  formTema.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    try {
        var identificad = localStorage.getItem('tema');
        
        var fechaA = formTema["fecha"].value;
        var horasA = formTema["horas"].value;
        var obser = formTema["obs"].value;
        var cambio =true;
        onGetContenido((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var temas = doc.data();
                if(temas.tema==identificad && cambio)
                {
                    console.log(fechaA,horasA,obser);
                    updateTema(doc.id, {
                        Codigo_curso: temas.Codigo_curso,
                        tema: temas.tema,
                        tiempo_planificado:temas.tiempo_planificado,
                        fecha: fechaA,  
                        tiempo_realizado:horasA,  
                        observaciones:obser 
                    });
                    cambio=false;
                    alert("Se Cambiaron los datos correctamente");
                }
        
            });
            
        });
        formTema.reset();
    } catch (error) {
        console.log(error);
    }
  });

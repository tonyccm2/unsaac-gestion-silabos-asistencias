
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

  var citiesRef = db.collection("asistencias");
  
  const getAsistenciaAlumno = () => db.collection("asistencias").get().orderBy("fecha", "desc");

  //elementos del html
  const listaAsistencia = document.getElementById("lista-asistencia-detallado");

  //metodos para la base de datos

  const ongetAsistencia = (callback) => db.collection("asistencias").orderBy("fecha").onSnapshot(callback);
  

  window.addEventListener("DOMContentLoaded", async (e) => {
    var codigo_alumnoLS = localStorage.getItem('codigo_alumno');
    ongetAsistencia((querySnapshot) => {
        listaAsistencia.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const asistencia = doc.data();
          if(asistencia.codigo_alumno == codigo_alumnoLS)
          {
            listaAsistencia.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
              <thead>          
                <tr>
                  <td>${asistencia.fecha}</td>
                  <td>${asistencia.estado}</td>
                </tr>
              </thead>
            </table>`;
          }
  
      });

  });
});
  
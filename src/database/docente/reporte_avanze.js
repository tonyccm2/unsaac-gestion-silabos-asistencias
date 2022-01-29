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

var codigo_cargaLS = localStorage.getItem('codigo_carga');
const listatemas = document.getElementById("lista-temas-informe");

const onGetContenido = (callback) => db.collection("ContenidoAca").onSnapshot(callback);
window.addEventListener("DOMContentLoaded", async (e) => {
    var codigo_cargaLS = localStorage.getItem('codigo_carga');
    onGetContenido((querySnapshot) => {
        listatemas.innerHTML = "";
        listatemas.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
            <tr>
            <td>Fecha</td>
                <td>Tema</td>
                <td>Horas Planificadas</td>
                <td>Horas Realizadas</td>
                
                <td>Detalles</td>
            </tr>
            </thead>
        </table>`;
        querySnapshot.forEach((doc) => {
          const temas = doc.data();
          if(temas.Codigo_curso == codigo_cargaLS)
          {
            var tiempo_plani=temas.tiempo_planificado-temas.tiempo_realizado ;
            var texto="";
            if(tiempo_plani===0){
                texto="tema completado en el tiempo planificado";
            }
            else{
                if(tiempo_plani < 0){
                    texto="tema completado con exceso de "+ Math.abs(tiempo_plani)+" horas"; 
                }else{
                    texto="tema no completado";
                }
            }
            listatemas.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
              <thead>          
                <tr>
                  <td>${temas.fecha}</td>
                  <td>${temas.tema}</td>
                  <td>${temas.tiempo_planificado} </td>
                  <td>${temas.tiempo_realizado} </td>
                  
                  <td>${texto} </td>
                </tr>
              </thead>
            </table>`;
          }
  
      });

  });
});
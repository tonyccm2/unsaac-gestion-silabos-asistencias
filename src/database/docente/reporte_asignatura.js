
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

const listaAsignaturas = document.getElementById("lista-temas-asignatura");
const circulo =document.getElementById("circles-1")
//tablas de temas y cursos
const onGetCarga = (callback) =>    db.collection("carga").onSnapshot(callback);
const onGetContenido = (callback) => db.collection("ContenidoAca").onSnapshot(callback);

var cursoA = "";
var codigo_cargaLS = localStorage.getItem('codigo_carga');
const collectioncursos = await db.collection("carga").get().then((querySnapshot) => {
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        if(doc.data().codigo_carga === codigo_cargaLS){
            cursoA = doc.data().codigo_carga
            
        }
    });
});
window.addEventListener("DOMContentLoaded", async (e) => {
    
    onGetContenido((querySnapshot) => {
        listaAsignaturas.innerHTML = "";
        listaAsignaturas.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
            <tr>
                <td>Codigo</td>
                <td>Asignatura</td>
                <td>Porcentaje de avanze</td>            
                <td>Detalles</td>
            </tr>
            </thead>
        </table>`;
        querySnapshot.forEach((doc) => {
          const temas = doc.data();
          if(temas.Codigo_curso == cursoA)
          {
            // var tiempo_plani=temas.tiempo_planificado-temas.tiempo_realizado ;
            var total_temas=0;
            //var texto="";
            if(temas.tema!==''){
                total_temas=total_temas+1;
            }
           
            listaAsignaturas.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
              <thead>          
                <tr>
                  <td>${temas.fecha}</td>
                  <td>${temas.tema}</td>
                  <td>${temas.tiempo_planificado} </td>
                  <td>${total_temas} </td>
                  
                </tr>
              </thead>
            </table>`;
          }
  
      });

  });
});
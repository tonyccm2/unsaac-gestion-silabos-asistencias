
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
const onGetContenido = (callback) => db.collection("ContenidoAca").orderBy("Codigo_curso").onSnapshot(callback);

// var cursoA = "";

// const collectioncursos = await db.collection("carga").get().then((querySnapshot) => {
//     console.log(querySnapshot);
//     querySnapshot.forEach((doc) => {
//         if(doc.data().codigo_carga === codigo_cargaLS){
//             cursoA = doc.data().codigo_carga
            
//         }
//     });
// });

var codigo_cargaLS = localStorage.getItem('codigo_carga');

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetContenido((querySnapshot) => {
      listaAsignaturas.innerHTML = "";
        listaAsignaturas.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
            <tr>
                <td>Codigo</td>
                
                <td>Porcentaje de avanze</td>            
                <td>Detalles</td>
            </tr>
            </thead>
        </table>`;
        var total_temas=0;
        querySnapshot.forEach((doc) => {
          const temas = doc.data();
          
          if(temas.Codigo_curso ===  )
          {
            
            total_temas+=1;// var tiempo_plani=temas.tiempo_planificado-temas.tiempo_realizado ;
            
            //var texto="";
            // if(){
                
            // }
            listaAsignaturas.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
            <thead>          
                <tr>
                    <td>${temas.Codigo_curso}</td>
                    <td>${total_temas}</td>
                               
                    <td>Detalles</td>
                </tr>
                </thead>
            </table>`;
            
          }
          
          
      });
      

  });
});
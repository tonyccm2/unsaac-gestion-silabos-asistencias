
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

const inputfileContenidoAca = document.getElementById('inputfile-ContenidoAca')
  
const formCargaContenidoAca = document.getElementById("formCargaContenidoAca");

const TemasContainer = document.getElementById("prelista-ContenidoAca");   

//guardar Tema
const saveContenidoAca = (
    Codigo_curso,
    tema,
    tiempo_planificado
  ) =>
    db.collection("ContenidoAca").doc().set({
      Codigo_curso,
      tema,
      tiempo_planificado

    });

const getContenido = (id) => db.collection("ContenidoAca").doc(id).get();
const onGetContenido = (callback) =>
    db.collection("ContenidoAca").onSnapshot(callback);

//boton cargar Temas
formCargaContenidoAca.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    try {
      readXlsxFile(inputfileContenidoAca.files[0]).then((data) => {
        var cod = ""
        data.forEach(row => {
          //if(cod != row[0]){
           // cod=row[0]
            saveContenidoAca(
              row[0],
              row[1],
              row[2]
            );
          //}
          
        });
        alert("el contenido academico se guardó en la base de datos con exito");
      })
      formCargaContenidoAca.reset();
    } catch (error) {
      console.log(error);
    }
  });
//
// inputfileContenidoAca.addEventListener('change', () => {
//   readXlsxFile(inputfileContenidoAca.files[0]).then((data) => {
    
//     var cod = ""
//     data.forEach(row => {
//       if(cod != row[0]){
//         cod = row[0]
//         console.log(
//           row[0],
//           row[1]
          
//           )
//       }
//     });
//     // `rows` is an array of rows
//     // each row being an array of cells.
//   })
// });


///
//previsualizacion de temas a subir
inputfileContenidoAca.addEventListener('change', () => {
  readXlsxFile(inputfileContenidoAca.files[0]).then((data) => {  
    TemasContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
    <thead>          
      <tr>
      <td>Codigo Curso</td>
        <td>Tema</td>
        <td>Horas Planificadas</td>
      </tr>
    </thead>
  </table>`;

    data.forEach(row => {
      TemasContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
          <tr>
            <td >${row[0]}</td>
            <td >${row[1]}</td>
            <td >${row[2]}</td>
          </tr>
        </thead>
      </table>`;
    });
    
  })
});

   
//tabla de temas 
const saveTemas = (
  fecha,  
  tema,
  tiempo_planificado,
  tiempo_realizado,  
  observaciones 
) =>
  db.collection("temasFecha").doc().set({
    fecha,  
    tema,
    tiempo_planificado,
    tiempo_realizado,  
    observaciones 
  });
//tabla de temas
const onGetAC = (callback) =>
      db.collection("carga").onSnapshot(callback);


const temas_Container = document.getElementById("lista-temas");
window.addEventListener("DOMContentLoaded", async (e) => {
  var codigo_cargaLS = localStorage.getItem('codigo_carga');
  onGetContenido((querySnapshot) => {
    temas_Container.innerHTML = "";
    temas_Container.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
    <thead>          
      <tr>
      <td>Fecha</td>
        <td>Tema</td>
        <td>Horas Planificadas</td>
        <td>Horas Realizadas</td>
        <td>Observaciones</td>
      </tr>
    </thead>
  </table>`;
    querySnapshot.forEach((doc) => {
      var aux = doc.data();
      if(aux.Codigo_curso==codigo_cargaLS)
      {
              // FRONT-END ?????????????
        temas_Container.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td>
                <form id="formFecha" class="form" role="form">
                <input type="date" id="fecha-lista" class="sm-form-control">
                </form>
              </td>
              <td class="h6">${aux.tema}</td>
              <td class="h6">${aux.tiempo_planificado}</td>
              <td><input type="number" name="someid"></td>
              <td><input id="Observaciones" class="Observaciones" type="text" placeholder="escriba alguna observacion"></td>             
            </tr>
          </thead>
        </table>`;
      }
    });  
  });
});
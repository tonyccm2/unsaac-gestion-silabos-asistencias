
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

//guardar alumno curso
const saveAC = (
    nro_orden,
    codigo_ac,
    codigo_alumno,
    nombres,
    ap,
    am,
    codigo_carga,
    semestre
  ) =>
    db.collection("acs").doc().set({
      nro_orden,
      codigo_ac,
      codigo_alumno,
      nombres,
      ap,
      am,
      codigo_carga,
      semestre
    });
    const getAC = (id) => db.collection("acs").doc(id).get();
  
    const onGetAC = (callback) =>
      db.collection("acs").onSnapshot(callback);

const inputfileAlumnos = document.getElementById('inputfile-Alumnos')
const alumnosContainer = document.getElementById("prelista-alumnos");   

var codigo_cargaLS = localStorage.getItem('codigo_carga');
var semestreLS = localStorage.getItem('semestre'); 

inputfileAlumnos.addEventListener('change', () => {
  readXlsxFile(inputfileAlumnos.files[0]).then((data) => {  
    alumnosContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
    <thead>          
      <tr>
        <td>Nro Orden</td>
        <td>Codigo Alumno Curso</td>
        <td>Codigo</td>
        <td>Nombre</td>
        <td>AP</td>
        <td>AM</td>
      </tr>
    </thead>
  </table>`;

    data.forEach(row => {
      var arrayDeNombre = row[2].split("-");
      alumnosContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
          <tr>
            <td >${row[0]}</td>
            <td >${row[1]+codigo_cargaLS+semestreLS}</td>
            <td >${row[1]}</td>
            <td >${arrayDeNombre[0]}</td>
            <td >${arrayDeNombre[1]}</td>
            <td >${arrayDeNombre[2]}</td>
          </tr>
        </thead>
      </table>`;
    });
    
  })
});

//boton cargar carga alumnos

const formCargaAlumnos = document.getElementById("formCargaAlumnos");

formCargaAlumnos.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    readXlsxFile(inputfileAlumnos.files[0]).then((data) => {
      var fila1=false;
      data.forEach(row => {
        if(fila1){
          var arrayDeNombre = row[2].split("-");
          saveAC(
            row[0],
            row[1]+codigo_cargaLS+semestreLS,
            row[1],
            arrayDeNombre[0],
            arrayDeNombre[1],
            arrayDeNombre[2],
            codigo_cargaLS,
            semestreLS
          );
        }else{
          fila1=true
        }
        
      });
    })
    formCargaAlumnos.reset();
  } catch (error) {
    console.log(error);
  }
});

const acsContainer = document.getElementById("lista-acs");
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetAC((querySnapshot) => {
    acsContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const ac = doc.data();
      if(ac.codigo_carga==codigo_cargaLS && ac.semestre==semestreLS)
      {
              // FRONT-END ?????????????
        acsContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td>${ac.nro_orden}</td>
              <td>${ac.codigo_alumno}</td>
              <td>${ac.ap}</td>
              <td>${ac.am}</td>
              <td>${ac.nombres}</td>
              <td><input type="checkbox" class="sm-form-control"></td>
            </tr>
          </thead>
        </table>`;
      }
    });
  });
});
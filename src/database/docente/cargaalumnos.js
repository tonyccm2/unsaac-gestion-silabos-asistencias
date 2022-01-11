
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

//guardar asistencia
const saveAsistencia = (
    codigo_ac,
    fecha,
    estado
  ) =>
    db.collection("asistencias").doc().set({
        codigo_ac,
        fecha,
        estado
    });
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
    //recupera 1 Courses por ID
      const getACid = (id) => db.collection("acs").doc(id).get();

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
      alert("carga de estudiantes del curso se guardó en la base de datos con exito");
    })
    formCargaAlumnos.reset();
  } catch (error) {
    console.log(error);
  }
});

const formFecha = document.getElementById("formFecha");
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
              <td>
                <button class="btn btn-primary btn-presente" data-id="${doc.id}">
                Presente
                </button>
                <button class="btn btn-secondary btn-falto" data-id="${doc.id}">
                Faltó
                </button>
                
              </td>

            </tr>
          </thead>
        </table>`;
      }
    });
  
    //funcionalidad boton-asistencia
    const btnsPresente = acsContainer.querySelectorAll(".btn-presente");

    btnsPresente.forEach((btn) =>{
      btn.addEventListener("click", async (e) => {
        var fechaSelecionada = formFecha["fecha-lista"].value;
        const doc = await getACid(e.target.dataset.id);
        const ac = doc.data();
        console.log(ac, fechaSelecionada, "asistió");
        if(fechaSelecionada == ""){
          alert("debe seleccionar una fecha para guardar la asistencia de los alumnos.")
        }else{
          saveAsistencia(
            ac.codigo_ac,
            fechaSelecionada,
            "asistió"
          );
        }
      })
    });
  
    //funcionalidad boton-asistencia
    const btnsFalto = acsContainer.querySelectorAll(".btn-falto");

    btnsFalto.forEach((btn) =>{
      btn.addEventListener("click", async (e) => {
        var fechaSelecionada2 = formFecha["fecha-lista"].value;
        const doc = await getACid(e.target.dataset.id);
        const ac = doc.data();
        console.log(ac, fechaSelecionada2, "faltó");
        if(fechaSelecionada2 == ""){
          alert("debe seleccionar una fecha para guardar la asistencia de los alumnos.")
        }else{
          saveAsistencia(
            ac.codigo_ac,
            fechaSelecionada2,
            "faltó"
          );
        }
      })
    });
  });
});
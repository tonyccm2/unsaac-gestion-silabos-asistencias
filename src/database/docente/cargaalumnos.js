
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
    codigo_alumno,
    codigo_carga,
    semestre,
    fecha,
    estado
  ) =>
    db.collection("asistencias").doc().set({
        codigo_alumno,
        codigo_carga,
        semestre,
        fecha,
        estado
    });
//guardar asistencia docente
const saveAsistenciaDocentes = (
    codigo_docente,
    codigo_carga,
    semestre,
    fecha
  ) =>
    db.collection("asistenciasDocentes").doc().set({
        codigo_docente,
        codigo_carga,
        semestre,
        fecha
    });
//guardar alumno curso
const saveAC = (
    nro_orden,
    codigo_ac,
    codigo_alumno,
    ap,
    am,
    nombres,
    codigo_carga,
    semestre,
    asistio,
    falto
  ) =>
    db.collection("acs").doc().set({
      nro_orden,
      codigo_ac,
      codigo_alumno,
      ap,
      am,
      nombres,
      codigo_carga,
      semestre,
      asistio,
      falto
    });
    const getAC = (id) => db.collection("acs").doc(id).get();
  
    const onGetAC = (callback) =>
      db.collection("acs").onSnapshot(callback);
    //recupera 1 Courses por ID
      const getACid = (id) => db.collection("acs").doc(id).get();
    
    
    const updateAC = (id, updatedAC) =>
      db.collection("acs").doc(id).update(updatedAC);

  //carga
  const updateCarga = (id, updateCarga) => db.collection('carga').doc(id).update(updateCarga);
  
  const onGetCarga = (callback) =>
    db.collection("carga").orderBy("codigo_carga").onSnapshot(callback);
    

const inputfileAlumnos = document.getElementById('inputfile-Alumnos')
const alumnosContainer = document.getElementById("prelista-alumnos");   

var codigo_cargaLS = localStorage.getItem('codigo_carga');
var semestreLS = localStorage.getItem('semestre'); 
var docenteLS = localStorage.getItem('docente');

inputfileAlumnos.addEventListener('change', () => {
  readXlsxFile(inputfileAlumnos.files[0]).then((data) => {  
    alumnosContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
    <thead>          
      <tr>
        <td>Nro Orden</td>
        <td>Codigo Alumno Curso</td>
        <td>Codigo</td>
        <td>AP</td>
        <td>AM</td>
        <td>Nombres</td>
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
      var cantidad = 0;
      data.forEach(row => {
        if(row[0]!="NRO"){
          var arrayDeNombre = row[2].split("-");
          saveAC(
            row[0],
            row[1]+codigo_cargaLS+semestreLS,
            row[1],
            arrayDeNombre[0],
            arrayDeNombre[1],
            arrayDeNombre[2],
            codigo_cargaLS,
            semestreLS,
            0,
            0
          );
          cantidad+=1;
        }else{
          console.log("fila no agregada");
        }
        
      });
      alert("carga de estudiantes del curso se guardó en la base de datos con exito");
    });
    //update
    var nombredocente = localStorage.getItem('docente');
    onGetCarga((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var carga = doc.data();
              if(carga.docente ==nombredocente)
              {
                  updateCarga(doc.id, {
                    codigo_carga: carga.codigo_carga,
                    carrera: carga.carrera,
                    curso: carga.curso,
                    cred: carga.cred,
                    tipo: carga.tipo,
                    gpo: carga.gpo,
                    ht: carga.ht,
                    hp: carga.hp,
                    dia: carga.dia,
                    hr_inicio: carga.hr_inicio,
                    hr_fin: carga.hr_fin,
                    aula: carga.aula,
                    docente: carga.docente,
                    semestre: carga.semestre,
                    alumnos: cantidad
                  });
              }
      
          });
      });
    formCargaAlumnos.reset();
  } catch (error) {
    console.log(error);
  }
});

const formFecha = document.getElementById("formFecha");
formFecha.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    var fechaSelecionada1 = formFecha["fecha-lista"].value;
    if(fechaSelecionada1 == ""){
          alert("debe seleccionar una fecha para guardar su asistencia.")
        }else{
          saveAsistenciaDocentes(
            docenteLS,
            codigo_cargaLS,
            semestreLS,
            fechaSelecionada1,
          );
          alert("Docente, su asistencia se guardó con exito.")
        }
  } catch (error) {
    console.log(error);
  }
});


const acsContainer = document.getElementById("lista-acs");
window.addEventListener("DOMContentLoaded", async (e) => {
  await onGetAC((querySnapshot) => {
    acsContainer.innerHTML = "";
    acsContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
    <thead>          
      <tr>
        <td>Nro Orden</td>
        <td>Codigo</td>
        <td>Apellido P</td>
        <td>Apellido M</td>
        <td>Nombres</td>
        <td>Asistencia</td>
      </tr>
    </thead>
  </table>`;
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
        if(fechaSelecionada == ""){
          alert("debe seleccionar una fecha para guardar la asistencia de los alumnos.")
        }else{
          saveAsistencia(
            ac.codigo_alumno,
            codigo_cargaLS,
            semestreLS,
            fechaSelecionada,
            "asistió"
          );
          updateAC(doc.id, {
              nro_orden: ac.nro_orden,
              codigo_ac: ac.codigo_ac,
              codigo_alumno: ac.codigo_alumno,
              ap: ac.ap,
              am: ac.am,
              nombres: ac.nombres,
              codigo_carga: ac.codigo_carga,
              semestre: ac.semestre,
              asistio: ac.asistio+=1,
              falto: ac.falto,
          });
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
        if(fechaSelecionada2 == ""){
          alert("debe seleccionar una fecha para guardar la asistencia de los alumnos.")
        }else{
          saveAsistencia(
            ac.codigo_alumno,
            codigo_cargaLS,
            semestreLS,
            fechaSelecionada2,
            "faltó"
          );
          updateAC(doc.id, {
              nro_orden: ac.nro_orden,
              codigo_ac: ac.codigo_ac,
              codigo_alumno: ac.codigo_alumno,
              ap: ac.ap,
              am: ac.am,
              nombres: ac.nombres,
              codigo_carga: ac.codigo_carga,
              semestre: ac.semestre,
              asistio: ac.asistio,
              falto: ac.falto+=1,
          });
        }
      })
    });
  });
});
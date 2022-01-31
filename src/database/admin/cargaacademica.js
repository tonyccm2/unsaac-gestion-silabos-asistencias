
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



  const inputfileAcademica = document.getElementById('inputfile-Academica')
  
  const formCargaAcademica = document.getElementById("formCargaAcademica");

  //guardar carga academica
  const saveCarga = (
    codigo_carga,
    carrera,
    curso,
    cred,
    tipo,
    gpo,
    ht,
    hp,
    dia,
    hr_inicio,
    hr_fin,
    aula,
    docente,
    semestre,
    alumnos
  ) =>
    db.collection("carga").doc().set({
      codigo_carga,
      carrera,
      curso,
      cred,
      tipo,
      gpo,
      ht,
      hp,
      dia,
      hr_inicio,
      hr_fin,
      aula,
      docente,
      semestre,
      alumnos
    });
    const getCarga = (id) => db.collection("carga").doc(id).get();
  
    
  const onGetCarga = (callback) =>
    db.collection("carga").orderBy("codigo_carga").onSnapshot(callback);

  //boton cargar carga academica
  formCargaAcademica.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    try {
      readXlsxFile(inputfileAcademica.files[0]).then((data) => {
        var cod = ""
        data.forEach(row => {
          if(cod != row[0]){
            cod = row[0]
            saveCarga(
              row[0],
              row[1],
              row[2],
              row[3],
              row[4],
              row[5],
              row[6],
              row[7],
              row[8],
              row[9],
              row[10],
              row[11],
              row[13],
              "2021-II",
              0
            );
          }
        });
        alert("carga academica se guardó en la base de datos con exito");
      })
      formCargaAcademica.reset();
    } catch (error) {
      console.log(error);
    }
  });
  
  
  inputfileAcademica.addEventListener('change', () => {
    readXlsxFile(inputfileAcademica.files[0]).then((data) => {
      
      var cod = ""
      data.forEach(row => {
        if(cod != row[0]){
          cod = row[0]
          console.log(
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6],
            row[7],
            row[8],
            row[9],
            row[10],
            row[11],
            row[13]
            )
        }
      });
      // `rows` is an array of rows
      // each row being an array of cells.
    })
  });
  

  
  const inputfileCarga = document.getElementById('inputfile-Academica')
  const precargaContainer = document.getElementById("prelista-carga");  
  
  inputfileCarga.addEventListener('change', () => {
    readXlsxFile(inputfileCarga.files[0]).then((data) => {  
      precargaContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
      <thead>          
        <tr>
          <td>Código</td>
          <td>Carrera</td>
          <td>Curso</td>
          <td>Cred</td>
          <td>Docente</td>
          <td>Semestre</td>
        </tr>
      </thead>
    </table>`;
      data.forEach(row => {
        precargaContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td>${row[13]}</td>
              <td>${"semestre"}</td>}
            </tr>
          </thead>
        </table>`;
      });
      
    })
  });

  const cargaContainer = document.getElementById("lista-carga");
  window.addEventListener("DOMContentLoaded", async (e) => {
    onGetCarga((querySnapshot) => {
      cargaContainer.innerHTML = "";
      cargaContainer.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
      <thead>          
        <tr>
          <td>Código</td>
          <td>Carrera</td>
          <td>Curso</td>
          <td>Cred</td>
          <td>Docente</td>
          <td>Semestre</td>
          <td>Asistencia</td>
        </tr>
      </thead>
    </table>`;
      querySnapshot.forEach((doc) => {
        const carga = doc.data();
        cargaContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td class="h6">${carga.codigo_carga}</td>
              <td class="h6">${carga.carrera}</td>
              <td class="h6">${carga.curso}</td>
              <td class="h6">${carga.cred}</td>
              <td class="h6">${carga.docente}</td>
              <td class="h6">${carga.semestre}</td>
              <td>
                <button class="btn btn-primary btn-detalles" data-id="${doc.id}">
                Asistencia
                </button>
              </td>
            </tr>
          </thead>
        </table>`;
      });
      
    //funcionalidad boton-asistencia
    const btnsDetalles = cargaContainer.querySelectorAll(".btn-detalles");

    btnsDetalles.forEach((btn) =>{
      btn.addEventListener("click", async (e) => {
        const doc = await getCarga(e.target.dataset.id);
        const ac = doc.data();
        localStorage.setItem('codigo_carga', ac.codigo_carga);
        localStorage.setItem('docenteAsistencia', ac.docente);
        window.location="../../views/admin/asistenciaDocente.html";
      })
    });
    });
  });
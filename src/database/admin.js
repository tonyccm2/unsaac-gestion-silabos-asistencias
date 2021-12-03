
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

const formDocente = document.getElementById("formDocente");
const docentesContainer = document.getElementById("lista-docentes");

let editStatus = false;
let id = "";

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
const saveDocente = (
  codigo_docente,
  password,
  nombre,
  ap,
  am,
  categoria,
  regimen
) =>
  db.collection("docentes").doc().set({
    codigo_docente,
    password,
    nombre,
    ap,
    am,
    categoria,
    regimen
  });
//recupera los docentes
const getDocentes = () => db.collection("docentes").get();

const onGetDocente = (callback) =>
  db.collection("docentes").onSnapshot(callback);
//borrar
const deleteDocente = (id) => db.collection("docentes").doc(id).delete();
//recupera 1 docente por ID
const getDocente = (id) => db.collection("docentes").doc(id).get();
//actualiza
const updateDocente = (id, updatedDocente) =>
  db.collection("docentes").doc(id).update(updatedDocente);

//******************************************************************/
//ventanas y funcionalidades

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetDocente((querySnapshot) => {
    docentesContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const docente = doc.data();
      // FRONT-END ?????????????
      docentesContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
          <tr>
            <td class="h6">${docente.codigo_docente}</td>
            <td class="h6">${docente.nombre}</td>
            <td class="h6">${docente.ap}</td>
            <td class="h6">${docente.am}</td>
            <td class="h6">${docente.categoria}</td>
            <td class="h6">${docente.regimen}</td>
            <td>
              <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Delete
              </button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Edit
              </button>
            </td>
          </tr>
        </thead>
      </table>`;
    });
    //funcionalidad boton-borrar
    const btnsDelete = docentesContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          //borra el docente o manda mensaje aviso
          await deleteDocente(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );
    // funcionalidad boton-editar
    const btnsEdit = docentesContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getDocente(e.target.dataset.id);
          const docente = doc.data();
          // recuperamos al form todos los valores
          formDocente["codigo"].value = docente.codigo_docente;
          formDocente["password"].value = docente.contrasenia;
          formDocente["nombre"].value = docente.nombre;
          formDocente["ap"].value = docente.ap;
          formDocente["am"].value = docente.am;
          formDocente["categoria"].value = docente.categoria;
          formDocente["regimen"].value = docente.regimen;
          //mostramos mas???
          editStatus = true;
          id = doc.id;
          formDocente["btn-docente-form"].innerText = "Update";
          //actualiza
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
//funcionalidad subir a la nube
formDocente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const codigo_docente = formDocente["codigo"];
  const password = formDocente["password"];
  const nombre = formDocente["nombre"];
  const ap = formDocente["ap"];
  const am = formDocente["am"];
  const categoria = formDocente["categoria"];
  const regimen = formDocente["regimen"];
  //intenta hacer la peticion sin lanzar error y cerrar
  try {
    if (!editStatus) {
      await saveDocente(
        codigo_docente.value,
        password.value,
        nombre.value,
        ap.value,
        am.value,
        categoria.value,
        regimen.value
      );
    } else {
      await updateDocente(id, {
        codigo: codigo_docente.value,
        password: password.value,
        nombre: nombre.value,
        ap: ap.value,
        am: am.value,
        categoria: categoria.value,
        regimen: regimen.value,
      });
      //regresa a estar vacio y poder usarla nuevamente
      editStatus = false;
      id = "";
      formDocente["btn-docente-form"].innerText = "Save";
    }

    formDocente.reset();
    codigo.focus(); // title.focus ??
  } catch (error) {
    console.log(error);
  }
});

const inputfileAcademica = document.getElementById('inputfile-Academica')
const inputfileDocente = document.getElementById('inputfile-Docente')

const formCargaAcademica = document.getElementById("formCargaAcademica");
const formCargaDocente = document.getElementById("formCargaDocente");


inputfileDocente.addEventListener('change', () => {
  readXlsxFile(inputfileDocente.files[0]).then((data) => {
    
    var cod = ""
    data.forEach(row => {
      if(cod != row[0]){
        cod = row[0]
        console.log(
          row[0],
          row[1])
      }
    });
    
    // `rows` is an array of rows
    // each row being an array of cells.
  })
});

//boton cargar docentes
formCargaDocente.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    readXlsxFile(inputfileDocente.files[0]).then((data) => {
      data.forEach(row => {
          saveDocente(
            row[1],
            row[1],
            row[1],
            "ap",
            "am",
            "categoria",
            "regimen"
          );
      });
    })
    formCargaDocente.reset();
  } catch (error) {
    console.log(error);
  }
});


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
  docente
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
    docente
  });
  const getCarga = (id) => db.collection("carga").doc(id).get();

  
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
            row[13]
          );
        }
      });
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


//cursos

//guardar carga academica como curso
const saveCurso = (
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
  docente
) =>
  db.collection("cursos").doc().set({
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
    docente
  });
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
  
  const docentesContainer = document.getElementById("lista-cursos");
  const formDocente = document.getElementById("formCurso");
  const formCerrarSesion = document.getElementById("formCerrarSesion");
  
  let editStatus = false;
  let id = "";
  
  /**
   * Save a New Task in Firestore
   * @param {string} title the title of the Task
   * @param {string} description the description of the Task
   */
  const saveCourses = (
    codCourse,
    nameCourse,
    categoryCourse,
  ) =>
    db.collection("Courses").doc().set({
        codCourse,
        nameCourse,
        categoryCourse,
    });
  // recupera el codigo
  const onGetCodigos = (callback) =>
    db.collection("codigos").onSnapshot(callback);
  const codigos=() => db.collection('codigos').get();

  const deleteCodigo = (id) => db.collection("codigos").doc(id).delete();


  //recupera los cursos
  const getCursos = () => db.collection("cursos").get();
  
  const onGetCursos = (callback) =>
    db.collection("cursos").onSnapshot(callback);
  //borrar
  const deleteCursos = (id) => db.collection("cursos").doc(id).delete();
  //recupera 1 Courses por ID
  const getCurso = (id) => db.collection("cursos").doc(id).get();
  //actualiza
  const updateCursos = (id, updatedCourses) =>
    db.collection("cursos").doc(id).update(updatedCourses);
  
  //******************************************************************/
  //ventanas y funcionalidades
  
  let idDocente;
  window.addEventListener("DOMContentLoaded", async (e) => {
    let red;
    onGetCodigos((querySnapshot) => {
      querySnapshot.forEach(doc =>{
        red = doc.data().codigodocente
        idDocente = doc.id
      })
    })
    onGetCursos((querySnapshot) => {
      docentesContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const curso = doc.data();
        if(curso.docente==red)
        {
                // FRONT-END ?????????????
          docentesContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
            <thead>          
              <tr>
                <td>${curso.codigo}</td>
                <td>${curso.carrera}</td>
                <td>${curso.curso}</td>
                <td>${curso.cred}</td>
                <td>
                  <button class="btn btn-primary btn-delete" data-id="${doc.id}">
                  Asistencia
                  </button>
                  <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                  Silabus
                  </button>
                </td>
              </tr>
            </thead>
          </table>`;
        }
  
      });
  
      //funcionalidad boton-borrar
      const btnsDelete = docentesContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            //borra el docente o manda mensaje aviso
            await deleteCurso(e.target.dataset.id);
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
            const doc = await getCurso(e.target.dataset.id);
            const curso = doc.data();
            // recuperamos al form todos los valores
            formDocente["CodigoCurso"].value = curso.codigo;
            formDocente["CarreraCurso"].value = curso.carrera;
            formDocente["CursoCurso"].value = curso.curso;
            formDocente["CreditoCurso"].value = curso.cred;
  
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
  
  //funcionalidad cerrar sesion
formCerrarSesion.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    
    //borra el docente o manda mensaje aviso
    await deleteCodigo(idDocente);
    console.log("se cerró la sesion correctamente");
    window.location="../login/login.html"; 
    
     // title.focus ??
  } catch (error) {
    console.log(error);
  }
});
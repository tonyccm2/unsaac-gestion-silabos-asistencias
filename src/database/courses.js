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
  const codigos=() => db.collection('codigos').get();
  //recupera los Courses
  const getCourses = () => db.collection("Courses").get();
  
  const onGetCourses = (callback) =>
    db.collection("Courses").onSnapshot(callback);
  //borrar
  const deleteCourses = (id) => db.collection("Courses").doc(id).delete();
  //recupera 1 Courses por ID
  const getCourses = (id) => db.collection("Courses").doc(id).get();
  //actualiza
  const updateCourses = (id, updatedCourses) =>
    db.collection("Courses").doc(id).update(updatedCourses);
  
  //******************************************************************/
  //ventanas y funcionalidades
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    const mostrarcodigo= await codigos();
    let red;
    mostrarcodigo.forEach(doc =>{
        //console.log(doc.data().codigo);
        red =doc.data().codigo;  
    })
    console.log(red);
    onGetCourses((querySnapshot) => {
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
                  🗑 Delete
                  </button>
                  <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                  🖉 Edit
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
  //funcionalidad subir a la nube
  formCourses.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const codCourse = formCourses["codCourse"];
    const nameCourse = formCourses["nameCourse"];
    const categoryCourse = formCourses["categoryCourse"];
    //intenta hacer la peticion sin lanzar error y cerrar
    try {
      if (!editStatus) {
        await saveCourses(
          codCourse.value,
          nameCourse.value,
          categoryCourse.value,
        );
      } else {
        await updateCourses(id, {
          codCourse: codCourse.value,
          nameCourse: nameCourse.value,
          categoryCourse: categoryCourse.value,
        });
        //regresa a estar vacio y poder usarla nuevamente
        editStatus = false;
        id = "";
        formCourses["btn-Courses-form"].innerText = "Save";
      }
  
      formCourses.reset();
      codigo.focus(); // title.focus ??
    } catch (error) {
      console.log(error);
    }
  });
  
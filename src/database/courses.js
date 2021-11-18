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
  
  const formCourses = document.getElementById("formCourses");
  const CoursesContainer = document.getElementById("lista-Courses");
  
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
    onGetCourses((querySnapshot) => {
      CoursesContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const Courses = doc.data();
        // FRONT-END ?????????????
        CoursesContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td>${Courses.codCourse}</td>
              <td>${Courses.nameCourse}</td>
              <td>${Courses.categoryCourse}</td>
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
      const btnsDelete = CoursesContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          console.log(e.target.dataset.id);
          try {
            //borra el Courses o manda mensaje aviso
            await deleteCourses(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
      // funcionalidad boton-editar
      const btnsEdit = CoursesContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getCourses(e.target.dataset.id);
            const Courses = doc.data();
            // recuperamos al form todos los valores
            formCourses["codCourse"].value = Courses.codCourse;
            formCourses["nameCourse"].value = Courses.nameCourse;
            formCourses["categoryCourse"].value = Courses.categoryCourse;
            //mostramos mas???
            editStatus = true;
            id = doc.id;
            formCourses["btn-Courses-form"].innerText = "Update";
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
  
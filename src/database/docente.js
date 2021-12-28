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
  
  //recupera los carga
  const getCarga = () => db.collection("carga").get();
  
  const onGetCarga = (callback) =>
    db.collection("carga").onSnapshot(callback);
  
  //******************************************************************/
  //ventanas y funcionalidades
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    var value = localStorage.getItem('docente');
    onGetCarga((querySnapshot) => {
      docentesContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const curso = doc.data();
        if(curso.docente==value)
        {
                // FRONT-END ?????????????
          docentesContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
            <thead>          
              <tr>
                <td>${curso.codigo_carga}</td>
                <td>${curso.carrera}</td>
                <td>${curso.curso}</td>
                <td>${curso.cred}</td>
                <td>
                  <button class="btn btn-primary btn-asistencia" data-id="${doc.id}">
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
  
      //funcionalidad boton-asistencia
      const btnsAsistencia = docentesContainer.querySelectorAll(".btn-asistencia");
      btnsAsistencia.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          const doc = await getCargaid(e.target.dataset.id);
          const curso = doc.data();
          console.log(curso);
          localStorage.setItem('codigo_carga', curso.codigo_carga);
          localStorage.setItem('semestre', curso.semestre);
          window.location="../../views/docente/RegistroAsistencia.html";
        })
      );
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
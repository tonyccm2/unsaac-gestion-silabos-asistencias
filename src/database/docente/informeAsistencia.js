
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

  //elementos del html
  const listaAsistencia = document.getElementById("lista-asistencia");

  //metodos para la base de datos
  const getAsistencia = (id) => db.collection("asistencias").doc(id).get();
  const ongetAsistencia = (callback) => db.collection("asistencias").onSnapshot(callback);
  
  const onGetAC = (callback) =>
  db.collection("acs").onSnapshot(callback);
  
  const getACid = (id) => db.collection("acs").doc(id).get();

  window.addEventListener("DOMContentLoaded", async (e) => {
    var codigo_cargaLS = localStorage.getItem('codigo_carga');
    var semestreLS = localStorage.getItem('semestre');
    onGetAC((querySnapshot) => {
        listaAsistencia.innerHTML = "";
        listaAsistencia.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
          <thead>          
            <tr>
              <td>Codigo</td>
              <td>AP</td>
              <td>AM</td>
              <td>Nombres</td>
              <td>Asistió</td>
              <td>Total</td>
            </tr>
          </thead>
        </table>`;
        querySnapshot.forEach((doc) => {
          const ac = doc.data();
          if(ac.codigo_carga ==codigo_cargaLS && ac.semestre==semestreLS)
          {
            listaAsistencia.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
              <thead>          
                <tr>
                  <td>${ac.codigo_alumno}</td>
                  <td>${ac.ap}</td>
                  <td>${ac.am}</td>
                  <td>${ac.nombres}</td>
                  <td>${ac.asistio}</td>
                  <td>${ac.asistio / (ac.asistio + ac.falto) *100}%</td>
                  <td>
                    <button class="btn btn-primary btn-detalles" data-id="${doc.id}">
                    Detalles
                    </button>
                  </td>
                </tr>
              </thead>
            </table>`;
          }
  
      });

    //funcionalidad boton-asistencia
    const btnsDetalles = listaAsistencia.querySelectorAll(".btn-detalles");

    btnsDetalles.forEach((btn) =>{
      btn.addEventListener("click", async (e) => {
        const doc = await getACid(e.target.dataset.id);
        const ac = doc.data();
        localStorage.setItem('codigo_alumno', ac.codigo_alumno);
        window.location="../../views/docente/informeDetallado.html";
      })
    });
  });
});
  
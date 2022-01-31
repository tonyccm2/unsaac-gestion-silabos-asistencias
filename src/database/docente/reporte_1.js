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

var codigo_cargaLS = localStorage.getItem('codigo_carga');
const listatemas = document.getElementById("lista-horas-avanzados");

const onGetContenido = (callback) => db.collection("ContenidoAca").onSnapshot(callback);
window.addEventListener("DOMContentLoaded", async (e) => {
    var codigo_cargaLS = localStorage.getItem('codigo_carga');
    onGetContenido((querySnapshot) => {
        listatemas.innerHTML = "";
        listatemas.innerHTML = `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
            <tr>
            <td>total de horas planificadas</td>
                <td>total de horas avanzadas</td>
                <td>Detalles</td>
            </tr>
            </thead>
        </table>`;
        var suma=0;
        var suma_Reali=0;
        var curso ="";
        var texto="";
        querySnapshot.forEach((doc) => {
          const temas = doc.data();
          if(temas.Codigo_curso == codigo_cargaLS)
          {
            
            if(temas.Codigo_curso == curso)
            {
                suma+=temas.tiempo_planificado;
                suma_Reali+=parseInt(temas.tiempo_realizado);
               
            }
            else{
                
                if(curso != "")
                {
                  listaAsignaturas.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
                  <thead>          
                      <tr>
                        <td>${suma} </td>
                        <td>${suma_Reali} </td>
                        <td>${texto} </td>
                      </tr>
                      </thead>
                  </table>`;
                }
                  curso = temas.Codigo_curso;
                  suma=0;
                  suma_Reali=0;
              }
              if(suma === suma_Reali){
                texto="se hizo en el total de horas avanzadas";
            }
            else{
                if(suma < suma_Reali){
                    texto="se excedio en horas realizadas debe optimizar mejor sus horas de dictado"; 
                }else{
                    texto="el dictado de clases se dicto de manera optima";
                }
            }            
          }
          
          
      });
      listatemas.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
              <thead>          
                <tr>
                  <td>${suma} </td>
                  <td>${suma_Reali} </td>
                  <td>${texto} </td>
                </tr>
              </thead>
            </table>`;
  });
});
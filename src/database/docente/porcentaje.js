
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
    
    //metodos para la base de datos
    const ongetAsistencia = (callback) => db.collection("asistencias").orderBy("fecha").onSnapshot(callback);
  

    
    //elementos del html
    const listaAsistencia = document.getElementById("lista-asistencia");

    //boton mostrar lista alumnos

const formFecha = document.getElementById("formFecha");

formFecha.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    var codigo_cargaLS = localStorage.getItem('codigo_carga');
    var semestreLS = localStorage.getItem('semestre');
    var fechaSelecionada = formFecha["fecha-lista"].value;
    var asistieron = 0;
    var faltaron = 0;
    ongetAsistencia((querySnapshot) => {
        listaAsistencia.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const asistencia = doc.data();
            if(asistencia.fecha == fechaSelecionada && asistencia.codigo_carga == codigo_cargaLS && asistencia.semestre == semestreLS)
            {
                if(asistencia.estado == "asistió")
                {
                    asistieron+=1;
                }
                else{
                    faltaron+=1
                }
                listaAsistencia.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
                <thead>          
                    <tr>
                    <td>${asistencia.codigo_alumno}</td>
                    <td>${asistencia.estado}</td>
                    </tr>
                </thead>
                </table>`;
            }
        });
        var porcentaje = asistieron/(asistieron+faltaron);
        listaAsistencia.innerHTML += `
                    <h3>Porcentaje de asistencia de alumnos</h3>
                    <h4>${porcentaje*100} %</h4>`;
    }); 
    
  } catch (error) {
    console.log(error);
  }
});
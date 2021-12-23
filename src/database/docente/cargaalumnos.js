
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

//guardar alumno curso
const saveAC = (
    codigo_ac,
    nombres,
    ap,
    am,
    codigo_carga,
    semestre
  ) =>
    db.collection("acs").doc().set({
        codigo_ac,
        nombres,
        ap,
        am,
        codigo_carga,
        semestre
    });
    const getCarga = (id) => db.collection("acs").doc(id).get();
  
const inputfileAlumnos = document.getElementById('inputfile-Alumnos')
const alumnosContainer = document.getElementById("prelista-alumnos");    

inputfileAlumnos.addEventListener('change', () => {
  readXlsxFile(inputfileAlumnos.files[0]).then((data) => {  
    alumnosContainer.innerHTML = "";

    data.forEach(row => {
      var arrayDeNombre = row[2].split("-");
      alumnosContainer.innerHTML += `<table class = "table-striped table-bordered table-hover" id="tablaarticulos">
        <thead>          
          <tr>
            <td >${row[0]}</td>
            <td >${row[1]}</td>
            <td >${arrayDeNombre[0]}</td>
            <td >${arrayDeNombre[1]}</td>
            <td >${arrayDeNombre[2]}</td>
          </tr>
        </thead>
      </table>`;
    });
    
    // `rows` is an array of rows
    // each row being an array of cells.
  })
});


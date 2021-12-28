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
const saveSilabus=(NombreAsignatura,CodigoAsignatura,Categoria,NumeroCredito,FechaInicio,FechaConclucion,NumeroHoras,AulaHorario,
    Modo,SemestreAcademico,Docente,Email,EscuelaProfecional,sumilla,competencia,resultadosAprendizaje,ActividadesPreliminares,TiempoPreliminar,herramientasdigitalesPreliminar,
    contenidoPrimeraUnidad, ActividadesPrimeraUnidad,TiempoPrimeraUnidad,herramientasdigitalesPrimeraUnidad,contenidoSegundaUnidad,ActividadSegundaUnidad,TiempoSegundaUnidad,
    herramientasdigitalesSegundaUnidad,contenidoTerceraUnidad,ActividadesTerceraUnidad,TiempoTerceraUnidad,herramientasdigitalesTerceraUnidad,EstrategiaMetodologia,
    ActividadeUnidad1,TecnicasUnidad1,InstrumentosUnidad1,PorcentajeUnidad1,PorcentajeAsignaturaUnidad1,ActividadeUnidad2,TecnicasUnidad2,InstrumentosUnidad2,
    PorcentajeUnidad2,PorcentajeAsignaturaUnidad2,ActividadeUnidad3,TecnicasUnidad3,InstrumentosUnidad3,PorcentajeUnidad3,PorcentajeAsignaturaUnidad3,
    ReferenciaBibliografica)=>
    db.collection("Silabus").doc().set({
        NombreAsignatura,
        CodigoAsignatura,
        Categoria,
        NumeroCredito,
        FechaInicio,
        FechaConclucion,
        NumeroHoras,
        AulaHorario,
        Modo,
        SemestreAcademico,
        Modo,
        SemestreAcademico,
        Docente,
        Email,
        EscuelaProfecional,
        sumilla,
        competencia,
        resultadosAprendizaje,
        ActividadesPreliminares,
        TiempoPreliminar,
        herramientasdigitalesPreliminar,
        contenidoPrimeraUnidad,
        ActividadesPrimeraUnidad,
        TiempoPrimeraUnidad,
        herramientasdigitalesPrimeraUnidad,
        contenidoSegundaUnidad,
        ActividadSegundaUnidad,
        TiempoSegundaUnidad,
        herramientasdigitalesSegundaUnidad,
        contenidoTerceraUnidad,
        ActividadesTerceraUnidad,
        TiempoTerceraUnidad,
        herramientasdigitalesTerceraUnidad,
        EstrategiaMetodologia,
        ActividadeUnidad1,
        TecnicasUnidad1,
        InstrumentosUnidad1,
        PorcentajeUnidad1,
        PorcentajeAsignaturaUnidad1,
        ActividadeUnidad2,
        TecnicasUnidad2,
        InstrumentosUnidad2,
        PorcentajeUnidad2,
        PorcentajeAsignaturaUnidad2,
        ActividadeUnidad3,
        TecnicasUnidad3,
        InstrumentosUnidad3,
        PorcentajeUnidad3,
        PorcentajeAsignaturaUnidad3,
        ReferenciaBibliografica
    });

    //var silabus=document.getElementById("Asist-container-Silabus")

function AgregarBDSilabus()
{
    var NombreAsignatura=document.getElementById("nombreAsignatura").value;
    var CodigoAsignatura=document.getElementById("codigoAsignatura").value;
    var Categoria=document.getElementById("categoria").value;
    var NumeroCredito=document.getElementById("numerocredito").value;
    var FechaInicio=document.getElementById("fechainicio").value ;
    var FechaConclucion=document.getElementById("fechaconclucion").value ;
    var NumeroHoras=document.getElementById("numerohoras").value ;
    var AulaHorario=document.getElementById("aulahorario").value ;
    var Modo=document.getElementById("modo").value ;
    var SemestreAcademico=document.getElementById("semestreacademico").value ;
    var Docente=document.getElementById("docente").value ;
    var Email=document.getElementById("emaildocente").value ;
    var EscuelaProfecional=document.getElementById("escuelaprofesional").value ;
    var sumilla=document.getElementById("sumilla-control").value ;
    var competencia=document.getElementById("competencia-control").value ;
    var resultadosAprendizaje=document.getElementById("resultadosaprendizaje-control").value;
    var ActividadesPreliminares=document.getElementById("ActividadesPreliminares").value ;
    var TiempoPreliminar=document.getElementById("TiempoPreliminar").value ;
    var herramientasdigitalesPreliminar=document.getElementById("herramientasdigitalesPreliminar").value;
    var contenidoPrimeraUnidad=document.getElementById("contenidoPrimeraUnidad").value ;
    var ActividadesPrimeraUnidad=document.getElementById("ActividadesPrimeraUnidad").value ;
    var TiempoPrimeraUnidad=document.getElementById("TiempoPrimeraUnidad").value ;
    var herramientasdigitalesPrimeraUnidad=document.getElementById("herramientasdigitalesPrimeraUnidad").value;
    var contenidoSegundaUnidad=document.getElementById("contenidoSegundaUnidad").value;
    var ActividadSegundaUnidad=document.getElementById("ActividadSegundaUnidad").value;
    var TiempoSegundaUnidad=document.getElementById("TiempoSegundaUnidad").value;
    var herramientasdigitalesSegundaUnidad=document.getElementById("herramientasdigitalesSegundaUnidad").value ;
    var contenidoTerceraUnidad=document.getElementById("contenidoTerceraUnidad").value  ;
    var ActividadesTerceraUnidad=document.getElementById("ActividadesTerceraUnidad").value ;
    var TiempoTerceraUnidad=document.getElementById("TiempoTerceraUnidad").value ;
    var herramientasdigitalesTerceraUnidad=document.getElementById("herramientasdigitalesTerceraUnidad").value;
    var EstrategiaMetodologia=document.getElementById("EstrategiaMetodologia").value ;
    var ActividadeUnidad1=document.getElementById("ActividadeUnidad1").value;
    var TecnicasUnidad1=document.getElementById("TecnicasUnidad1").value;
    var InstrumentosUnidad1=document.getElementById("InstrumentosUnidad1").value;
    var PorcentajeUnidad1=document.getElementById("PorcentajeUnidad1").value;
    var PorcentajeAsignaturaUnidad1=document.getElementById("PorcentajeAsignaturaUnidad1").value;
    var ActividadeUnidad2=document.getElementById("ActividadeUnidad2").value;
    var TecnicasUnidad2=document.getElementById("TecnicasUnidad2").value;
    var InstrumentosUnidad2=document.getElementById("InstrumentosUnidad2").value;
    var PorcentajeUnidad2=document.getElementById("PorcentajeUnidad2").value;
    var PorcentajeAsignaturaUnidad2=document.getElementById("PorcentajeAsignaturaUnidad2").value;
    var ActividadeUnidad3=document.getElementById("ActividadeUnidad3").value ;
    var TecnicasUnidad3=document.getElementById("TecnicasUnidad3").value  ;
    var InstrumentosUnidad3=document.getElementById("InstrumentosUnidad3").value  ;
    var PorcentajeUnidad3=document.getElementById("PorcentajeUnidad3").value  ;
    var PorcentajeAsignaturaUnidad3=document.getElementById("PorcentajeAsignaturaUnidad3").value  ;
    var ReferenciaBibliografica=document.getElementById("ReferenciaBibliografica").value  ;
    saveSilabus(
        NombreAsignatura,
        CodigoAsignatura,
        Categoria,
        NumeroCredito,
        FechaInicio,
        FechaConclucion,
        NumeroHoras,
        AulaHorario,
        Modo,
        SemestreAcademico,
        Modo,
        SemestreAcademico,
        Docente,
        Email,
        EscuelaProfecional,
        sumilla,
        competencia,
        resultadosAprendizaje,
        ActividadesPreliminares,
        TiempoPreliminar,
        herramientasdigitalesPreliminar,
        contenidoPrimeraUnidad,
        ActividadesPrimeraUnidad,
        TiempoPrimeraUnidad,
        herramientasdigitalesPrimeraUnidad,
        contenidoSegundaUnidad,
        ActividadSegundaUnidad,
        TiempoSegundaUnidad,
        herramientasdigitalesSegundaUnidad,
        contenidoTerceraUnidad,
        ActividadesTerceraUnidad,
        TiempoTerceraUnidad,
        herramientasdigitalesTerceraUnidad,
        EstrategiaMetodologia,
        ActividadeUnidad1,
        TecnicasUnidad1,
        InstrumentosUnidad1,
        PorcentajeUnidad1,
        PorcentajeAsignaturaUnidad1,
        ActividadeUnidad2,
        TecnicasUnidad2,
        InstrumentosUnidad2,
        PorcentajeUnidad2,
        PorcentajeAsignaturaUnidad2,
        ActividadeUnidad3,
        TecnicasUnidad3,
        InstrumentosUnidad3,
        PorcentajeUnidad3,
        PorcentajeAsignaturaUnidad3,
        ReferenciaBibliografica,
    );
    window.alert("se guardo correctamete");
}
function LimpiarSilabus(){
    document.getElementById("nombreAsignatura").value="";
    document.getElementById("codigoAsignatura").value="";
    document.getElementById("categoria").value="";
    document.getElementById("numerocredito").value="";
    document.getElementById("fechainicio").value="" ;
    document.getElementById("fechaconclucion").value="" ;
    document.getElementById("numerohoras").value="" ;
    document.getElementById("aulahorario").value="" ;
    document.getElementById("modo").value="" ;
    document.getElementById("semestreacademico").value="" ;
    document.getElementById("docente").value="" ;
    document.getElementById("emaildocente").value="" ;
    document.getElementById("escuelaprofesional").value="" ;
    document.getElementById("sumilla-control").value="" ;
    document.getElementById("competencia-control").value="" ;
    document.getElementById("resultadosaprendizaje-control").value="";
    document.getElementById("ActividadesPreliminares").value="" ;
    document.getElementById("TiempoPreliminar").value="" ;
    document.getElementById("herramientasdigitalesPreliminar").value="";
    document.getElementById("contenidoPrimeraUnidad").value="" ;
    document.getElementById("ActividadesPrimeraUnidad").value="" ;
    document.getElementById("TiempoPrimeraUnidad").value="" ;
    document.getElementById("herramientasdigitalesPrimeraUnidad").value="";
    document.getElementById("contenidoSegundaUnidad").value="";
    document.getElementById("ActividadSegundaUnidad").value="";
    document.getElementById("TiempoSegundaUnidad").value="";
    document.getElementById("herramientasdigitalesSegundaUnidad").value="" ;
    document.getElementById("contenidoTerceraUnidad").value=""  ;
    document.getElementById("ActividadesTerceraUnidad").value="" ;
    document.getElementById("TiempoTerceraUnidad").value="" ;
    document.getElementById("herramientasdigitalesTerceraUnidad").value="";
    document.getElementById("EstrategiaMetodologia").value="" ;
    document.getElementById("ActividadeUnidad1").value="";
    document.getElementById("TecnicasUnidad1").value="";
    document.getElementById("InstrumentosUnidad1").value="";
    document.getElementById("PorcentajeUnidad1").value="";
    document.getElementById("PorcentajeAsignaturaUnidad1").value="";
    document.getElementById("ActividadeUnidad2").value="";
    document.getElementById("TecnicasUnidad2").value="";
    document.getElementById("InstrumentosUnidad2").value="";
    document.getElementById("PorcentajeUnidad2").value="";
    document.getElementById("PorcentajeAsignaturaUnidad2").value="";
    document.getElementById("ActividadeUnidad3").value="" ;
    document.getElementById("TecnicasUnidad3").value=""  ;
    document.getElementById("InstrumentosUnidad3").value=""  ;
    document.getElementById("PorcentajeUnidad3").value=""  ;
    document.getElementById("PorcentajeAsignaturaUnidad3").value=""  ;
    document.getElementById("ReferenciaBibliografica").value=""  ;
}
/**
 * clasifica el resultado del parseo con
 * xml2js a elementos en Javascript
 * 
 * @param parsedXML
 * @return {Promise<unknown>}
 */

export const classifyElements = async (parsedXML) => {
  return new Promise(((resolve, reject) => {

    if (parsedXML) {

      var regexActor = /\w*Actor\W{1}/;
      var regexRelDinamic = /e\w*\W{1}\w*\W{1}wrap/;
      var regexConcepto = /r\w*\W{1}0\W\w*\W{1}wrap/;
      var regexRelEstruct = /f\w*\W\w{7}/;
      //Relaciones o flechas que unen los diferentes elementos del diagrama
      var regexRelaciones = /ed\w{7}\W{1}\w*/;

      // const tamano = {
      //   pageWidth: parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageWidth,
      //   pageHeight: parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageHeight
      // }result.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell

      var i = 0;
      var aux, concepto, actor;
      var relaciones = [];
      var conceptosPadre = [];
      var atributos = {};
      var conceptosDinamicos = {};
      var actores = {};
      let relacionesDinamicas = [];

      parsedXML = parsedXML.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;

      parsedXML.forEach(obj => {
        if (obj.$.id == 0 || obj.$.id == 1) { // HAY QUE TENER CUIDADO AQUI, SI NO SE DESCARGA EL ESQUEMA CON SELECCIÓN, DA CON ERRORES
          return null;
        }
        else if (regexActor.test(obj.$.style)) {
          parsedXML[obj.$.id].$.style = 'actor';
          // console.log("Se encontro un actor", obj.$.value);
        }
        else if (regexRelDinamic.test(obj.$.style)) {
          parsedXML[obj.$.id].$.style = 'relDinamica';
          //console.log("Se encontro una relacion dinamica",obj.$); 
        }
        else if (regexConcepto.test(obj.$.style)) {
          parsedXML[obj.$.id].$.style = 'concepto';
          //console.log("Se encontro un concepto",obj.$); 
        }
        else if (regexRelEstruct.test(obj.$.style)) {
          parsedXML[obj.$.id].$.style = 'relEstructural';
          //console.log("Se encontro una relacion estructural",obj.$);
        }

        else if (regexRelaciones.test(obj.$.style)) {
          var source = obj.$.source;
          var target = obj.$.target;
          relaciones[i] = { sourc: source, targ: target };
          i++;
        }
        else {
          alert('Se detecto un elemento desconocido: ' + obj.$.value);

        }
      });

      // Relaciones
      i = 0;

      relaciones.forEach(rel => {
        var idSource = rel.sourc;
        var idTarget = rel.targ;

        // Identificación de conceptos padre
        if (parsedXML[idTarget].$.style == 'relEstructural' && parsedXML[idSource].$.style == 'concepto') {
          conceptosPadre[i] = { concepto: parsedXML[idSource].$.value, tiene: idTarget };
          // console.log(conceptosPadre[i]);
          i++;
        }
        // Indetificación de atributos
        if (parsedXML[idSource].$.style == 'relEstructural' && parsedXML[idTarget].$.style == 'concepto') {
          aux = atributos[idSource];
          if (aux) {
            atributos[idSource] = aux + ',' + parsedXML[idTarget].$.value;
          }
          else {
            atributos[idSource] = parsedXML[idTarget].$.value;
          }
        }
        // Indetificación de acciones sobre conceptos
        if (parsedXML[idSource].$.style == 'relDinamica' && parsedXML[idTarget].$.style == 'concepto') {
          aux = conceptosDinamicos[parsedXML[idTarget].$.value];
          if (aux) {
            conceptosDinamicos[parsedXML[idTarget].$.value] = aux + ',' + idSource;
          }
          else {
            conceptosDinamicos[parsedXML[idTarget].$.value] = idSource;
          }
        }
        // Indetificación de actores  y las acciones que realizan
        if (parsedXML[idTarget].$.style == 'relDinamica' && parsedXML[idSource].$.style == 'actor') {
          aux = actores[parsedXML[idSource].$.value];
          if (aux) {
            actores[parsedXML[idSource].$.value] = aux + ',' + idTarget;
          }
          else {
            actores[parsedXML[idSource].$.value] = idTarget;
          }
        }
      });

      // console.log('----Relaciones dinamicas')
      let acciones = [];
      let accionesDeActores;

      // Recorrer las acciones que se aplican sobre cada concepto
      i = 0;
      for (concepto in conceptosDinamicos) {
        acciones = conceptosDinamicos[concepto].split(",");
        accionesDeActores = {};
        acciones.forEach(accion => {
          // Buscar que actor realiza dicha acción
          for (actor in actores) {
            if (actores[actor].includes(accion)) {
              aux = accionesDeActores[actor];
              if (aux) {
                accionesDeActores[actor] = aux + ',' + parsedXML[accion].$.value;
              }
              else {
                accionesDeActores[actor] = parsedXML[accion].$.value;
              }
            }
          }
        });
        relacionesDinamicas[i] = { concepto: concepto, permisos: accionesDeActores };
        // console.log(relacionesDinamicas[i])
        i++;
      };
      // console.log("---- Objetos compuestos identificados:");
      conceptosPadre.forEach(obj => {
        obj.tiene = atributos[obj.tiene].split(",");
        // console.log(obj.concepto + ': ' + obj.tiene);
        obj.permisos = relacionesDinamicas.find(
          (relacion) => {
            return relacion.concepto == obj.concepto;
          }
        ).permisos;
        for (var [key, value] of Object.entries(obj.permisos)) {
          obj.permisos[key] = value.split(",");
        }
      });

      resolve(conceptosPadre);

    }
    else {
      reject('Error parsing XML')
    }

  }))
}
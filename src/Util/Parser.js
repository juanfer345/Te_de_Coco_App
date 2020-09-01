export const extractElemsOfDiagram = (parsedXML) => {
  if(parsedXML) {
    const regexEvento = /\D*ellipse\W/;
    const regexConcepto = /ded=0\W\w*\W\D/;
    const regexRelEstruct = /ded=1\D*\d\;a/;
    const regexRelDinamic =/1;\D*=1;dashed/;
    const regexlogro = /\d\W\w{6}W/;
    const relaciones = [];

    parsedXML.forEach( element => {
      element = element['$'];
      if(element.id === '0' || element.id === '1'){
        return null;
      }
      else if(regexEvento.test(element.style)){
        parsedXML[element.id].style='evento';
        console.log("Se encontro un evento",element);
      }
      else if(regexConcepto.test(element.style)){
        parsedXML[element.id].style='concepto';
        console.log("Se encontro un concepto",element);
      }
      else if(regexlogro.test(element.style)){
        parsedXML[element.id].style='logro';
        console.log("Se encontro un logro",element);
      }
      else if(regexRelDinamic.test(element.style)){
        parsedXML[element.id].style='relDinamica';
        console.log("Se encontro una relacion dinamica",element);
      }
      else if(regexRelEstruct.test(element.style)){
        parsedXML[element.id].style='relEstructural';
        console.log("Se encontro una relacion estructural",element);
      }
      else{
        console.log(element)
        relaciones.push({
          source:element.source,
          target:element.target
        });
      }
    });
    console.log(relaciones)
    relaciones.forEach(rel=>{
      const source = rel.source;
      const target = rel.target;
      console.log('El/La "',
        parsedXML[source].style,'" que contiene :"',parsedXML[source].$.value,'" esta unido mediante un/una "'+parsedXML[target].style,'" que contiene "',parsedXML[target].$.value,'"');
    });
  }

}

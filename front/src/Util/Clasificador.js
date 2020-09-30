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
      const tamano = {
        pageWidth : parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageWidth,
        pageHeight: parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageHeight
      }

      parsedXML = parsedXML.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;

      const hashFood = "bx9oK9eBgwVI-gTDX1wS-2"
      const hashRestaurante = "bx9oK9eBgwVI-gTDX1wS-21"

      const regexImg = /\wunded=0;w/
      const regexStyle = /\wunded=0\S*\washed/
      const regexTexto = /\wded=1/
      const regexBoton = /rhomb/

      let elements = {
        propiedadesComida: [], 
        propiedadesTienda:[],
        tamano: tamano
      };

      var hashesFood = [];
      var hashesTienda = [];

      parsedXML.forEach( element => {
        element = element['$'];

        if (element.source == hashFood) {
          hashesFood.push(element.target)

          elements.propiedadesComida.push(parsedXML.find(elementB => {
            if (elementB['$'].id == element.target){
              return elementB['$'].value;
            }
          })['$'].value);
        }
        else if (element.source == hashRestaurante) {
          hashesTienda.push(element.target)

          elements.propiedadesTienda.push(parsedXML.find(elementB => {
            if (elementB['$'].id == element.target){
              return elementB['$'].value;
            }
          })['$'].value);
        }
      })

      resolve(elements)
    } 
    else {
      reject('Error parsing XML')
    }
  }))
}
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
        pageWidth: parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageWidth,
        pageHeight: parsedXML.mxfile.diagram[0].mxGraphModel[0]['$'].pageHeight
      }

      parsedXML = parsedXML.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;

      const regexImg = /\wunded=0;w/
      const regexStyle = /\wunded=0\S*\washed/
      const regexTexto = /\wded=1/
      const regexBoton = /rhomb/

      let elements = {
        propiedadesComida: [],
        propiedadesTienda: [],
        tamano: tamano
      };
      var hashesConceptos = [];
      //const conceptosPermitidosComida = ['Categoria', 'Nombre', 'Precio', 'Descripcion', 'Foto'];

      parsedXML.forEach(element => {
        element = element['$'];
        var auxiliar = [];

        if (element.value == 'Tiene') {
          var hashTiene = element.id;
          parsedXML.find(sourceTarget => {
            if (sourceTarget['$'].target == hashTiene) {
              hashesConceptos.push(sourceTarget['$'].source);
            }
            else if (sourceTarget['$'].source == hashTiene) {
              hashesConceptos.push(sourceTarget['$'].target);
            }
          })

          for (let index = 0; index < hashesConceptos.length; index++) {
            auxiliar.push(parsedXML.find(elementB => {
              return elementB['$'].id == hashesConceptos[index];
            })['$'].value)
          }

          if (auxiliar.includes('Comida')) {
            elements.propiedadesComida.push(auxiliar.filter((elemento) => elemento != 'Comida'));
          }
          else if (auxiliar.includes('Propiedades de restaurante')) {
            elements.propiedadesTienda.push(auxiliar.filter((elemento) => elemento != 'Propiedades de restaurante'));
          }

          auxiliar = []; hashesConceptos = [];
        }
      })
      resolve(elements);
    }
    else {
      reject('Error parsing XML')
    }
  }))
}
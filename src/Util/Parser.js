export const classifyElements = async (parsedXML) => {
  return new Promise(((resolve, reject) => {
    if(parsedXML) {
      parsedXML = parsedXML.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;
      const regexImg = /\wunded=0;w/
      const regexStyle = /\wunded=0\S*\washed/
      const regexTexto = /\wded=1/

      let elements = {
        styles: [],
        texts: [],
        relations: [],
        imgs: []
      }
      parsedXML.forEach( element => {
        element = element['$'];

        switch (element.id) {
          case '0' :
          case '1' :
            return;
          default:
            const testString = element.style;
            if (regexStyle.test(testString)) {
              elements.styles.push(element)
            } else if (regexTexto.test(testString)) {
              elements.texts.push(element)
            } else if (regexImg.test(testString)) {
              elements.imgs.push(element)
            } else { // dashed lines
              elements.relations.push({
                source: element.source,
                target: element.target
              })
            }
        }
      })
      resolve(elements)
    } else {
      reject('Error parsing XML')
    }
  }))
}

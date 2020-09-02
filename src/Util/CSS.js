export const parseCSS = (elements) => {

  //css of texts
  const texts = elements.texts.map(text => {
    const styleStrings = text.style.split(';')
    const font = /font(Si|C|F)/

    const style = styleStrings
      .filter(styleString => font.test(styleString))
      .map(style => {
        let property = style.split('=')[0]
        let value = style.split('=')[1]

        switch (property){
          case 'fontColor':
            property = 'color';
            break;
          case 'fontSize':
           value = `${value}px`
            break;
        }

        return {[property]:value}
      })
      .reduce((curr,prev) => {
        return Object.assign(curr, prev);
      }, {} )


    return {
      id: text.id,
      style: style,
      text: text.value
    }
  })

  //css of images
  const images = elements.imgs.map( img => {
    const styleStrings = img.content.split(';');
    const regexImgStyles = /(link|tama)/
    const style = styleStrings
      .filter(string => regexImgStyles.test(string))
      .map(string => {
        const propertyPair = string.split('=')
        switch (propertyPair[0]){
          case 'link':
            return {
              src:propertyPair[1]
            }
          case 'tamaño':
            const width = propertyPair[1].split('x')[0]
            const height = propertyPair[1].split('x')[1]
            return {
              size:{
                width:`${width}px`,
                height:`${height}px`
              }
            }
        }
      })
    return ({
      id: img.id,
      style: style
    })
  })

  return ({
    texts:texts,
    images:images
  })
}
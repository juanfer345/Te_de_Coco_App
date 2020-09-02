export const compiler = (parsedResult) => {
  const compiledImages = parsedResult.imgs.map( img => {
    const relation = parsedResult.relations
      .find(relation=> relation.source === img.id );
    const properties = parsedResult.styles
      .find(style => style.id === relation.target );

    return {
      content: properties.value,
      id: img.id
    }
  })

  return{
    imgs: compiledImages,
    texts: parsedResult.texts
  }
}

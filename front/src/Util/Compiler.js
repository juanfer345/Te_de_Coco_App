export const compiler = (elementosClasificados) => {
  const compiledImages = elementosClasificados.imgs.map( img => {
    const relation = elementosClasificados.relations
      .find(relation=> relation.source === img.id );
    const properties = elementosClasificados.styles
      .find(style => style.id === relation.target );

    return {
      content: properties.value,
      id: img.id
    }
  })

  return{
    tamano: elementosClasificados.tamano,
    imgs: compiledImages,
    texts: elementosClasificados.texts
  }
}

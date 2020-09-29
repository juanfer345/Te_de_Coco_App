import React from "react";
import {Image} from "../Components/Image";
import {Text} from "../Components/Text";

export const generarComponentes = (styledElements) => {
  const elements = styledElements.texts.concat(styledElements.images)
  elements.sort((a,b) => a.id - b.id)

  const returnProperElement = (elem) => {
    if (elem.text) { 
      //text
      return (<Text style = {elem.style} text = {elem.text}/>)
    }
    else if (elem.style) {
      const srcProperty = elem.style
        .filter(property => property.src)
        .map(property => property.src)

      const sizeProperty = elem.style
        .filter(property => property.size)
        .map(property => property.size)
      return (<Image src = {srcProperty} style = {sizeProperty[0]}/>)
    }
  }

  return (
    <div>
      <div style = 
          {{
            width: parseInt(styledElements.tamano.pageWidth, 10), 
            height: parseInt(styledElements.tamano.pageHeight,  10),
            border: '1px black solid', 
            marginTop:'100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '100px'
          }}>
        {elements.map(elem => returnProperElement(elem))}
      </div>
    </div>
  )
}
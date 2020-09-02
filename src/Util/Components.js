import React from "react";
import {Image} from "../Components/Image";
import {Text} from "../Components/Text";

export const generateComponents = (styledElements) => {
  const elements = styledElements.texts.concat(styledElements.images)
  elements.sort((a, b)=>a.id - b.id)
  // console.log(elements)


  const returnProperElement = (elem) => {
    if(elem.text){ //text
      return (<Text style={elem.style} text={elem.text} /> )
    } else {
      const srcProperty = elem.style
        .filter(property => property.src)
        .map(property => property.src)

      const sizeProperty = elem.style
        .filter(property => property.size)
        .map(property => property.size)
      return (<Image src={srcProperty} style={sizeProperty[0]}/>)
    }
  }

  return (
    <div>
      {elements.map(elem => returnProperElement(elem))}
    </div>
  )
}

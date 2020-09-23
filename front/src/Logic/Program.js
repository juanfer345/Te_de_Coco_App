import React from 'react'
import {parseCSS} from "../Util/CSS";
import {compiler} from "../Util/Compiler";
import {generarComponentes} from "../Util/Components";

export const Program = ({elements}) => {
  console.log(elements)
  return(
    <div>
      {generarComponentes(parseCSS(compiler(elements)))}
    </div>
  )
}

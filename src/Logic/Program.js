import React from 'react'
import {parseCSS} from "../Util/CSS";
import {compiler} from "../Util/Compiler";
import {generateComponents} from "../Util/Components";

export const Program = ({elements}) => {
  return(
    <div>
      {generateComponents(parseCSS(compiler(elements)))}
    </div>
  )
}

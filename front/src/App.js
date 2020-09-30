import React, {useState} from 'react';
import {UploadFile} from "./Logic/UploadFile";
import {Program} from './Logic/Program';
import {ContenedorFormularios} from './Components/ContenedorFormularios'
import {PaginaPrincipal} from "./Components/PaginaPrincipal";
export const App = () => {
  const [elements, setElements] = useState(null)
  const [formulariosTerminados, setFormulariosTerminados] = useState(false)

  const onElementsParsed = (elements) => {
    setElements(elements)
  }

  const enFormulariosTerminados = () => {
    setFormulariosTerminados(true)
  }

  const jsxUploadElements = (
    <div>
      <UploadFile onElementsParsed = {onElementsParsed}/>
    </div> 
  )
  // debug
  // return <ContenedorFormularios
  //   propiedadesComida={['1234']}
  //   propiedadesRestaurante={['1234']}
  //   enFormulariosTerminados={enFormulariosTerminados}
  // />

  if (!elements) {
    return jsxUploadElements;
  }
  else if (!formulariosTerminados) {
    return <ContenedorFormularios
      propiedadesComida={elements.propiedadesComida}
      propiedadesRestaurante={elements.propiedadesTienda}
      enFormulariosTerminados={enFormulariosTerminados}
    />
  } else {
    return <PaginaPrincipal />
  }
}

export default App;

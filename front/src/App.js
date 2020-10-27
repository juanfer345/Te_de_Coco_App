import React, {useState} from 'react';
import {UploadFile} from "./Logic/UploadFile";
import {Program} from './Logic/Program';
import {ContenedorFormularios} from './Components/ContenedorFormularios'
import {PaginaPrincipal} from "./Components/PaginaPrincipal";
import {Login} from "./Components/Login";
export const App = () => {
  const [elements, setElements] = useState(null)
  const [estado, setEstado] = useState('login')
  const [usuarios, setUsuarios] = useState(null)

  const onElementsParsed = (elements) => {
    setElements(elements)
    setUsuarios(['administrador', 'invitado'])
    setEstado('login')
  }

  switch (estado){
    case "login":
      //TODO usuarios son cargados desde la api si el aplicativo ya se ha creado
      return <Login setEstadoPadre={setEstado} usuarios={usuarios}/>
    case 'subirDiagrama':
      return <UploadFile onElementsParsed = {onElementsParsed}/>
    case 'conceptos':
      return <div>conceptos</div>
    case 'insertarConcepto':
      return <div>insertar concepto</div>
    default:
      return <div>error</div>
  }
}

export default App;

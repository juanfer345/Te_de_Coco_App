import React, {useState} from 'react';
import {UploadFile} from "./Logic/UploadFile";
import {Program} from './Logic/Program';
import {ContenedorFormularios} from './Components/ContenedorFormularios'
import {PaginaPrincipal} from "./Components/PaginaPrincipal";
import {Login} from "./Components/Login";
import {Conceptos} from "./Components/Conceptos";
import {InsertarConcepto} from "./Components/InsertarConcepto";
import {VerConcepto} from "./Components/verConcepto";
export const App = () => {
  const [estado, setEstado] = useState('login')
  const [usuarios, setUsuarios] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [concepto, setConcepto] = useState(null)
  const [conceptos, setConceptos] = useState(null)


  const onElementsParsed = async (elements) => {
    setConceptos(elements)
    setUsuarios(elements.map(concepto => Object.keys(concepto.permisos))
      .reduce((current, prev) => {
        current.forEach(value => {
          if(!prev.includes(value)){
            prev.push(value)
          }
        })
        return prev
      }, []))
    setEstado('login')
  }

  const onUsuarioSelected = (usuario) => {
    setUsuario(usuario)
    setEstado('conceptos')
  }

  switch (estado){
    case "login":
      //TODO usuarios son cargados desde la api si el aplicativo ya se ha creado
      return <Login setEstadoPadre={setEstado} usuarios={usuarios} enUsuarioSeleccionado={onUsuarioSelected} />
    case 'subirDiagrama':
      // if(conceptos){setEstado('login');break;}
      return <UploadFile onElementsParsed = {onElementsParsed}/>
    case 'conceptos':
      return <Conceptos setConcepto={setConcepto} conceptos={conceptos} usuario={usuario} setEstado={setEstado} />
    case 'insertarConcepto':
      return <InsertarConcepto campos={concepto.tiene} nombre={concepto.concepto} setEstadoPadre={setEstado} />
    case 'verConcepto':
      return <VerConcepto nombre={concepto.concepto} setEstadoPadre={setEstado}/>
    default:
      return <div>error estado '{estado}' no valido</div>
  }
}

export default App;

import React, {useEffect, useState} from 'react';
import {UploadFile} from "./Logic/UploadFile";
import {Login} from "./Components/Login";
import {Conceptos} from "./Components/Conceptos";
import {InsertarConcepto} from "./Components/InsertarConcepto";
import {VerConcepto} from "./Components/verConcepto";
import {guardarAplicativo, obtenerAplicativo} from "./Util/Conexion";
export const App = () => {
  const [estado, setEstado] = useState('ready')
  const [usuarios, setUsuarios] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [concepto, setConcepto] = useState(null)
  const [conceptos, setConceptos] = useState(null)
  const [codigo, setCodigo] = useState(null)

  const cargarAplicativo = (conceptos, setConceptos, setUsuarios) => {
    setConceptos(conceptos)
    console.log(conceptos)
    setUsuarios(conceptos.map(concepto => Object.keys(concepto.permisos))
      .reduce((current, prev) => {
        current.forEach(value => {
          if(!prev.includes(value)){
            prev.push(value)
          }
        })
        return prev
      }, []))
  }

  const onElementsParsed = async (elements) => {
    cargarAplicativo(elements, setConceptos, setUsuarios)
    const temp = Number.parseInt(Math.random()*5000)
    setCodigo(temp)
    guardarAplicativo(elements, temp)
    setEstado('login')
  }

  const onUsuarioSelected = (usuario) => {
    setUsuario(usuario)
    setEstado('conceptos')
  }

  useEffect(() => {
    if(estado === 'ready'){
      const codigo = document.location.toString().split('/')[3]
      if (codigo)
        obtenerAplicativo(codigo)
          .then(aplicativo => {
            let keys = Object.keys(aplicativo[0]).filter(key => Number.isInteger(parseInt(key)))
            let elements = keys.map(key => aplicativo[0][key])
            console.log(elements)
            cargarAplicativo(elements, setConceptos, setUsuarios);
            setEstado('login');
          })
          .catch(()=> setEstado('subirDiagrama'))
      else
        setEstado('subirDiagrama')
    }
  })

  switch (estado){
    case 'ready':
      return <></>
    case "login":
      //TODO usuarios son cargados desde la api si el aplicativo ya se ha creado
      return <Login setEstadoPadre={setEstado} usuarios={usuarios} enUsuarioSeleccionado={onUsuarioSelected} codigo={codigo} />
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

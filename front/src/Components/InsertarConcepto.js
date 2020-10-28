import React, {useState} from 'react'
import {guardarConcepto} from "../Util/Conexion";
import {InputInformacion} from "./InputInformacion";

export const InsertarConcepto = ({campos, nombre, setEstadoPadre}) => {
  let [informacion, setInformacion] = useState({})
  const [mensaje, setMensaje] = useState('')

  const enCampoCambiado = (campo, valor) => {
    let propiedad = {}
    propiedad[campo] = valor
    setInformacion(Object.assign(informacion, propiedad))
  }

  const camposInput = campos.map(campo => <
    InputInformacion
      campo={campo}
      enCampoCambiado={enCampoCambiado}
  />)



  return (
    <div className='container'>
      <div className='row m-2'>
        <div className='h2 mr-5'>
          Formulario {nombre}
        </div>
        <a
          className='btn btn-primary h2'
          onClick={(event => {
            setEstadoPadre('conceptos')
          })}
        >Terminar</a>

      </div>
      {camposInput}
      <a className='btn btn-primary mr-5'
           onClick={event => {
             event.preventDefault()
             setMensaje('Cargando...')
             guardarConcepto(informacion, nombre)
               .then(() => setMensaje('Guardado'))
               .catch(() => setMensaje('Error al guardar'))
           }
         }
      >Guardar Informacion</a>
      {mensaje}
    </div>
  )
}

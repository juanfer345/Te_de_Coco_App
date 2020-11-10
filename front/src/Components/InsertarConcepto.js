import React, { useState } from 'react'
import {actualizarConcepto, guardarConcepto} from "../Util/Conexion";
import { InputInformacion } from "./InputInformacion";

export const InsertarConcepto = ({ campos, nombre, setEstadoPadre, codigo, estadoPadre, id}) => {
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
          if(estadoPadre === 'insertarConcepto') {
            guardarConcepto(informacion, nombre, codigo)
              .then(() => setMensaje('Guardado'))
              .catch(() => setMensaje('Error al guardar'))
          } else if (estadoPadre === 'actualizarConcepto'){
            actualizarConcepto(id,informacion)
              .then(() => setMensaje('Guardado'))
              .catch(() => setMensaje('Error al guardar'))
          }
        }
        }
      >Guardar Informacion</a>
      {mensaje}
    </div>
  )
}

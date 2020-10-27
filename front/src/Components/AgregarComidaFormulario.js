import React, {useState} from 'react'
import {InputComida} from './InputComida'
import {agregarPlato} from "../Util/Conexion";

export const AgregarComidaFormulario = ({campos, terminarFormulariosComida}) => {
  let [comida, setComida] = useState({})
  let [numeroFormulario, setNumeroFormulario] = useState(1)


  const enCampoCambiado = (campo, valor) => {
    let propiedad = {}
    propiedad[campo] = valor
    setComida(Object.assign(comida, propiedad))
  }

  const enAgregarClick = (evento) => {
    evento.preventDefault()
    agregarPlato(comida)
    setNumeroFormulario(++numeroFormulario)
  }
  const componenteCampos = campos.map(campo => <InputComida nombre={campo} enCampoCambiado={enCampoCambiado} numeroFormulario={numeroFormulario} /> )

  return (
    <div className='container'>
      <div className='row'>
        <div className='h2'>
          Formulario Informacion de un Plato
        </div>

      </div>
      <div>
        {componenteCampos}
      </div>
      <a
        className='btn btn-primary mr-5'
        onClick={enAgregarClick}>Agregar</a>
      <a
        className='btn btn-primary'
        onClick={terminarFormulariosComida}>Terminar</a>
    </div>
  )
}

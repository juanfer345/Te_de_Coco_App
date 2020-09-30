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



  const componenteCampos = campos.map( campo => <InputComida nombre={campo} enCampoCambiado={enCampoCambiado} numeroFormulario={numeroFormulario} /> )

  return (
    <div>
      Formulario Campos
      <div>
        {componenteCampos}
      </div>
      <button onClick={enAgregarClick}>Agregar</button>
      <button onClick={terminarFormulariosComida}>Terminar</button>
    </div>
  )
}

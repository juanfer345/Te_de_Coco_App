import React, { useState } from 'react'

export const InputComida = ({ nombre, enCampoCambiado, numeroFormulario }) => {
  let [formularioActual, setFormularioActual] = useState(numeroFormulario)
  let [valor, setValor] = useState('')

  const enValorCambiado = (event) => {
    event.preventDefault();
    setValor(event.target.value)
    enCampoCambiado(nombre, event.target.value)
  }

  if (numeroFormulario !== formularioActual) {
    setValor('')
    setFormularioActual(numeroFormulario)
  }

  return (
    <div className='row'>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{nombre}</span>
        </div>
        <input
          type='text'
          className="form-control"
          id={nombre}
          value={valor}
          onChange={enValorCambiado}
        />
      </div>
    </div>
  )
}

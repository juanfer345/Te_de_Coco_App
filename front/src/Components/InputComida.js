import React, {useState} from 'react'

export const InputComida = ({nombre, enCampoCambiado, numeroFormulario}) => {
  let [formularioActual, setFormularioActual] = useState(numeroFormulario)
  let [valor, setValor] = useState('')

  const enValorCambiado = ( event ) => {
    event.preventDefault();
    setValor(event.target.value)
    enCampoCambiado(nombre, event.target.value)
  }

  if (numeroFormulario !== formularioActual){
    setValor('')
    setFormularioActual(numeroFormulario)
  }

  return (
    <div>
      <label
        htmlFor={nombre}
      >
        {nombre}
      </label>
      <input
        id={nombre}
        value={valor}
        onChange={enValorCambiado}
      />
    </div>
  )
}

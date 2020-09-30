import React, {useState} from 'react'
import {InputInformacion} from "./InputInformacion";
import {agregarInformacion} from "../Util/Conexion";


export const InformacionRestauranteFormulario = ({campos, enFormularioTerminado}) => {
  let [informacion, setInformacion] = useState({})

  const enCampoCambiado = (campo, valor) => {
    let propiedad = {}
    propiedad[campo] = valor
    setInformacion(Object.assign(informacion, propiedad))
  }

  const camposInput = campos.map(campo => <InputInformacion campo={campo} enCampoCambiado={enCampoCambiado} />)

  return (
    <div>
      Formulario Informacion Restaurante
      {camposInput}
      <button
        onClick={event => {
            event.preventDefault()
            enFormularioTerminado()
            agregarInformacion(informacion)
          }
        }
      >Guardar Informacion</button>
    </div>
  )
}

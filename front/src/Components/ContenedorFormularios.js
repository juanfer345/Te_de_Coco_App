import React, {useState} from 'react'
import {AgregarComidaFormulario} from "./AgregarComidaFormulario";
import {InformacionRestauranteFormulario} from "./InformacionRestauranteFormulario";

export const ContenedorFormularios = ({propiedadesComida, propiedadesRestaurante, enFormulariosTerminados}) => {
  let [formularioRestauranteTerminado, setFormularioRestauranteTerminado] = useState(false) //
  let [formularioComidaTerminado, setFormularioComidaTermiando] = useState(false) //

  const enFormularioRestauranteTerminado = () => {
    setFormularioRestauranteTerminado(true)
  }

  const enFormularioComidaTerminado = () => {
    setFormularioComidaTermiando(true)
  }

  if (formularioRestauranteTerminado && formularioComidaTerminado) {
    enFormulariosTerminados()
  }

  if (!formularioRestauranteTerminado) {
    return <InformacionRestauranteFormulario campos = {propiedadesRestaurante} enFormularioTerminado = {enFormularioRestauranteTerminado} />
  } 
  else if (!formularioComidaTerminado){
    return <AgregarComidaFormulario campos = {propiedadesComida} terminarFormulariosComida = {enFormularioComidaTerminado} />
  } 
  else {
    return <div>Cargando ...</div>
  }
  return (
    <div>
      <AgregarComidaFormulario campos={propiedadesComida} />
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import { obtenerConceptos } from "../Util/Conexion";

export const VerConcepto = ({ nombre, setEstadoPadre }) => {
  const [datos, setDatos] = useState(null)
  const [estado, setEstado] = useState('listo')

  useEffect(() => {
    if (estado === 'listo') {
      setEstado('cargando')
      obtenerConceptos(nombre)
        .then((respuesta) => { console.log(respuesta); setDatos(respuesta); setEstado('cargado') })
    }
  })

  const Propiedad = ({ clave, valor }) => {
    return (
      <div className='col-12'>
        <span className='font-weight-bolder'>
          {clave}:
        </span>
        {valor}
      </div>
    )
  }

  switch (estado) {
    case "listo":
      return <></>
    case 'cargando':
      return <div>cargando</div>
    case 'cargado':
      return <div className='container'>
        <div className='h3'>
          Valores en concepto {nombre}
        </div>
        {datos?.map(dato => {
          return Object.getOwnPropertyNames(dato).map(propiedad =>
            <Propiedad clave={propiedad} valor={dato[propiedad]} />)
        })}
        <button
          className='btn btn-primary'
          onClick={() => { setEstadoPadre('conceptos') }}
        >
          Volver
        </button>
      </div>
  }
}
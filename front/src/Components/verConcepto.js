import React, { useEffect, useState } from 'react'
import { obtenerConceptos } from "../Util/Conexion";

export const VerConcepto = ({ nombre, setEstadoPadre, codigo }) => {
  const [datos, setDatos] = useState(null)
  const [estado, setEstado] = useState('listo')

  useEffect(() => {
    if (estado === 'listo') {
      setEstado('cargando')
      obtenerConceptos(nombre, codigo)
        .then((respuesta) => { console.log(respuesta); setDatos(respuesta); setEstado('cargado') })
    }
  })

  const Propiedad = ({ clave, valor }) => {
    if(clave === '_id' || clave === 'concepto' || clave === '_codigo' || clave === '__v') return <></>
    return (
      <div className=' col-4'>
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
        <div className='row'>

          {datos?.map(dato => {
            return <div className='card col-6 pb-2'>
              {Object.getOwnPropertyNames(dato).map(propiedad =>
              <Propiedad clave={propiedad} valor={dato[propiedad]} />)}
            </div>
          })}

        </div>

        <button
          className='btn btn-primary'
          onClick={() => { setEstadoPadre('conceptos') }}
        >
          Volver
        </button>
      </div>
  }
}

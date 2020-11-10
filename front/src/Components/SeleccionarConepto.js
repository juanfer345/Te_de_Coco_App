import React, {useEffect, useState} from 'react'
import {eliminarConcepto, obtenerConceptos} from "../Util/Conexion";

export const SeleccionarConcepto = ({nombre , codigo , setEstadoPadre, estadoPadre, setConcepto}) => {
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState(null);
  const [estado, setEstado] = useState('listo')
  const [datos, setDatos] = useState(null)

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
      <div className='col-12'>
        <span className='font-weight-bolder'>
          {clave}:
        </span>
        {valor}
      </div>
    )
  }

  const Concepto = ({campos}) => {
    const id = useState(campos['_id'])[0]
    return (
      <div className={`card ${conceptoSeleccionado === id?'bg-warning':''} col-3`}
        onClick={()=>setConceptoSeleccionado(id)}
        type='button'
      >
        {datos?.map(dato => {
          return Object.getOwnPropertyNames(dato).map(propiedad =>
            <Propiedad clave={propiedad} valor={dato[propiedad]} />)
        })}
      </div>
    )
  }

  const ProperButton = () => {
    if(estadoPadre === 'actualizarConceptoSeleccionar'){
      return (
        <div
          className={`btn btn-primary ${conceptoSeleccionado?'':'disabled'}`}
          onClick={() => {
            if(conceptoSeleccionado) {
              setConcepto(conceptoSeleccionado)
              setEstadoPadre('actualizarConcepto')
            }
          }}
        >
          Seleccionar
        </div>
      )
    }
    if(estadoPadre === 'eliminarConcepto'){
      return (
        <div
          className={`btn btn-danger ${conceptoSeleccionado?'':'disabled'}`}
          onClick={async ()=> {
            if (conceptoSeleccionado)
              await eliminarConcepto(conceptoSeleccionado)
              setEstado('listo')
            }
          }
        >
          Eliminar
        </div>
      )
    }
  }

  const Page = ({body}) => {
    return (
      <div className='container'>
        <div className='row m-2'>
          <div className='col-2'>
            <div
              className='btn btn-primary'
              type='button'
              onClick={()=>setEstadoPadre('conceptos')}
            >
              Volver
            </div>
          </div>
          <div className='col h2'>
            Seleccionar un Concepto
          </div>
        </div>
        <div className='row m-2'>
          {body}
        </div>
        <div className='row'>
          <ProperButton />
        </div>
      </div>
    )
  }


  switch (estado){
    case "listo":
      return <div></div>
    case 'cargando':
      return <div>cargando</div>
    case 'cargado':
      return <Page body={
        datos.map(dato => <Concepto campos={dato}/>)
      } />
  }

}

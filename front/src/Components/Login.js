import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const Login = ({setEstadoPadre, usuarios, enUsuarioSeleccionado}) => {
  const [estado, setEstado] = useState('creado')

  /**
   * Fetches the users avaiable for an application code
   * @param code
   * @return {Promise<unknown>}
   */
  const cargarUsuarios = (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if(usuarios)
          resolve()
        reject()
      },500)
    });
  }

  useEffect(() => {
    if(estado === 'creado' ){
      setEstado('cargando')
      cargarUsuarios()
         .then(users => {setEstado('completado')})
         .catch(error => {setEstado('error')})
    }
    if(estado === 'error')
      setEstadoPadre('subirDiagrama')
  });

  const Usuario = ({nombre}) => {
    return (
      <div className='col-6 justify-content-center d-flex p-5'>
        <div className='card w-100 h-100' >
          <div className='card-header'>
            {nombre}
          </div>
          <div className='card-body'>
            <div
              type='button'
              className='btn btn-primary'
              onClick={(event)=> {
                event.preventDefault()
                enUsuarioSeleccionado(nombre)
              }}
            >
              Entrar
            </div>
          </div>

        </div>
      </div>

    )
  }

  const Page = ({body}) => {
    return (
      <div className='bg-dark'>
        <div className='container'>
          <div className='row vh-100 align-content-center justify-content-center d-flex '>
            {body}
          </div>
        </div>
      </div>
    )
  }

  switch (estado){
    case "creado":
      return (<></>)
    case 'cargando':
      return <Page body={<div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>} />
    case 'error':
      return <Page body={<div>No hay usuarios cargados para este diagrama</div>} />
    case 'completado':
      return  <Page body={
        <>
          <div className='col-12 bg-light card'>
            Link para compartir:
          </div>

          {usuarios.map(usuairo => <Usuario nombre={usuairo} /> )}
        </>

      } />
    default:
      return <div>error</div>
  }
}

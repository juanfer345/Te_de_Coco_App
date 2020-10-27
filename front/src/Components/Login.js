import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const Login = ({setEstadoPadre, usuarios}) => {
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
      },2000)
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

  const Usuario = ({nombre, enUsuarioOprimido}) => {
    return (
      <div className='col-6 border justify-content-center d-flex'>
        <div>
          {nombre}
        </div>
        <div
          type='button'

        >
          Entrar
        </div>
      </div>
    )
  }

  const Page = ({body}) => {
    return (
      <div className='container'>
        <div className='row vh-100 align-content-center justify-content-center d-flex '>
          {body}
        </div>
      </div>
    )
  }

  switch (estado){
    case "creado":
      return (<></>)
    case 'cargando':
      return <Page body={<div>Cargando...</div>} />
    case 'error':
      return <Page body={<div>No hay usuarios cargados para este diagrama</div>} />
    case 'completado':
      return  <Page body={usuarios.map(usuairo => <Usuario nombre={usuairo} /> )} />
    default:
      return <div>error</div>
  }
}

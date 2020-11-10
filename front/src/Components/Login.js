import React from 'react'

export const Login = ({ usuarios, enUsuarioSeleccionado, codigo }) => {

  const Usuario = ({ nombre }) => {
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
              onClick={(event) => {
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

  const Page = ({ body }) => {
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

  const linkCompartir = () => {
    if (codigo) {
      return document.location.toString() + codigo
    } else {
      return document.location.toString()
    }
  }

  if (usuarios) {
    return <Page body={
      <>
        <div className='col-12 bg-light card'>
          Link para compartir:
          <a href={linkCompartir()}>
            {linkCompartir()}
          </a>
        </div>

        {usuarios.map(usuairo => <Usuario nombre={usuairo} />)}
      </>
    } />
  } else {
    return <Page body={<div>No hay usuarios cargados para este diagrama</div>} />

  }
}

import React from 'react'

export const Conceptos = ({ conceptos, usuario, setEstado, setConcepto }) => {
  const navegarA = (estado, concepto) => {
    switch (estado) {
      case 'insertarConcepto':
        setConcepto(concepto)
        setEstado('insertarConcepto')
        break;
      case 'verConcepto':
        setConcepto(concepto)
        setEstado('verConcepto')
        break;
      case 'login':
        setEstado('login')
        break;
      case 'eliminarConcepto':
        setConcepto(concepto)
        setEstado('eliminarConcepto')
        break;
      case 'actualizarConceptoSeleccionar':
        setConcepto(concepto)
        setEstado('actualizarConceptoSeleccionar')
    }
  }

  const Boton = ({ concepto, label, usuario, onClick }) => {
    console.log(concepto.permisos)
    console.log(usuario)
    if (concepto.permisos[usuario]?.includes(label)) {
      return (
        <div className={`btn btn-primary`}
          onClick={onClick}
        >
          {label}
        </div>
      )
    } else {
      return (
        <button className={`btn btn-primary`}
          disabled
        >
          {label}
        </button>
      )
    }
  }

  const Concepto = ({ concepto, usuario }) => {
    const properties = [{ name: 'Insertar', action: 'insertarConcepto' },
    { name: 'Actualizar', action: 'actualizarConceptoSeleccionar' },
    { name: 'Borrar', action: 'eliminarConcepto' },
    { name: 'Ver', action: 'verConcepto' }]

    const buttons = properties.map(property => {
      return (
        <div className='col'>
          <Boton
            onClick={(event) => { navegarA(property.action, concepto) }}
            concepto={concepto}
            usuario={usuario}
            label={property.name}
          />
        </div>

      )
    })

    return (
      <div className='row m-3 border-bottom pb-3'>
        <div className='col-4 h5'>
          {concepto.concepto}
        </div>
        {buttons}
      </div>
    )
  }

  return (
    <div className='container p-5'>
      <div className='row h2'>
        <div className='col-2'>
          <div
            className='btn btn-primary'
            type='button'
            onClick={()=>navegarA('login')}
          >
            Volver
          </div>
        </div>
        <div >
          Conceptos
        </div>
      </div>
      {conceptos.map((concepto) => {
        return (
          <Concepto concepto={concepto} usuario={usuario} />
        )
      })
      }
    </div>
  )
}

import React from 'react'

export const Conceptos = ({conceptos, usuario, setEstado, setConcepto}) => {
  const navegarA = (estado, concepto) => {
    switch (estado){
      case 'insertarConcepto':
        setConcepto(concepto)
        setEstado('insertarConcepto')
        break;
      case 'verConcepto':
        setConcepto(concepto)
        setEstado('verConcepto')
        break;

    }
  }

  const Boton = ({concepto, label, usuario, onClick}) => {
    console.log(concepto.permisos)
    console.log(usuario)
    if(concepto.permisos[usuario]?.includes(label)){
      return(
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

  const Concepto = ({concepto, usuario}) => {
    const properties = [{name:'Insertar', action:'insertarConcepto'},
      {name:'Actualizar', action:'insertarConcepto'},
      {name:'Borrar', action:'insertarConcepto'},
      {name:'Ver', action:'verConcepto'}]

    const buttons = properties.map(property => {
      return (
        <div className='col'>
          <Boton
            onClick={(event) => {navegarA(property.action, concepto)}}
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
        Conceptos
      </div>
      {conceptos.map((concepto) => {
        return(
          <Concepto concepto={concepto} usuario={usuario}/>
        )
        })
      }
    </div>
  )
}

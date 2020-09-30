import React from 'react'

export const InputInformacion = ({campo, enCampoCambiado}) => {

  return (
    <div className='row'>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{campo}</span>
        </div>
        <input
          type='text'
          className="form-control"
          id={campo}
          onChange={event => {
            event.preventDefault();
            enCampoCambiado(campo, event.target.value)
          }
          }
        />
      </div>
    </div>
  )
}

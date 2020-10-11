import React from 'react'

export const InputInformacion = ({campo, enCampoCambiado}) => {

  return (
    <div>
      <label
        htmlFor = {campo}
      >
        {campo}
      </label>
      <input
        id = {campo}
        onChange = {event => {
            event.preventDefault();
            enCampoCambiado(campo, event.target.value)
          }
        }
      />
    </div>
  )
}
// import React, {useState} from 'react'
// import {InputInformacion} from "./InputInformacion";
// import {agregarInformacion} from "../Util/Conexion";
//
//
// export const InformacionRestauranteFormulario = ({campos, enFormularioTerminado}) => {
//   let [informacion, setInformacion] = useState({})
//
//   const enCampoCambiado = (campo, valor) => {
//     let propiedad = {}
//     propiedad[campo] = valor
//     setInformacion(Object.assign(informacion, propiedad))
//   }
//
//   const camposInput = campos.map(campo => <InputInformacion campo={campo} enCampoCambiado={enCampoCambiado} />)
//
//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='h2'>
//           Formulario Informacion Restaurante
//         </div>
//
//       </div>
//       {camposInput}
//       <a className='btn btn-primary'
//         onClick={event => {
//             event.preventDefault()
//             enFormularioTerminado()
//             agregarInformacion(informacion)
//           }
//         }
//       >Guardar Informacion</a>
//     </div>
//   )
// }

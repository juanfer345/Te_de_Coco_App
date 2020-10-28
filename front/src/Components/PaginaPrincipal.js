// import React, {useState} from 'react'
//
// /**
//  * @author Juan David Mejia Ardila
//  * Renderiza la pagina principal del programa
//  *
//  * @return {JSX.Element}
//  * @constructor
//  */
// export const PaginaPrincipal = () => {
//   let [comidas, setComidas] = useState([]) //array de comidas en el servidor
//   let [informacion, setInformacion] = useState({}) //array de
//   let [estadoComidas, setEstadoComidas] = useState('vacio') // estado en el que se encuentra la carga de las comidas
//   let [estadoInformacion, setEstadoInformacion] = useState('vacio') // estado en el que se encuentra la carga de la informacion del restaurante
//
//
//   /*
//    * Funciones que empiezan a cargar los datos
//    * del servidor una vez se carga esta pagina
//    */
//   const cargarComidas = async () => {
//     let comidasCargadas
//     try{
//        comidasCargadas = await obtenerPlatos()
//     } catch (e) {
//       setEstadoComidas('error')
//     }
//     setComidas(comidasCargadas)
//     setEstadoComidas('cargado')
//   }
//
//   const cargarPropiedades = async () => {
//     let propiedadesCargadas
//     try{
//       propiedadesCargadas = await obtenerInformacion()
//     } catch (e) {
//       setEstadoInformacion('error')
//     }
//     setInformacion(propiedadesCargadas)
//     setEstadoInformacion('cargado')
//   }
//
//   if(estadoComidas === 'vacio'){
//     cargarComidas()
//     setEstadoComidas('cargando')
//   }
//   if(estadoInformacion === 'vacio'){
//     cargarPropiedades()
//     setEstadoInformacion('cargando')
//   }
//
//   const Propiedad = ({clave, valor}) => {
//     return (
//       <div className='col-12'>
//         <span className='font-weight-bolder'>
//           {clave}:
//         </span>
//         {valor}
//       </div>
//     )
//   }
//   return (
//     <div>
//       <nav className='navbar bg-dark'>
//
//           <div className='h3 text-light'>
//             admin
//           </div>
//           <a
//             className='btn btn-light'
//           >
//             Editar Comidas
//           </a>
//
//       </nav>
//
//         <div className='row'>
//           <div className='col-3 h4'>
//             Estado Comidas
//           </div>
//           <div className='col-3'>
//             {(estadoComidas==='cargando')?
//               <div className="spinner-border text-primary" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//               : <div>Cargado</div>}
//           </div>
//         </div>
//         <div className='row'>
//           <div className='col-3 h4'>
//             Estado Informacion
//           </div>
//           <div className='col-3'>
//             {(estadoInformacion==='cargando')?
//               <div className="spinner-border text-primary" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//               : <div>Cargado</div>}
//           </div>
//         </div>
//         <div className='border'>
//           <div className='h2 font-weight-bold'>
//             informacion restaurante
//           </div>
//           {(() => {
//             let propiedades = []
//             for (let propiedad in informacion){
//               propiedades.push(<Propiedad clave={propiedad} valor={informacion[propiedad]} /> )
//             }
//             return propiedades
//           })()
//           }
//         </div>
//         <div>
//           <div className='h2 font-weight-bold'>
//             Listado de Comidas
//           </div>
//           {comidas.map(comida => {
//             let propiedades = []
//             for (let propiedad in comida){
//               propiedades.push(<Propiedad clave={propiedad} valor={comida[propiedad]} /> )
//             }
//             return <div claassName='border'>
//               {propiedades}
//             </div>
//           })}
//         </div>
//       </div>
//   )
// }

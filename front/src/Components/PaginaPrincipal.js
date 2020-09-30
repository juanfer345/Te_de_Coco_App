import React, {useState} from 'react'
import {obtenerInformacion, obtenerPlatos} from "../Util/Conexion";

/**
 * @author Juan David Mejia Ardila
 * Renderiza la paina principal del programa
 *
 * @return {JSX.Element}
 * @constructor
 */
export const PaginaPrincipal = () => {
  let [comidas, setComidas] = useState([]) //array de comidas en el servidor
  let [informacion, setInformacion] = useState({}) //array de
  let [estadoComidas, setEstadoComidas] = useState('vacio') // estado en el que se encuentra la carga de las comidas
  let [estadoInformacion, setEstadoInformacion] = useState('vacio') // estado en el que se encuentra la carga de la informacion del restaurante


  /*
   * Funciones que empiezan a cargar los datos
   * del servidor una vez se carga esta pagina
   */
  const cargarComidas = async () => {
    let comidasCargadas
    try{
       comidasCargadas = await obtenerPlatos()
    } catch (e) {
      setEstadoComidas('error')
    }
    setComidas(comidasCargadas)
    setEstadoComidas('cargado')
  }

  const cargarPropiedades = async () => {
    let propiedadesCargadas
    try{
      propiedadesCargadas = await obtenerInformacion()
    } catch (e) {
      setEstadoInformacion('error')
    }
    setInformacion(propiedadesCargadas)
    setEstadoInformacion('cargado')
  }

  if(estadoComidas === 'vacio'){
    cargarComidas()
    setEstadoComidas('cargando')
  }
  if(estadoInformacion === 'vacio'){
    cargarPropiedades()
    setEstadoInformacion('cargando')
  }

  return (
    <div>
      <div>
        estado comidas: {estadoComidas}
      </div>
      <div>
        estado informacion: {estadoInformacion}
      </div>
      admin
      <button>
        editar comidas
      </button>
      <div>
        informacion restaurante
        {(() => {
          let string = ''
          for (let propiedad in informacion){
            string += propiedad + ':' + informacion[propiedad]
          }
          return <div>{string}</div>
        })()
        }
      </div>
      <div>
        listado de comidas
        {comidas.map(comida => {
          let string = ''
          for (let propiedad in comida){
            string += propiedad + ':' + comida[propiedad]
          }
          return <div>{string}</div>
        })}
      </div>
    </div>
  )
}

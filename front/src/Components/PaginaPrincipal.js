import React, { useState } from 'react'
import { obtenerInformacion, obtenerPlatos } from "../Util/Conexion";
import Draggable from 'react-draggable';

/**
 * @author Juan David Mejia Ardila
 * Renderiza la paina principal del programa
 *
 * @return {JSX.Element}
 * @constructor
 */
export const PaginaPrincipal = ({ elementos }) => {
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
    try {
      comidasCargadas = await obtenerPlatos()
    } catch (e) {
      setEstadoComidas('error')
    }
    setComidas(comidasCargadas)
    setEstadoComidas('cargado')
  }

  const cargarPropiedades = async () => {
    let propiedadesCargadas
    try {
      propiedadesCargadas = await obtenerInformacion()
    } catch (e) {
      setEstadoInformacion('error')
    }
    setInformacion(propiedadesCargadas)
    setEstadoInformacion('cargado')
  }

  if (estadoComidas === 'vacio') {
    cargarComidas()
    setEstadoComidas('cargando')
  }
  if (estadoInformacion === 'vacio') {
    cargarPropiedades()
    setEstadoInformacion('cargando')
  }

  // const returnProperElement = (elem) => {
  //   if (elem.text) { 
  //     //text
  //     return (<Text style = {elem.style} text = {elem.text}/>)
  //   }
  //   else if (elem.style) {
  //     const srcProperty = elem.style
  //       .filter(property => property.src)
  //       .map(property => property.src)

  //     const sizeProperty = elem.style
  //       .filter(property => property.size)
  //       .map(property => property.size)
  //     return (<Image src = {srcProperty} style = {sizeProperty[0]}/>)
  //   }
  // }

  // const reptiles = ["alligator", "snake", "lizard"];


  // return reptiles.map((reptile) => <Draggable><div>{reptile}</div></Draggable>);

  var vect = [];
  for (let propiedad in informacion) {
    if (propiedad != "_id" && propiedad != "__v") {
      vect.push(informacion[propiedad]);
    }
  }

  //style={{cursor: "pointer"}}
  vect = vect.map((hola) => <Draggable><div style={{cursor: "pointer"}}>{hola}</div></Draggable>);
  
  return (

    <div style=
      {{
        width: parseInt(elementos.tamano.pageWidth, 10),
        height: parseInt(elementos.tamano.pageHeight, 10),
        border: '1px black solid',
        marginTop: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '100px'
      }}>
      
      {vect}

      {/* 
      {people.filter(person => person.age < 60).map(filteredPerson => (
        <li>
          {filteredPerson.name}
        </li>
      ))} */}

      {/* {(() => {
          // let string = ''
          let vect = [];
          //  var counter = 0;
          for (let propiedad in informacion) {
            // string += propiedad + ':' + informacion[propiedad]
            if (propiedad != "_id" && propiedad != "__v") {
              vect.push( <div> {informacion[propiedad]} </div>);
              // asignarArrastracion(vect[counter]);
              // counter++;
            }
          }
          return vect;
        })()
        } */}

    </div>

    //    <div>
    //      estado comidas: {estadoComidas}
    //    </div>
    //    <div>
    //      estado informacion: {estadoInformacion}
    //    </div>
    //    admin
    //    <button>
    //      editar comidas
    //    </button>
    //     { informacion restaurante}
    //    <div>
    //      listado de comidas
    //      {comidas.map(comida => {
    //       let string = ''
    //       for (let propiedad in comida){
    //         string += propiedad + ':' + comida[propiedad]
    //       }
    //       return <div>{string}</div>
    //     })}
    //   </div>
  )
}
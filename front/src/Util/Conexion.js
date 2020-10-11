import axios from 'axios'

const apiUrl = 'http://localhost:3700/api/';

/**
 * @author Juan David Mejia Ardila 29-09-20
 * Hace un request de tipo POST para
 * agregar un plato con las propiedades dadas
 * @param plato - plato a ser agregado
 */
export const agregarPlato = async (plato) => {
  let objetoPost = {}
  for( let propiedad in plato ){
    objetoPost[propiedad] = plato[propiedad]
  }
  return await axios.post(
    apiUrl + 'save-food/',
    {
      ...objetoPost
    }
  )
}

/**
 * @author Juan David Mejia Ardila 29-09-20
 * Hace un request de tipo POST para
 * obtener todos los platos que hay en la
 * base de datos
 */
export const obtenerPlatos = async () => {
  const response = await axios.get(
    apiUrl + 'foods'
  )
  return response.data.foodReturn
}

/**
 * @author Juan David Mejia Ardila
 * Hace un request DELETE para borrar
 * un plato que tenga propiedad y esta sea
 * igual a valor
 * @param propiedad - nombre de la propiedad que cumple el plato
 * @param valor - valor que tiene la propiedad del plato
 */
export const borrarPlato = async (propiedad, plato) => {
  return await axios.delete(
    apiUrl + `food/`
  )
}

/**
 * @author Juan David Mejia Ardila
 * Hace un request POST para
 * agregar informacion de un restaurante
 * @param informacion - objeto que tiene campos de informacion
 */

export const agregarInformacion = async (informacion) => {
  return await axios.post(
    apiUrl + 'admin/features',
    {
      ...informacion
    }
  )
}

/**
 * @author Juan David Mejia Ardila
 * Hace un request GET para
 * obtener la informacion de un restaurante
 */
export const obtenerInformacion = async () => {
  const response = await axios.get(
    apiUrl + 'admin/features'
  )
  return response.data.featuredReturn[0]
}
import axios from 'axios'

const apiUrl = 'http://localhost:3700/api/';

/**
 * @author Juan David Mejia Ardila
 * Hace un request POST para
 */

export const guardarConcepto = async (informacionConcepto, nombreConcepto) => {
  return await axios.post(
    apiUrl + 'saveProduct',
    {
      concepto: nombreConcepto,
      ...informacionConcepto
    }
  )
}


/**
 * @author Juan David Mejia Ardila
 * Hace un request GET para obtener informacion guardad de un concepto
 */
export const obtenerConceptos = async (valorConcepto) => {
  const response = await axios.get(
    apiUrl + `product/concepto/${valorConcepto}`
  )
  return response.data.Product
}
export const obtenerAplicativo = async (codigo) => {
  const response = await axios.get(
    apiUrl + `product/aplicativo/${codigo}`
  )
  return response.data.Product
}


export const guardarAplicativo = async (aplicativo, id) => {
  return await axios.post(
    apiUrl + 'saveProduct',
    {
      aplicativo: id,
      ...aplicativo
    }
  )
}

import {agregarPlato,
  obtenerPlatos,
  borrarPlato,
  agregarInformacion,
  obtenerInformacion } from '../Util/Conexion'

let plato = {
  prop1:'si',
  prop2:'no'
}

test('save-food post', async () => {
  let response = {
    _id: expect.any(String),
    __v: expect.any(Number)
  }
  response = Object.assign(response,plato)
  const platoAgregado = await agregarPlato(plato)
  expect(platoAgregado.data.food).toEqual(response)
})

test('getPlato post', async () => {
  let response = [{
    _id:expect.any(String),
    __v:expect.any(Number),
    ...plato
  }]
  const platos = await obtenerPlatos()
  expect(platos.data.foodReturn).toMatchObject(response)
})

test('borrar plato', async () => {
  const platoEliminado = await borrarPlato('prop1', plato.prop1)
  let response = {
    _id:expect.any(String),
    __v:expect.any(Number)
  }
  Object.assign(response,plato)
  expect(platoEliminado.data.foodRemoved).toMatch(response)
})

test('get y post informacion restaurante',async () => {
  let informacion = {
    nombre:'el nombre'
  }
  await agregarInformacion(informacion)
  const informacionObtenida = await obtenerInformacion()
  expect(informacionObtenida.data.featuredReturn[0]).toMatchObject(informacion)
})

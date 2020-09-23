import {classifyElements} from "../Util/Clasificador";

test('sin elementos para clasificar', async () => {
  const result = await classifyElements({})
  expect(result).toBeNull()
})

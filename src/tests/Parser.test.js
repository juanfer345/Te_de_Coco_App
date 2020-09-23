import {classifyElements} from "../Util/Parser";

test('sin elementos para clasificar', async () => {
  const result = await classifyElements({})
  expect(result).toBeNull()
})

import { utils } from './index'
import memoize from 'memoize-one'


function serializeData(data) {
  return data.map((el, i) => ({
    ...el,
    _props: {
      id: utils.generateID(),
      position: i % 2 === 0 ? 'even' : 'odd'
    }
  }))
}

export const getSerializedData = memoize((data) => {
  return serializeData(data)
})

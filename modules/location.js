import methods from './methods'
import {Observable} from 'rxjs/Observable'
import {map} from 'rxjs/operator/map'
import {publishReplay} from 'rxjs/operator/publishReplay'
import pick from 'lodash/pick'
import nestedGet from './nestedGet'

const locationProperties = [
  'pathname',
  'search',
  'state',
  'action',
  'key'
]

export default function location(history) {
  if (!history || !history.listen || !history.push || !history.getCurrentLocation) {
    throw new Error('History 3 required e.g. https://github.com/mjackson/history')
  }

  const location$ = Observable.create(observer => {
    observer.next(history.getCurrentLocation())
    return history.listen(::observer.next)
  })
    ::publishReplay(1).refCount()

  return methods({
    // Allow nested gets.
    OBSERVE: ({path}) =>
      location$::map(l => nestedGet(l, path)),
    PUSH: ({params}) => {
      history.push(pick(params, locationProperties))
      return Promise.resolve()
    },
    REPLACE: ({params}) => {
      history.replace(pick(params, locationProperties))
      return Promise.resolve()
    },
    GO_BACK: () => {
      history.goBack()
      return Promise.resolve()
    }
  })
}

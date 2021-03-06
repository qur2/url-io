import isObservable from './isObservable'

export default function methods(handlers) {
  handlers = Object.assign({}, handlers)

  // Allow shorthand for defining observables.
  const {OBSERVE} = handlers
  if (isObservable(OBSERVE)) {
    handlers.OBSERVE = () => OBSERVE
  }

  return function methods(request) {
    const {method} = request
    const handler = handlers[method] || handlers.default

    if (handler) {
      return handler(request)
    }
    else {
      throw new Error(`Method ${method} not supported`, request)
    }
  }
}

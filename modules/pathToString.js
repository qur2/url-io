export default function pathToString(path) {
  return typeof path === 'string' ? path : path.join('/')
}

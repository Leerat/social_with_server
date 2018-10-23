export const START = '_START'
export const SUCCESS = '_SUCCESS'
export const FAIL = '_FAIL'

export const SEARCH_ON_MEDIUM = 'SEARCH_ON_MEDIUM'

//This for api middleware
export default function getTypes(type) {
  return [
    type + START,
    type + SUCCESS,
    type + FAIL
  ]
}

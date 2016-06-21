import flowRight from 'lodash/flowRight'

import wrapMultipleUrls from '././wrapMultipleUrls'
import wrapNesting from '././wrapNesting'
import wrapCache from '././wrapCache'
import wrapRecursion from '././wrapRecursion'
import wrapStandardRequest from '././wrapStandardRequest'

export default function wrapStandard(source) {
  // Compose middleware wrappers, order is important.
  return flowRight([
    wrapMultipleUrls,
    wrapNesting,
    wrapCache,
    wrapRecursion,
    wrapStandardRequest
  ])(source)
}

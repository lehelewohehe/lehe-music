import * as type from './mutation-types'

export default {
  [type.SET_ISSMALL](state, status) {
    state.isSmall = status
  }
}
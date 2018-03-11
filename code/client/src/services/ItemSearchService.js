/* eslint-disable */

import api from '@/services/api'

export default {
  searchItemWithLocation (user_input) {
    return api().post('getItemCategory', user_input)
  }
}
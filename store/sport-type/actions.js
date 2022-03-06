const path = 'sport-type'

export default {
  saveData({ commit }, payload) {
    return this.$axios.post(path, payload).then((response) => {
      return response
    })
  },
  getData({ commit }, payload) {
    return this.$axios.get(path + payload).then((response) => {
      commit('getData', response.data.data)
      return response
    })
  },
  editData({ commit }, payload) {
    return this.$axios
      .put(path + '/' + payload.id, payload.data)
      .then((response) => {
        return response
      })
  },
  getSingleData({ commit }, payload) {
    return this.$axios.get(path + payload).then((response) => {
      commit('getSingleData', response.data.data)
      return response
    })
  },
  deleteData({ commit }, payload) {
    return this.$axios.delete(path + '/' + payload.id).then((response) => {
      return response
    })
  },
  setData({ commit }, payload) {
    commit('getData', payload)
  },
}

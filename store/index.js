import Cookies from 'universal-cookie'

export const state = () => ({
  token: null
})

export const actions = {
  nuxtServerInit ({ commit }, data) {
    const cookies = new Cookies()
    cookies.set('accessToken', data.accessToken)
    const token = cookies.get('accessToken')
    commit('SET_TOKEN', token);
  }
}

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

export const getters = {
  token: state => state.token
}
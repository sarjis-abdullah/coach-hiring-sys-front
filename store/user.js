import Cookies from 'universal-cookie'

export const state = () => ({
  token: null
})

export const actions = {
  nuxtServerInit ({ commit }, data) {
    console.log(data)
    // const cookies = new Cookies(req.headers.cookie)
    // const token = cookies.get('accessToken')
    // commit('SET_TOKEN', token);
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
import Cookies from 'universal-cookie'

export default function ({ store, redirect }) {
  const cookies = new Cookies()
  const token = cookies.get('accessToken')
    if (!store.getters['token'] && !token) {
      redirect('/')
    }
  }
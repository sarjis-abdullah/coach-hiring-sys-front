import ConfirmModal from '@/components/common/ConfirmModal.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import Loader from '@/components/common/Loader.vue'
const GlobalComponents = {
  install(Vue) {
    Vue.component('ConfirmModal', ConfirmModal)
    Vue.component('Snackbar', Snackbar)
    Vue.component('Loader', Loader)
  }
}

export default GlobalComponents

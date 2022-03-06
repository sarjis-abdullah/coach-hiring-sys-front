import ConfirmModal from '@/components/common/ConfirmModal.vue'
import Snackbar from '@/components/common/Snackbar.vue'
import Loader from '@/components/common/Loader.vue'
import CustomInput from '@/components/common/CustomInput'
import CustomSelect from '@/components/common/CustomSelect'
import CustomTextArea from '@/components/common/CustomTextArea'
import CustomButton from '@/components/common/CustomButton'
import Breadcrumbs from '@/components/common/Breadcrumbs'
const GlobalComponents = {
  install(Vue) {
    Vue.component('ConfirmModal', ConfirmModal)
    Vue.component('Snackbar', Snackbar)
    Vue.component('Loader', Loader)
    Vue.component('CustomInput', CustomInput)
    Vue.component('CustomSelect', CustomSelect)
    Vue.component('CustomTextArea', CustomTextArea)
    Vue.component('CustomButton', CustomButton)
    Vue.component('Breadcrumbs', Breadcrumbs)
  }
}

export default GlobalComponents

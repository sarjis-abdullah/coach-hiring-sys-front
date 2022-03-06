import Vue from 'vue'
import globalComponents from './globalComponents'
// import auth from "@/mixins/auth";

import common from '@/mixins/common'
// import vueDebounce from 'vue-debounce'
// import moment from "moment-timezone";

// Vue.use(vueDebounce)

// Vue.mixin(auth)
Vue.mixin(common)
Vue.use(globalComponents)

// Vue.mixin({
//     methods: {
//       $formatDateTime(date, format='ll'){
//         const momentDate = moment(date)
//         return momentDate.tz("Asia/Dhaka").format(format)
//       }
//     }
//   });
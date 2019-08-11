import myBread from '@/components/my-bread.vue'
import mySelect from '@/components/my-select.vue'
import myCover from '@/components/my-cover.vue'

export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(mySelect.name, mySelect)
    Vue.component(myCover.name, myCover)
  }
}

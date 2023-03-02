import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/all.scss'

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { date, toThousands } from './methods/filters'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')
const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  toThousands
}

app.use(router) // 只是套用了方法 $route取屬性值 $router取方法，不包含元件RouterLink, RouterView
app.use(VueAxios, axios)
app.component('VForm', Form)
  .component('VField', Field)
  .component('ErrorMessage', ErrorMessage)

app.mount('#app')

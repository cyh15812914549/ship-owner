import Vue from 'vue'
import App from './App'
import moment from 'moment'

import store from 'store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.MOMENT = moment

const app = new Vue({
	...App,
	store
})
app.$mount()

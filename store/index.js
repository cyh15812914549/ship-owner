import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login.js'
import common from './modules/common.js'
import address from './modules/address.js'
import source from './modules/source.js'
import message from './modules/message.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		login,
		common,
		address,
		source,
		message
	}
})
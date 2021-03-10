const state = {
  authState: '',
  phoneNumber: '',
  password: '',
  roleNum: '',
  totalTopHeight: '',
  statusBarHeight: ''
}


const mutations = {
  saveLoginData(state,data){
	  state.authState = data.authState
	  state.phoneNumber = data.phoneNumber
	  state.password = data.password
	  state.roleNum = data.roleNum
  },
  getCustomHeight(state,data){
  	state.statusBarHeight = data.statusBarHeight
	state.totalTopHeight = data.totalTopHeight
  }
}

const actions = {
  
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}

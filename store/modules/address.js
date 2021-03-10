const state = {
  addressLists: [{
		id: 1,
  		abbreviation: 'dizhijiancheng11',
  		detail: '详细地址11',
  		name: '货主名11',
  		phone: '12345678945'
  	},
  	{
		id: 2,
  		abbreviation: '地址简称22',
  		detail: '详细地址22',
  		name: '货主名22',
  		phone: '12345678912'
  	},
  ]
}


const mutations = {
  increaseAddress(state,data){
  	  state.addressLists.push(data)
  },
  updateAddress(state,data){
	  let arr = state.addressLists.map(item => {
		  return item.id == data.id ? data : item
	  })
	  state.addressLists = arr
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
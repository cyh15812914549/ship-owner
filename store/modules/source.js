const state = {
	//记录发布过程中的信息
	publishInfo: {
		publishTime: '2020-12-30 14:12',
		publisher: '小忆',
	},
	//货源列表信息
	sourceLists: [
		{
				shipType: "不限",
				minTonnage: '1000',
				maxTonnage: '1300',
				unloadAddress: "深圳宝安",
				endCity: "广东深圳",
				loadAddress: "大沙东地铁站",
				startCity: "广东广州",
				loadingDate: "2020-12-30",
				price: "0.01",
				size: "10.00",
				sourceName: "饮料",
				unit: "吨",
				publishTime: '2020-12-30 14:12',
				publisher: '省永超',
				publishRange: '', //发布范围
				settlementMode: '', //结算模式
				deliveryMode: '',//发货方式
				automaticOrderTake: false, //自动接单
				smartPush: false, //智能推送
			},{
			shipType: "不限",
			minTonnage: '1000',
			maxTonnage: '1300',
			unloadAddress: "深圳宝安",
			endCity: "广东深圳",
			loadAddress: "大沙东地铁站",
			startCity: "广东广州",
			loadingDate: "2020-12-30",
			price: "0.01",
			size: "10.00",
			sourceName: "饮料",
			unit: "吨",
			publishTime: '2020-12-30 14:12',
			publisher: '省永超',
			publishRange: '', //发布范围
			settlementMode: '', //结算模式
			deliveryMode: '',//发货方式
			automaticOrderTake: false, //自动接单
			smartPush: false, //智能推送
		},{
			shipType: "不限",
			minTonnage: '1000',
			maxTonnage: '1300',
			unloadAddress: "深圳宝安",
			endCity: "广东深圳",
			loadAddress: "大沙东地铁站",
			startCity: "广东广州",
			loadingDate: "2020-12-30",
			price: "0.01",
			size: "10.00",
			sourceName: "饮料",
			unit: "吨",
			publishTime: '2020-12-30 14:12',
			publisher: '省永超',
			publishRange: '', //发布范围
			settlementMode: '', //结算模式
			deliveryMode: '',//发货方式
			automaticOrderTake: false, //自动接单
			smartPush: false, //智能推送
		},
		{
			shipType: "集装箱船",
			minTonnage: '1000',
			maxTonnage: '1300',
			unloadAddress: "深圳宝安",
			endCity: "广东深圳",
			loadAddress: "大沙东地铁站",
			startCity: "广东广州",
			loadingDate: "2020-12-30",
			price: "0.01",
			size: "10.00",
			sourceName: "饮料",
			unit: "吨",
			publishTime: '2020-12-30 14:12',
			publisher: '小忆',
			publishRange: '',
			settlementMode: '',
			deliveryMode: '',
			automaticOrderTake: false,
			smartPush: false
		}
	]
}


const mutations = {
	savePublishInfo(state,data){
		state.publishInfo = {...state.publishInfo,...data}
	},
	increaseSource(state){
		state.sourceLists.push(state.publishInfo)
		console.log(state.sourceLists)
	},
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

import moment from 'moment'
let currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
import {goBackTwoSec,Toast} from '../../common/common.js'

const state = {
	messageLists: [{
			id: 1,
			unRead: true,
			type: 1,
			title: '卸货通知',
			time: currentTime,
			content: '卸货通知卸货通知卸货通知卸货通知卸货通知卸货通知卸货通知卸货通知'
		},
		{
			id: 2,
			unRead: false,
			type: 2,
			title: '到账通知',
			time: currentTime,
			content: '到账通知到账通知到账通知到账通知到账通知到账通知到账通知到账通知'
		},
		{
			id: 3,
			unRead: true,
			type: 3,
			title: '其它通知',
			time: currentTime,
			content: '其它通知其它通知其它通知其它通知其它通知其它通知其它通知其它通知'
		},
		{
			id: 4,
			unRead: true,
			type: 1,
			title: '签收通知',
			time: currentTime,
			content: '签收通知签收通知签收通知签收通知签收通知签收通知签收通知签收通知'
		},
	]
}


const mutations = {
	// 删除消息
	deleteMessage(state, id) {
		let arr = state.messageLists.splice(state.messageLists.findIndex(item => item.id == id), 1)
		if(arr.length>0){
			Toast({
				title: '删除成功!'
			})
			goBackTwoSec()
		}else{
			Toast({
				title: '删除失败!'
			})
		}
	},
	//更新消息
	updateMessage(state, data){
		let arr = state.messageLists.map(item => {
			return item.id == data.id ? data : item
		})
		state.messageLists = arr
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

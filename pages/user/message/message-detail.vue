<template>
	<view>
		<view class="uni-common-prl30">
			<view class="uni-bg-white padding20 uni-common-mt20 border-radius15">
				<view class="flex uni-justify-sb border_bottom uni-common-pb10">
					<text class="uni-bold">{{messageObj.title}}</text>
					<text class="col-999">{{messageObj.time}}</text>
				</view>
				<view class="color-666">
					{{messageObj.content}}
				</view>
			</view>
		</view>
		
		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" type="warn" @click="deleteMessage">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageObj: {}
			}
		},
		onLoad(option) {
			let obj = JSON.parse(decodeURIComponent(option.item))
			obj.unRead = false
			this.messageObj = obj
			this.$store.commit('updateMessage',obj)
		},
		methods: {
			deleteMessage(){
				this.$store.commit('deleteMessage',this.messageObj.id)
			}
		}
	}
</script>

<style>

</style>

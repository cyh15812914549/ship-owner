<template>
	<view>
		<!-- 搜索 -->
		<view class="margin20">
			<uni-search-bar placeholder="请输入关键字搜索" :radius="100" @confirm="search"></uni-search-bar>
		</view>

		<view class="margin20">
			<block v-for="(item,index) in addressLists" :key="index">
				<view @click="clickList(item)" class="padding20 uni-common-mt20 uni-bg-white flex uni-justify-sb border-radius10">
					<view>
						<view>{{item.abbreviation}}</view>
						<view class="uni-h4">{{item.detail}}</view>
						<view class="font-size32">
							<text>{{item.name}}</text>
							<text class="uni-common-ml20">{{item.phone}}</text>
						</view>
					</view>
					<view class="flex uni-align-c">
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
			</block>
		</view>

		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="increaseAddress">新增地址</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	
	import {goBack} from '../../common/common.js'

	export default {
		data() {
			return {
				addressLists: [],
				operation: ''
			}
		},
		created() {

		},
		onLoad(options) {
			if(options.operation){
				this.operation = options.operation
			}
		},
		onShow() {
			this.addressLists = this.$store.state.address.addressLists
		},
		methods: {
			clickList(item) {
				//表示从资料管理进来的
				if(this.operation == 'editAddress'){
					uni.navigateTo({
						url: './add-address?address=' + JSON.stringify(item)
					})
				}else{
					let data = {}
					if(this.operation == 'loadAddress'){
						data = {loadAddress: item}
					}else if(this.operation == 'unloadAddress'){
						data = {unloadAddress: item}
					}
					uni.$emit('selectData',data)
					goBack()
				}
				
			},
			increaseAddress() {
				uni.navigateTo({
					url: './add-address'
				})
			},
			search(e) {
				console.log(e, "搜索")
				let addressLists = []
				if (e.value) {
					this.addressLists.forEach(item => {
						//根据输入的内容去匹配地址检查或者详细地址
						if (item.abbreviation.indexOf(e.value) != -1 || item.detail.indexOf(e.value) != -1) {
							addressLists.push(item)
						}
					})
					//重新赋值给列表
					this.$nextTick(() => {
						this.addressLists = addressLists
					})
				} else {  //没有值就返回原数据
					this.addressLists = this.$store.state.address.addressLists
				}
			}
		},
		computed: {
			// ...mapState({
			// 	addressLists: state => state.address.addressLists
			// }),
		}
	}
</script>

<style>

</style>

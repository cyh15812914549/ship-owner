<template>
	<view>
		<view class="uni-common-mt30">
			<uni-list>
				<uni-list-item title="常用地址管理" showArrow="true" clickable="true" @click="goAddressList"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goAddressList(){
				uni.navigateTo({
					url: '../../addressManage/select-address?operation=editAddress'
				})
			}
		}
	}
</script>

<style>

</style>

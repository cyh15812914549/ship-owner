<template>
	<view>
		<view class="uni-bg-white flex uni-align-c uni-common-mt30 uni-common-pl30 uni-common-ptb10" @click="checkInfos">
			<view class="uni-flex1">
				<view>
					<image src="../../../static/images/ship_blue_ic.png" 
					class="icon50 align-middle"></image>
					<text class="font-size40 uni-bold inline-block align-middle uni-common-ml20">宏源8898</text>
				</view>
				<view><text class="color-666 ">AIS标识码：413998597</text></view>
				<view class="uni-bold font-size32">
					<text>船东：滑鬼船东</text>
					<text class="uni-common-ml20">载重量：1300-1500吨</text>
				</view>
			</view>
			<view style="flex: 0 1 110rpx;">
				<image src="../../../static/images/home_ship_p.png" style="width: 110rpx;height: 110rpx;"></image>
			</view>
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
			checkInfos(){
				uni.navigateTo({
					url: './shipowner-info'
				})
			}
		}
	}
</script>

<style>

</style>

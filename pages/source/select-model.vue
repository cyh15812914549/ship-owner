<template>
	<view>
		<view class="text-c uni-common-mt60 font-size36">
			<text>您的此次结算模式?</text>
		</view>
		<view class="uni-common-mt50">
			<button class="uni-main-color button">现结发货</button>
		</view>
		<view class="uni-common-mt50">
			<button class="uni-main-color button">月结发货</button>
		</view>
		<view class="next-step">
			<button class="global-button uni-width-70P" @click="clickNext">下一步</button>
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
			clickNext(){
				uni.navigateTo({
					url: 'publish-source'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button{
		width: 60%;
		border-radius: 100px;
		// height: 100rpx;
		// border-radius: 100rpx;
		// font-weight: 500;
		// line-height: 100rpx;
		// text-align: center;
		// font-size: 35rpx;
	}
	
	.next-step{
		width: 100%;
		position: fixed;
		bottom: 35rpx;
	}
</style>

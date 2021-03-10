<template>
	<view class="uni-height-100P">
		<view class="navbar">
			<view class="segmented-control uni-bg-white">
				<view v-for="(item, index) in items" 
				 :key="index" :style="{backgroundColor: index === currentIndex ? mainColor : ''}"
				 class="segmented-control__item" @click="onClick(index)">
					<text :style="{color:index === currentIndex ? '#fff': mainColor}"
					 class="segmented-control__text">{{ item }}</text>
				</view>
			</view>
		</view>
		<view style="padding-top: 124rpx;" class="uni-height-100P flex uni-align-c uni-justify-c">
			<view>
				<image src="../../../static/images/ic_tip_fail.png" style="width: 160rpx;height: 160rpx;"/>
				<view class="text-c">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部', '现结', '月结', '充值'],
				currentIndex: 0,
				mainColor: getApp().globalData.mainColor
			}
		},
		methods: {
			onClick(index) {
				uni.showLoading({
					title: '加载中'
				})
				if (this.currentIndex !== index) {
					this.currentIndex = index
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 200)
				
			}
		}
	}
</script>

<style lang="scss">
	
	page{
		height: 100%;
	}
	
	.navbar{
		position: fixed;
		z-index: 999;
		width: 710rpx;
		padding: 20rpx;
		background-color:  #e5e5e5;
	}
	
	.segmented-control {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		border-radius: 100rpx;
		border: 2rpx solid $uni-text-main-color;
		flex-direction: row;
		height: 84rpx;
		overflow: hidden;
	}
	
	.segmented-control__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		/* #endif */
		border-radius: 100rpx;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	
	.segmented-control__text {
		font-size: 16px;
		line-height: 20px;
		text-align: center;
	}
</style>

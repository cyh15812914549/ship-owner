<template>
	<view class="uni-height-100P pos_relative">
		<!-- 标签栏 -->
		<view class="uni-bg-white tabs">
			<uni-segmented-control class="uni-segmented-control" :current="current" :values="items" @clickItem="onClickItem"
			 style-type="text" :active-color="activeColor"></uni-segmented-control>
		</view>
		<!-- 内容 -->
		<view class="safe-range">
			<view v-if="current === 0">
				<block v-for="(item,index) in sourceLists" :key="index">
					<view class="padding10">
						<source-item :sourceItem="item" />
					</view>
				</block>
			</view>
			<view v-if="current === 1">
				<block v-for="(item,index) in sourceLists" :key="index">
					<view class="padding10">
						<source-item :sourceItem="item" />
					</view>
				</block>
			</view>
		</view>
		<!-- 发布货源按钮 -->
		<view class="publish">
			<image mode="aspectFit" src="../../static/images/published_soursed.png" @click="clickPublish"></image>
		</view>

	</view>
</template>

<script>
	import sourceItem from "@/components/source/source.vue"
	
	import {mapState} from 'vuex'

	export default {
		data() {
			return {
				items: ['接单中', '已关闭'], 
				current: 0,
				activeColor: getApp().globalData.mainColor,
				sourceLists: []
			}
		},
		onLoad(options) {
			this.sourceLists = this.$store.state.source.sourceLists
		},
		onPageScroll(e) {

		},
		methods: {
			onClickItem(e) {
				uni.showLoading({
					title: '加载中'
				})
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 200)
			},
			clickPublish() {
				uni.navigateTo({
					url: './select-model'
				})
			}
		},
		computed:{
			
		},
		components: {
			sourceItem
		}
	}
</script>

<style lang="scss">
	.uni-segmented-control {
		width: 60%;
		margin: 0 auto;
	}
	
	.tabs {
		position: fixed;
		/* #ifndef H5*/
		top: 0;
		/* #endif */
		left: 0;
		width: 100%;
		z-index: 10;
	}

	.safe-range {
		padding-top: 84rpx;
	}

	.publish {
		position: fixed;
		right: 80rpx;
		bottom: 130rpx;
		z-index: 10;

		image {
			width: 160rpx;
			height: 160rpx;
		}
	}
</style>

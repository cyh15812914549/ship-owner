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
				<block v-for="(item,index) in 3" :key="index">
					<view class="padding10">
						<source-item :sourceItem="sourceItem" />
					</view>
				</block>
			</view>
			<view v-if="current === 1">
				<block v-for="(item,index) in 3" :key="index">
					<view class="padding10">
						<source-item :sourceItem="sourceItem" />
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

	export default {
		data() {
			return {
				items: ['接单中', '已关闭'],
				current: 0,
				activeColor: getApp().globalData.mainColor,
				sourceItem: {
					agentSourceId: "",
					amount: "10.00吨",
					carLength: "",
					carLoadSize: "",
					carTimesTotal: "",
					carType: "不限",
					closeState: "",
					concatPhone: "",
					containerAscription: "",
					containerCard: "",
					containerSum: "",
					containerType: "",
					createTime: "",
					creator: "",
					dangerous: "0",
					deadWeightEnd: "100",
					deadWeightStart: "1",
					distributeDriverId: "",
					driverId: "",
					endCity: "广东深圳",
					freight: "0.1",
					freightType: "1",
					infoFrozen: "0.0",
					isClose: "",
					isComplete: "",
					isMonthly: "",
					isPreparePay: "0",
					isTon: "0",
					loadAddress: "大沙东地铁站",
					loadContact: "王飞",
					loadPhone: "18610613996",
					loadType: "",
					loadingDate: "2020-12-30",
					measurement: "吨",
					merchant: "宝丰科技",
					merchantUrl: "http://testtruck-admin.huoyunjh.cn/group1/M00/01/0E/rBJMfl-G4PCAeRu8AABQydFflYU175-400-400.png",
					phoneContact: "0",
					price: "0.01",
					publicState: "",
					receiveCount: "0",
					receiveDistributePrice: "",
					receivePrice: "",
					remark: "",
					round: "0",
					sealCard: "",
					serverFrozen: "0.0",
					size: "10.00",
					sourceCode: "",
					sourceId: "3320",
					sourceModel: "",
					sourceName: "饮料",
					startCity: "广东广州",
					state: "",
					stateInfo: "等待司机接单",
					surplusAmout: "10.00吨",
					surplusSize: "",
					toleranceDays: "0",
					tolerate: "0.0",
					toleratePercentage: "0.001",
					toleratePrice: "0.01",
					unit: "吨",
					unloadAddress: "深圳宝安",
					unloadContact: "小麦",
					unloadPhone: "18857862454",
					waybillCount: "1",
					waybillReceiveId: "",
					waybillReceiveState: ""
				}
			}
		},
		onLoad(options) {

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
		padding-top: 76rpx;
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

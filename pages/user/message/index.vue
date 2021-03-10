<template>
	<view>
		<view class="uni-bg-white tabs">
			<uni-segmented-control class="uni-segmented-control" :current="current" :values="items" @clickItem="onClickItem"
			 style-type="text" :active-color="activeColor"></uni-segmented-control>
		</view>
		<view class="safe-range uni-common-prl30">
			<view class="uni-bg-white padding20 uni-common-mt20 border-radius15" v-for="(item,index) in messageLists" :key="index">
				<navigator :url="'./message-detail?item=' + encodeURIComponent(JSON.stringify(item))">
					<view class="flex uni-justify-sb border_bottom uni-common-pb10">
						<view class="uni-bold">
							<text :class="[item.unRead ? 'col_E51818' : 'read-col']">{{item.unRead ? '[未读]' : '[已读]'}}</text>
							<text class="uni-common-ml20">{{item.title}}</text>
						</view>
						<text class="col-999">{{item.time}}</text>
					</view>
					<view class="color-666">
						{{item.content}}
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['全部', '交易信息','运单信息', '其它'],
				current: 0,
				activeColor: getApp().globalData.mainColor,
				messageLists: []
			}
		},
		created() {
			
		},
		onShow() {
			this.initData(this.current)
		},
		methods: {
			onClickItem(e) {
				uni.showLoading({
					title: '加载中'
				})
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					this.initData(e.currentIndex)
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 200)
			},
			// 初始化数据
			initData(index){
				let lists = this.$store.state.message.messageLists
				switch (index){
					case 0:
						this.messageLists = lists
						break;
					case 1:
						this.messageLists = lists.filter(item=>item.type == 1)
						break;
					case 2:
						this.messageLists = lists.filter(item=>item.type == 2)
						break;
					case 3:
						this.messageLists = lists.filter(item=>item.type == 3)
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.read-col{
		color: #636363;
	}
	
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
</style>

<template>
	<view>
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<block v-for="(item,index) in topTabs" :key="index">
				<view class="nav-item" :class="{current: filterIndex === index}" @click="tabClick(index)">
					{{item}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topTabs: ['接单中','已关闭'],
				headerPosition:"fixed",
				headerTop:"0px",
				filterIndex: 0, 
			}
		},
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		methods: {
			//筛选点击
			tabClick(index){
				this.filterIndex = index;
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
			},
		}
	}
</script>

<style lang="scss">
	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			position: relative;
			&.current{
				color: $uni-text-main-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $uni-text-main-color;
				}
			}
		}
	}
</style>

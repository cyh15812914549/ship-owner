<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 自定义statusBar,customBar
		uni.getSystemInfo({
			success: (e) => {
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				let totalTopHeight = uni.getSystemInfoSync().statusBarHeight + 44
				
				this.$store.commit('getCustomHeight', {
					totalTopHeight,statusBarHeight
				})
			}
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData:{
		mainColor: '#008BF8'
	}
};
</script>

<style>

	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/common.css";
	@import "./common/css/iconfont.css"; 
	
	page{
		background-color: #e5e5e5;
	}
	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>

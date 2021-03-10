<template>
	<view class="uni-height-100P">
		<view class="uni-width-100P top-content col_white" :style="{height: bgImgHeight}">
			<!-- 加z-index: 10;是解决position: absolute;造成的点击失效问题 -->
			<view :style="{height: totalTopHeight + 'px'}" class="pos_absolute uni-width-100P" style="z-index: 10;">
				<view :style="{marginTop: statusBarHeight + 'px'}" class="text-c top-title">
					我的
				</view>
				<view class="flex uni-align-c uni-common-prl20" style="height: 200rpx;">
					<view class="uni-common-mrl20">
						<image :src="avatarUrl" @click="uploadImg" class="avatar-img" />
					</view>
					<view class="uni-common-mrl20 uni-flex1">
						<view>省永超</view>
						<view>货多多物流科技股份有限公司</view>
					</view>
					<navigator url="/pages/user/enterprise-qrcode" open-type="navigate">
						<image src="../../static/images/qrcode.png" class="icon60" />
					</navigator>
				</view>
			</view>
			<view class="pos_relative">
				<image src="../../static/images/shap_gradient.png" :style="{height: bgImgHeight}" class="uni-width-100P"></image>
			</view>
		</view>

		<scroll-view scroll-y :style="{height: scrollView}" class="uni-width-100P" @scrolltolower="pullUpLoading">
			<view class="uni-common-mt30">
				<uni-list>
					<uni-list-item title="钱包(14419396461)" rightText="3.00元" :ifDisplayBorBot="true" :showArrow="true" 
						thumb="../../static/images/walllet_balance_ic.png" clickable="true" to="./wallet/index"
					 rightTextColor="#edaf6c">
					</uni-list-item>
					<uni-list-item title="积分" rightText="9990.04积分" :ifDisplayBorBot="true" :showArrow="true" thumb="../../static/images/point_ic.png"
					 rightTextColor="#0d99a9" clickable="true" to="integral/index">
					</uni-list-item>
					<uni-list-item title="资料管理" :ifDisplayBorBot="true" clickable="true" to="./dataManage/index"
						:showArrow="true" thumb="../../static/images/data_managent_ic.png">
					</uni-list-item>
					<uni-list-item title="消息中心" :showBadge="true" badgeType="error" clickable="true" to="message/index"
						badgeText="27" :ifDisplayBorBot="true" :showArrow="true"
						thumb="../../static/images/message.png">
					</uni-list-item>
					<uni-list-item title="我的发布" :showArrow="true" thumb="../../static/images/ic_my_trade.png">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="已关联船东" :showArrow="true" to="relationShipowner/index"
					thumb="../../static/images/ship_blue_ic.png">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="推荐给朋友" :ifDisplayBorBot="true" :showArrow="true" thumb="../../static/images/share_ic.png">
					</uni-list-item>
					<uni-list-item title="帮助反馈" :ifDisplayBorBot="true" :showArrow="true" thumb="../../static/images/help_ic.png">
					</uni-list-item>
					<uni-list-item title="联系客服" :showArrow="true" thumb="../../static/images/customerservice_ic.png">
					</uni-list-item>
				</uni-list>
			</view>
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="设置" :showArrow="true" thumb="../../static/images/set_ic.png">
					</uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				avatarUrl: 'http://testship-admin.huoyunjh.com/images/driver_img.png'
			}
		},
		methods: {
			//点击头像上传图片
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						this.avatarUrl = res.tempFilePaths[0]
					}
				})
			},
			pullUpLoading() {

			}
		},
		computed: {
			...mapState({
				totalTopHeight: state => state.login.totalTopHeight,
				statusBarHeight: state => state.login.statusBarHeight
			}),
			bgImgHeight() {
				return (this.totalTopHeight + 100) + 'px'
			},
			scrollView() {
				return 'calc(100% - ' + (this.totalTopHeight + 100) + 'px' + ')'
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.avatar-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.top-content {
		background: rgba($color: #008BF8, $alpha: 0.6);
	}

	.top-title {
		height: 44px;
		line-height: 44px;
	}
</style>

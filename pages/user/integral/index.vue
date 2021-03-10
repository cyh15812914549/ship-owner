<template>
	<view>
		<view class="top-background"></view>
		<view class="my_integral_bg">
			<view class="pos_relative">
				<view class="pos_absolute flex uni-align-c col_white integral-content" 
					style="width: 690rpx;margin-left: 30rpx;margin-right: 30rpx;">
					<view class="uni-flex2 padding30">
						<view>可用积分</view>
						<view class="font-size46" style="font-weight: 600;">9990.04</view>
						<view>总额度(积分)10000.00</view>
					</view>
					<view style="width: 2rpx;background-color: #fff;height: 100rpx;"></view>
					<view class="uni-flex1 padding30">
						<view>
							<view>冻结积分</view>
							<view>4.98</view>
						</view>
						<view>
							<view>支出积分</view>
							<view>4.98</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 190rpx;">
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="积分结算" :ifDisplayBorBot="true" :showArrow="true" 
						ifDisplayBorBot="true" clickable="true" to="./integral-detailed">
					</uni-list-item>
					<uni-list-item title="积分明细" :ifDisplayBorBot="true" :showArrow="true"></uni-list-item>
				</uni-list>
			</view>
		</view>

		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="clickRecharge">充值</button>
		</view>

		<uni-popup ref="popup" type="message">
			<uni-popup-dialog title="" type="info" @confirm="dialogConfirm">
				<view slot="body" class="uni-width-100P">
					<view>
						
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	
	import { WXShowModal } from '../../../common/common.js'
	
	export default {
		data() {
			return {

			}
		},
		methods: {
			clickRecharge() {
				WXShowModal({
					title: 'null',
					content: '充值说明\r\n平台用户在进行转账入金时，转账页面收款人填写信息如下：\r\n收款人：广东货多多物流科技股份有限公司江西分公司\r\n' +
						'收款账号：10950000004227183\r\n收款银行：华夏银行股份有限公司广州分行营业部\r\n附言：99114419396461(如需备注其他附言，请在此内容后追加)',
					showCancel: false,
					confirmText: '知道了'
				})
			}
		},
		components: {
			
		},
	}
</script>

<style lang="scss">
	.integral-content{
		background: linear-gradient(to right,#2397fa,#2281ef,#2171ea);
		border-radius: 16rpx;
	}
	
	.top-background {
		height: 300rpx;
		background-color: #010101;
	}

	.my_integral_bg {
		position: fixed;
		top: 140rpx;
	}

</style>

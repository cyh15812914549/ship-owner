<template>
	<view>
		<view class="top-background"></view>
		<view class="my_point_bg">
			<view class="pos_relative">
				<image src="../../../static/images/my_point_bg.png" class="my_point_img pos_absolute" />
				<view class="pos_absolute flex uni-align-c padding40 col_white" style="width: 650rpx;margin-left: 50rpx;margin-right: 50rpx;">
					<view>
						<view>银行子账号：14419396461</view>
						<view>可用余额(元)</view>
						<view class="font-size40" style="font-weight: 600;">¥3.00</view>
						<view>冻结金额：0元</view>
					</view>
					<view class="uni-flex1">
						<view class="border-radius10 text-c uni-common-ml50" style="background-color: #f9b328;width: 120rpx;">
							提现<uni-icons type="arrowright" color="#fff"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 190rpx;">
			<view>
				<uni-list>
					<uni-list-item title="交易记录" :ifDisplayBorBot="true" :showArrow="true"></uni-list-item>
				</uni-list>
			</view>
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="支付安全" :ifDisplayBorBot="true" :showArrow="true" ifDisplayBorBot="true"></uni-list-item>
					<uni-list-item title="银行卡" :ifDisplayBorBot="true" :showArrow="true"></uni-list-item>
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
	.top-background {
		height: 300rpx;
		background-color: #010101;
	}

	.my_point_bg {
		position: fixed;
		top: 140rpx;
	}

	.my_point_img {
		width: 750rpx;
		height: 380rpx;
	}
</style>

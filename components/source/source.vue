<template>
	<view class="padding20 uni-bg-white border-radius15">
		<view class="uni-flex">
			<view class="uni-flex-item">
				<!-- 地址 -->
				<view>
					<view class="uni-flex">
						<view class="display-one-line address-one">{{sourceItem.loadAddress}}</view>
						<view class="uni-common-pt10 uni-common-prl20">
							<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
						</view>
						<view class="display-one-line address-one">{{sourceItem.unloadAddress}}</view>
					</view>
					<view class="uni-flex border_bottom">
						<view class="display-one-line">{{sourceItem.startCity}}</view>
						<view>
							<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
						</view>
						<view class="display-one-line">{{sourceItem.endCity}}</view>
					</view>
				</view>
				
				<view>
					<view class="uni-common-mt10">
						<text>{{ sourceItem.sourceName }}</text>
						<text class="uni-mrl10">|</text>
						<text v-if="sourceItem.isTon == 1" class="col_188FEA">余{{ sourceItem.surplusAmout || sourceItem.surplusAmount }}</text>
						<text v-else-if="sourceItem.isTon != 1" class="col_188FEA">{{ sourceItem.amount }}</text>
						<text class="uni-mrl10">|</text>
						<text>{{sourceItem.loadingDate == '' ? sourceItem.loadingDate : sourceItem.loadingDate | formatDateMDZW}}</text>
						<text v-if="sourceItem.toleranceDays && sourceItem.toleranceDays != 0">+{{ sourceItem.toleranceDays }}天</text>
						<text>装货</text>
						<text class="uni-common-ml10 monthly_bottom_text" v-if="sourceItem.isMonthly == 1">月结</text>
						<text class="uni-common-ml10 batch_bottom_text" v-if="sourceItem.isTon == 1">批量</text>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item ">
							<view>
								<text>散货船</text>
								<text class="uni-mrl10">|</text>
								<text>1000~1100吨</text>
							</view>
							<view class="col_E51818">
								<block v-if="sourceItem.freightType == 1">
									<text v-if="sourceItem.phoneContact == 1">电议</text>
									<block v-if="sourceItem.phoneContact != 1">
										<text>{{ sourceItem.price }}{{ sourceItem.isMonthly == '1' ? '积分' : '元' }}/{{ sourceItem.unit }}</text>
									</block>
								</block>
								<block v-if="sourceItem.freightType == 2">
									<text>{{ sourceItem.freight }}</text>
									<text>{{ sourceItem.isMonthly == '1' ? '积分' : '元' }}/船</text>
								</block>
								<block>
									<text class="uni-common-ml20" v-if="sourceItem.isPreparePay == 1"> 可预付</text>
								</block>
							</view>
							<view>
								<text>发布人：省永超 {{formatPublish}} 公开</text>
							</view>
						</view>
						
						<view class="uni-center-cr">
							<view class=" uni-center" @click.stop="makeCall">
								<image mode="aspectFit" src="../../static/images/looking_for_a_ship_ic.png" class="look-boat"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { makePhoneCall } from '../../common/common.js'
	
	export default {
		name: 'sourceItem',
		props: {
			sourceItem: {
				type: Object,
				value: {},
			}
		},
		filters: {
			//时间处理
			formatDateMDZW(data) {
				var date = new Date(data)
				var M = date.getMonth() + 1 + '月';
				var D = date.getDate() + '日'; 
				return M + '-' + D
			}
		},
		data() {
			return {
				publishTime: '2020-12-30 14:12'
			};
		},
		created() {
			moment.locale('zh-cn');
		},
		computed:{
			formatPublish: function(){
				return this.moment(this.publishTime).format('YYYY/MM/DD HH:mm')
			} 
		},
		methods:{
			makeCall(){
				makePhoneCall(this.sourceItem.loadPhone)
			}
		}
	}
</script>

<style lang="scss">
	.address-one {
	  font-size: 36rpx;
	  font-weight: bold;
	  color: #333;
	}
	
	.freight{
		font-size: 36rpx;
		margin: auto 0;
	}
	
	.phone-round {
		height: 90rpx;
		width: 90rpx;
		line-height: 90rpx;
	}
	
	.look-boat{
		width: 110rpx;
		height: 110rpx;
	}
</style>

<template>
	<view>
		<view class="fixed_bottom_mb140">
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="运费" :rightText="'¥' + form.freight + '元'" rightTextColor="#edaf6c" 
						 thumb="../../static/images/goods_freight_rates_ic.png" ></uni-list-item>
					<uni-list-item title="允许船东自动接单" :showSwitch="true" @switchChange="orderTakeSwitch"
						thumb="../../static/images/goods_allow_the_order_ic.png" >
						<view class="inline-block uni-common-ml10 pos_relative" slot="content">
							<image src="../../static/images/tip.png" class="tip-icon" @click="clickTips(1)"></image>
						</view>
					</uni-list-item>
					<uni-list-item title="运输服务费" :rightText="'¥' + form.serviceFee + '元'" rightTextColor="#edaf6c"
						 thumb="../../static/images/dispatch_fee_ic.png" ></uni-list-item>
				</uni-list>
			</view>
			<view class="margin20 uni-common-pl30 flex uni-align-c">
				<image src="../../static/images/goods_scope_ic.png" style="width: 35rpx;height: 35rpx;"></image>
				<text class="uni-common-mrl20">发布到</text>
				<image src="../../static/images/tip.png" style="width: 35rpx;height: 35rpx;" @click="clickTips(2)"></image>
			</view>
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="公开货源"
						 thumb="../../static/images/goods_open_ic.png" >
						 <block slot="footer">
							 <view @click="selectSourceType('public')">
								 <uni-icons type="circle-filled" :color="sourceType == 'public' ? mainColor : null"></uni-icons>
							 </view>
						 </block>
					</uni-list-item>
					<uni-list-item title="非公开货源"
						 thumb="../../static/images/goods_hidden_ic.png" >
						 <block slot="footer">
							 <view @click="selectSourceType('private')">
								 <uni-icons type="circle-filled" :color="sourceType == 'private' ? mainColor : null"></uni-icons>
							 </view>
						 </block>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="收单规则" rightText="未绑定收单规则" :showArrow="true"
						 thumb="../../static/images/goods_description_of_goods_ic.png" >
					</uni-list-item>
					<uni-list-item title="是否开启智能推送" :showSwitch="true" @switchChange="smartPushSwitch"
						 thumb="../../static/images/goods_allow_the_order_ic.png" >
						 <view class="inline-block uni-common-ml10 pos_relative" slot="content">
						 	<image src="../../static/images/tip.png" class="tip-icon" @click="clickTips(3)"></image>
						 </view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="margin20 padding20 uni-bg-white border-radius15">
				<view class="uni-common-mb20">
					<image src="../../static/images/goods_description_of_goods_ic.png" class="remark-img inline-block align-middle"></image>
					<text class="inline-block align-middle uni-common-ml10">备注(100字内)</text>
				</view>
				<view class="uni-common-pl20">
					<uni-easyinput type="textarea" @input="remarkInput" maxlength="100" :inputBorder="false"
						 placeholder="请输入备注(可不填)" ></uni-easyinput>
				</view>
				<view class="text-r">
					<text class="col-999">{{remarkResidueNumber}}/100</text>
				</view>
			</view>
		</view>
		
		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="nextStep">下一步</button>
		</view>
	</view>
</template>

<script>
	
	import { WXShowModal } from '../../common/common.js'
	
	export default {
		data() {
			return {
				form: {
					freight: 0,
					serviceFee: 0,
					automaticOrderTake: false,
					smartPush: false,
					remarks: ''
				},
				mainColor: getApp().globalData.mainColor,
				sourceType: 'public',
				remarkResidueNumber: 0,
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('freight',(data)=>{
				this.form.freight = data.freight
				this.form.serviceFee = (data.freight*0.065).toFixed(2)
			})
		},
		methods: {
			//智能推送按钮
			smartPushSwitch(e){
				this.form.smartPush = e.value
			},
			//自动接单按钮
			orderTakeSwitch(e){
				this.form.automaticOrderTake = e.value
			},
			nextStep(){
				let infoObj = {
					freight: this.form.freight,
					serviceFee: this.form.serviceFee,
					publishRange: this.sourceType == 'public' ? '公开货源' : '非公开货源',
					deliveryMode: this.current == 0 ? '按单次发货' : '按批量发货',
					automaticOrderTake: this.form.automaticOrderTake ? '打开' : '关闭',
					smartPush: this.form.smartPush ? '是' : '否',
					remarks: this.form.remarks
				}
				this.$store.commit('savePublishInfo',infoObj)
				uni.navigateTo({
					url: './preview-source'
				})
			},
			//选择非公开还是公开货源
			selectSourceType(type){
				this.sourceType = type
			},
			remarkInput(val){
				this.remarkResidueNumber = val.length
				this.form.remarks = val
			},
			clickTips(index){
				switch (index) {
					case 1:
						WXShowModal({
							title: 'null',
							content: '船东接单后即生成运单，无需货主确认',
							showCancel: false,
							confirmText: '关闭'
						})
						break
					case 2:
						WXShowModal({
							title: 'null',
							content: '公开货源:注册到平台的所有船东都可以查看改货源。'+
									 '\r\n非公开货源:船东通过扫描企业二维码查看该货源',
							showCancel: false,
							confirmText: '关闭'
						})
						break
					case 3:
						WXShowModal({
							title: 'null',
							content: '开启智能推送,平台会免费为您匹配一次合适的船舶,并推送短信给船东!',
							showCancel: false,
							confirmText: '关闭'
						})
						break
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.remark-img{
		width: $uni-img-size-base;
		height: $uni-img-size-base;
	}
	
	.tip-icon{
		width: 35rpx;
		height: 35rpx; 
		position: absolute;
		bottom: -6rpx;
	}
	
	.big-circle{
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		border: 2rpx solid #008BF8;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.small-circle{
		width: 26rpx;
		height: 26rpx;
		border-radius: 50%;
		background-color: #008BF8;
	}
</style>

<template>
	<view>
		<view class="fixed_bottom_mb140">
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="发布范围" :rightText="publishInfo.publishRange" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/goods_scope_ic.png" >
					</uni-list-item>
					<uni-list-item title="装货日期" :rightText="publishInfo.loadingDate" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/goods_date_ic.png" >
					</uni-list-item>
					<uni-list-item title="结算模式" rightText="月结模式" rightTextColor="#333"
						 thumb="../../static/images/mode_of_despatch_ic.png" >
					</uni-list-item>
				</uni-list>
			</view>
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="是否预付运费" rightText="是" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/goods_allow_the_order_ic.png" >
					</uni-list-item>
					<uni-list-item title="发货方式" :rightText="publishInfo.deliveryMode" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/mode_of_despatch_ic.png" >
					</uni-list-item>
					<uni-list-item title="货物信息" :rightText="publishInfo.sourceName + '/' + publishInfo.size + publishInfo.unit" 
						:ifDisplayBorBot="true" rightTextColor="#333" thumb="../../static/images/goods_description_of_goods_ic.png" >
					</uni-list-item>
					<uni-list-item title="所需船舶信息" :rightText="publishInfo.shipType" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/goods_ship_types_ic.png" >
					</uni-list-item>
					<uni-list-item title="船舶吨位" thumb="../../static/images/goods_tonnage_ic.png" >
						 <block slot="footer">
						 	<view class="flex text-r uni-align-c">
						 		<text class=" uni-mrl10">{{publishInfo.minTonnage}} ~ {{publishInfo.maxTonnage}}吨</text>
						 	</view>
						 </block>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="允许船东自动接单" :rightText="publishInfo.automaticOrderTake" :ifDisplayBorBot="true"
						 thumb="../../static/images/goods_allow_the_order_ic.png" rightTextColor="#333">
					</uni-list-item>
					<uni-list-item title="运费" :rightText="publishInfo.freight" :ifDisplayBorBot="true" rightTextColor="#edaf6c"
						 thumb="../../static/images/goods_freight_rates_ic.png" >
					</uni-list-item>
					<uni-list-item title="运输服务费" :rightText="publishInfo.serviceFee" rightTextColor="#edaf6c"
						 thumb="../../static/images/dispatch_fee_ic.png" >
					</uni-list-item>
				</uni-list>
			</view>
			<view class="margin20">
				<uni-list :radius="true">
					<uni-list-item title="始发地" thumb="../../static/images/goods_destination_ic.png" :ifDisplayBorBot="true">
						<block slot="footer">
							<view class="text-r">
								<view>{{publishInfo.loadAddressObj.abbreviation}}</view>
								<view>
									<text class="uni-common-mr20">{{publishInfo.loadAddressObj.name}}</text>
									<text>{{publishInfo.loadAddressObj.phone}}</text>
								</view>
							</view>
						</block>
					</uni-list-item>
					<uni-list-item title="目的地" thumb="../../static/images/goods_destination_ic.png" :ifDisplayBorBot="true">
						<block slot="footer">
							<view class="text-r">
								<view>{{publishInfo.unloadAddressObj.abbreviation}}</view>
								<view>
									<text class="uni-common-mr20">{{publishInfo.unloadAddressObj.name}}</text>
									<text>{{publishInfo.unloadAddressObj.phone}}</text>
								</view>
							</view>
						</block>
					</uni-list-item>
					<uni-list-item title="是否开启智能推送" :rightText="publishInfo.smartPush" :ifDisplayBorBot="true" rightTextColor="#333"
						 thumb="../../static/images/goods_allow_the_order_ic.png" >
					</uni-list-item>
					<view class="padding20">
						<text>备注：{{publishInfo.remarks}}</text>
					</view>
				</uni-list>
				
			</view>
		</view>
		
		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="confirmPreview">确认发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				publishInfo: {}
			}
		},
		onLoad() {
			this.publishInfo = this.$store.state.source.publishInfo
			console.log(this.$store.state.source.publishInfo)
		},
		methods: {
			//点击确认发布
			confirmPreview(){
				this.$store.commit('increaseSource')
				uni.switchTab({
					url: './source'
				})
			}
		}
	}
</script>

<style>

</style>

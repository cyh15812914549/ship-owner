<template>
	<view>
		<view class="top-area">
			<uni-nav-bar color="#ffffff" :background-color="bgColcor" @clickLeft="back()" :status-bar="true" left-icon="arrowleft"
			 title="发布货源">

				<block slot="left">
					<view>
						<text class="uni-common-ml30 font-size32" @click="clickCopy">复制</text>
					</view>
				</block>

			</uni-nav-bar>
		</view>
		<view :style="{paddingTop: totalTopHeight + 'px'}" class="fixed_bottom_mb140">
			<view class="uni-width-100P">
				<view class="uni-segmented-control">
					<uni-segmented-control :current="current" :values="items" @clickItem="selectDeliveryMode" style-type="button"
					 :active-color="bgColcor"></uni-segmented-control>
				</view>
			</view>

			<view>
				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="始发地" :rightTextColor="form.loadAddress.detail != '请选择' ? '#333' : '#999'" :required="true" 
						:rightText="form.loadAddress.detail"
						 :show-arrow="true" clickable="true" @click="selectAddress('loadAddress')" thumb="../../static/images/goods_destination_ic.png">
						</uni-list-item>
						<uni-list-item title="始发地吃水深度" :show-arrow="false" thumb="../../static/images/goods_draft_at_sisccharge_ic.png">
							<block slot="footer">
								<view class="text-r">
									<input placeholder="选填" v-model="form.startWaterDepth" class="alignment uni-common-mr20" />
									<text class="alignment">米</text>
								</view>
							</block>
						</uni-list-item>
						<uni-list-item title="目的地" :rightTextColor="form.unloadAddress.detail != '请选择' ? '#333' : '#999'" :required="true" 
						:rightText="form.unloadAddress.detail"
						 :show-arrow="true" clickable="true" @click="selectAddress('unloadAddress')" thumb="../../static/images/goods_destination_ic.png">
						
						</uni-list-item>
						<uni-list-item title="目的地吃水深度" thumb="../../static/images/goods_draft_at_sisccharge_ic.png">
							<block slot="footer">
								<view class="text-r">
									<input placeholder="选填" v-model="form.endWaterDepth" class="alignment uni-common-mr20" />
									<text class="alignment">米</text>
								</view>
							</block>
						</uni-list-item>
					</uni-list>
				</view>
				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="自动更新货源" :required="true" :show-arrow="false" :showSwitch="true" thumb="../../static/images/update_ic.png">
						</uni-list-item>
						<uni-list-item title="装货日期" thumb="../../static/images/goods_date_ic.png">
							<block slot="footer">
								<view class="text-r">
									<view @click="open">
										<text class="uni-common-mr20">{{formatCurDate}}</text>
										<uni-icons type="plusempty"></uni-icons>
										<text class="uni-common-mrl30">{{form.delayDay}}</text>
										<uni-icons type="arrowdown"></uni-icons>
									</view>
									<uni-popup ref="loadDate" type="bottom">
										<view class="uni-bg-white uni-width-100P loadDate-content">
											<view class="page_bg content-title">
												<text @click="clcikCancel">取消</text>
												<text>请选延后天数(天)</text>
												<text class=" uni-main-color" @click="clcikDefine">确定</text>
											</view>
											<picker-view :indicator-style="indicatorStyle" :value="0" @change="dayChange" class="picker-view">
												<picker-view-column>
													<view class="item" v-for="(item,index) in days" :key="index">{{item}}</view>
												</picker-view-column>
											</picker-view>
										</view>

									</uni-popup>
								</view>
							</block>
						</uni-list-item>
					</uni-list>
				</view>

				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="货物名称" :rightTextColor="form.sourceName != '请选择' ? '#333' : '#999'" :required="true" :rightText="form.sourceName"
						 :show-arrow="true" clickable="true" @click="selectGoods" thumb="../../static/images/goods_description_of_goods_ic.png">
						</uni-list-item>

						<uni-list-item title="货物数量" :rightTextColor="goodsNumberText != '请选择' ? '#333' : '#999'" :required="true" :rightText="goodsNumberText"
						 :show-arrow="true" clickable="true" @click="openDialog('goodsNumber')" thumb="../../static/images/goods_total_amount_of_goods_ic.png">
						</uni-list-item>

						<uni-list-item title="运价" :rightTextColor="freightRateText != '请选择' ? '#333' : '#999'" :required="true" :rightText="freightRateText"
						 :show-arrow="true" clickable="true" @click="openDialog('freightRate')" thumb="../../static/images/goods_freight_rates_ic.png">
						</uni-list-item>
					</uni-list>
				</view>

				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="所需船舶类型" :rightTextColor="form.shipType != '请选择' ? '#333' : '#999'" :required="true" :rightText="form.shipType"
						 :show-arrow="true" clickable="true" @click="openDialog('shipType')" thumb="../../static/images/goods_ship_types_ic.png">

						</uni-list-item>
						<uni-list-item title="所需船舶吨位" :required="true" :show-arrow="false" thumb="../../static/images/goods_tonnage_ic.png">
							<block slot="footer">
								<view class="flex text-r uni-align-c">
									<input style="width: 120rpx;" @blur="blurTonnage('min',$event)" placeholder="最小吨位" />
									<text class=" uni-mrl10">~</text>
									<input style="width: 120rpx;" @blur="blurTonnage('max',$event)" placeholder="最大吨位" />
									<text class=" uni-common-ml10">吨</text>
								</view>
							</block>
						</uni-list-item>
					</uni-list>
				</view>
			</view>

			<!-- 货物数量和运价弹窗 -->
			<uni-popup ref="dialogInput" type="dialog">
				<uni-popup-dialog :title="dialogTitle" type="info" @confirm="dialogConfirm">
					<view slot="body" class="uni-width-100P">
						<block v-if="dialogType == 'shipType'">
							<view>
								<view :class="[shipTypeIndex == index ? 'uni-bg-main-color' : 'uni-border']" :style="{width: unitWidth}" 
									class="border-radius15 block float-left"
								 v-for="(item,index) in shipTypeLists" :key="index" @click="selectShipType(item,index)">
									<text>{{item}}</text>
								</view>
								<view class="padding10 flex">
									<view :class="[ifDisplayInput ? 'uni-bg-main-color' : 'uni-border']" style="width: 100rpx;" 
											class="border-radius15 block"
									 @click="clickCustom">
										<text>自定义</text>
									</view>
									<view class="margin10" v-if="ifDisplayInput">
										<input @blur="inputBlur" placeholder="请输入船舶类型" class="input uni-border border-radius15" />
									</view>
								</view>
							</view>
						</block>
						<block v-else>
							<view>
								<input @blur="inputBlur" type="digit" class="border-radius15 uni-border uni-input" placeholder="请输入货物总量" v-if="dialogType == 'goodsNumber'" />

								<view v-if="dialogType == 'freightRate'" class="border-radius15 uni-border">
									<input @blur="inputBlur" type="digit" class="uni-input freightRate-input" placeholder="请输入运价" />
									<text class="freightRate-text">元/</text>
								</view>

							</view>
							<view :class="[unitIndex == index ? 'uni-bg-main-color' : 'uni-border']" :style="{width: unitWidth}" class="border-radius15 block float-left"
							 v-for="(item,index) in unitLists" :key="index" @click="selectUnit(item,index)">
								<text>{{item}}</text>
							</view>
						</block>
					</view>
				</uni-popup-dialog>
			</uni-popup>


		</view>

		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="nextStep">下一步</button>
		</view>

	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		Toast
	} from '../../common/common.js'

	import {
		mapState
	} from 'vuex'

	export default {

		data() {
			return {
				bgColcor: getApp().globalData.mainColor,
				items: ['按单次发货', '按批量发货'],
				days: [0, 1, 2, 3, 4, 5],
				indicatorStyle: `height: 50px;background: rgba($color: #a1d2ff, $alpha: 0.4);color: #a1d2ff;`,
				form: {
					loadAddress: {
						detail: '请选择',
					},
					unloadAddress: {
						detail: '请选择',
					},
					startWaterDepth: '',
					endWaterDepth: '',
					delayDay: 0,
					sourceName: '请选择',
					goodsNumber: '',
					freightRate: '',
					shipType: '请选择',
					minTonnage: 0,
					maxTonnage: 0
				},
				current: 0, // 当前选中的tab索引值，从0计数
				delayDay: 0,
				goodsNumberText: '请选择', 
				freightRateText: '请选择', 
				unitLists: [],
				unitIndex: -1,
				dialogInputValue: '',
				unitName: '',
				dialogType: 'goodsNumber', //goodsNumber货物数量 , freightRate运价
				dialogTitle: '货物数量',
				unitWidth: 'calc(calc(100% / 2) - 20rpx)',
				shipTypeIndex: -1,
				shipTypeLists: [
					'普通货船','集装箱船','滚装船','载驳货船',
					'散货船','兼用船','自卸船',
					'多用途船','干货船','不限',
				], //船舶类型
				ifDisplayInput: false,
			}
		},
		onShow() {
			uni.$on('selectData', (data) => {
				console.log(data,'data数据')
				if (data.sourceName) {
					this.form.sourceName = data.sourceName
				} else if (data.loadAddress) {
					this.form.loadAddress = data.loadAddress
				} else if (data.unloadAddress) {
					this.form.unloadAddress = data.unloadAddress
				}
				uni.$off('selectData')
			})
		},
		onHide() {

		},
		methods: {
			//输入的最小吨位或者最大吨位
			blurTonnage(type,e){
				let { value } = e.detail
				type == 'min' ? this.form.minTonnage = value : this.form.maxTonnage = value
			},
			//选择发货方式
			selectDeliveryMode(index){
				this.current = index
			},
			nextStep(){
				let infoObj = {
					loadAddress: this.form.loadAddress.detail,
					loadAddressObj: this.form.loadAddress,
					unloadAddress: this.form.unloadAddress.detail,
					unloadAddressObj: this.form.unloadAddress,
					shipType: this.form.shipType,
					minTonnage: this.form.minTonnage,
					maxTonnage: this.form.maxTonnage,
					endCity: this.form.unloadAddress.abbreviation,
					startCity: this.form.loadAddress.abbreviation,
					loadingDate: this.formatCurDate,
					price: this.form.freightRate,
					size: this.form.goodsNumber,
					sourceName: this.form.sourceName,
					unit: this.unitName,
					deliveryMode: this.current == 0 ? '按单次发货' : '按批量发货',
				}
				this.$store.commit('savePublishInfo',infoObj)
				let freight = (this.form.goodsNumber * this.form.freightRate).toFixed(2)
				uni.navigateTo({
					url: './publish-source-next',
					success(res) {
						res.eventChannel.emit('freight', { freight })
					}
				})
			},
			//输入货物数量，输入运价后触发
			inputBlur(e) {
				this.dialogInputValue = e.detail.value
			},
			// 选择单位
			selectUnit(item, index) {
				this.unitName = item
				this.unitIndex = index
			},
			// 选择船舶类型
			selectShipType(name, index) {
				this.ifDisplayInput = false
				this.shipTypeIndex = index
				this.form.shipType = name
			},
			//点击其它  输入其它船舶类型
			clickCustom() {
				this.shipTypeIndex = -1
				this.ifDisplayInput = !this.ifDisplayInput
			},
			//确定输入的货物数量或者运价
			dialogConfirm(done) {
				// 没有输入货物数量或者运价时提示
				if (this.dialogInputValue == '' && this.dialogType != 'shipType') return Toast({title: '请输入合法值'})
				switch (this.dialogType) {
					case 'goodsNumber':
						this.form.goodsNumber = this.dialogInputValue
						this.goodsNumberText = this.dialogInputValue + ' ' + this.unitName
						break
					case 'freightRate':
						this.form.freightRate = this.dialogInputValue
						this.freightRateText = this.dialogInputValue + '元/' + this.unitName
						break
					case 'shipType':
						if(this.ifDisplayInput == true) {
							if(this.dialogInputValue == '') return Toast({title: '请输入船舶类型'})
							this.form.shipType = this.dialogInputValue
						}
						break
				}
				//解决关闭弹窗时再次点击时input组件还有值
				this.dialogType = ''
				done()
			},
			//点击选择起点终点地址
			selectAddress(name) {
				uni.navigateTo({
					url: `../addressManage/select-address?operation=${name}`,
				})
			},
			//选择货物的类型
			selectGoods() {
				uni.navigateTo({
					url: './goods-type'
				})
			},
			//打开弹窗（货物数量、运价、船舶类型三者）
			openDialog(type) {
				//每次打开的时候重新初始化
				this.unitIndex = -1
				this.dialogInputValue = ''
				this.ifDisplayInput = false
				this.dialogType = type
				//如果点击的是填写运价，先判断有没有填写货物数量
				if (type == 'freightRate' && this.goodsNumberText == '请选择') {
					Toast({
						title: '请先选择货物数量!'
					})
					return
				}
				switch (type) {
					case 'goodsNumber':
						this.unitLists = ['吨', '方', '柜']
						this.unitWidth = 'calc(calc(100% / 3) - 20rpx)'
						this.dialogTitle = '货物数量'
						break
					case 'freightRate':
						let gnArr = this.goodsNumberText.split(' ')
						console.log(gnArr,'gnArr') 
						this.unitLists = ['整单', ...gnArr[1]]
						this.unitWidth = 'calc(calc(100% / 2) - 20rpx)'
						this.dialogTitle = '运价'
						break
					case 'shipType':
						this.dialogTitle = '选择船舶类型'
						break
				}
				this.$refs.dialogInput.open()
			},
			clickCopy() {

			},
			// 打开延迟天数弹窗 unitIndex: -1,
			open() {
				this.$refs.loadDate.open()
			},
			// 点击取消按钮，关闭延迟天数弹窗
			clcikCancel() {
				this.$refs.loadDate.close()
			},
			// 点击延迟天数弹窗的确定按钮
			clcikDefine() {
				this.$refs.loadDate.close()
				this.form.delayDay = this.delayDay
			},
			//延迟天数滚动时触发
			dayChange(e) {
				let val = e.detail.value
				this.delayDay = val[0]
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		},
		computed: {
			...mapState({
				totalTopHeight: state => state.login.totalTopHeight
			}),
			formatCurDate: function() {
				return this.$moment(new Date()).format('YYYY-MM-DD')
			}
		},
		components: {
			uniPopupDialog,
		},
	}
</script>

<style lang="scss">
	.block {
		margin: 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		box-sizing: border-box;
	}

	.freightRate-input {
		display: inline-block;
		width: calc(100% - 110rpx);
		vertical-align: middle;
	}

	.freightRate-text {
		width: 60rpx;
		display: inline-block;
		vertical-align: middle;
		text-align: center;
	}

	.picker-view {
		width: 750rpx;
		height: 520rpx;
	}

	.item {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.uni-segmented-control {
		width: 60%;
		margin: 30rpx auto;
	}

	.alignment {
		display: inline-block;
		vertical-align: middle;
	}

	.loadDate-content {
		height: 600rpx;
	}

	.content-title {
		display: flex;
		justify-content: space-around;
		height: 80rpx;
		line-height: 80rpx;
	}

	.input {
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 15rpx;
		border: 2rpx solid $uni-border-color;
		border-radius: 15rpx;
	}
</style>

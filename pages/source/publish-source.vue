<template>
	<view>
		<view class="top-area">
			<uni-nav-bar color="#ffffff" :background-color="bgColcor" @clickLeft="back" :status-bar="true" left-icon="arrowleft"
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
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button"
					 :active-color="bgColcor"></uni-segmented-control>
				</view>
			</view>

			<view>
				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="始发地" :required="true" rightText="请选择" :show-arrow="true" link to="/pages/addressManage/select-address"
						 thumb="../../static/images/goods_destination_ic.png">
						</uni-list-item>
						<uni-list-item title="始发地吃水深度" :show-arrow="false" thumb="../../static/images/goods_draft_at_sisccharge_ic.png">
							<block slot="footer">
								<view class="text-r">
									<input placeholder="选填" class="alignment uni-common-mr20" />
									<text class="alignment">米</text>
								</view>
							</block>
						</uni-list-item>
						<uni-list-item title="目的地" rightText="请选择" :required="true" :show-arrow="true" thumb="../../static/images/goods_destination_ic.png">

						</uni-list-item>
						<uni-list-item title="目的地吃水深度" thumb="../../static/images/goods_draft_at_sisccharge_ic.png">
							<block slot="footer">
								<view class="text-r">
									<input placeholder="选填" class="alignment uni-common-mr20" />
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
						<uni-list-item title="装货日期" :show-arrow="true" thumb="../../static/images/goods_date_ic.png">
							<block slot="footer">
								<view class="text-r">
									<view @click="open">
										<text class="uni-common-mr20">{{formatCurDate}}</text>
										<uni-icons type="plusempty"></uni-icons>
										<text class="uni-common-mrl30">3</text>
										<uni-icons type="arrowdown"></uni-icons>
									</view>
									<uni-popup ref="loadDate" type="bottom">
										<view class="uni-bg-white uni-width-100P loadDate-content">
											<view class="page_bg content-title">
												<text>取消</text>
												<text>请选延后天数(天)</text>
												<text class=" uni-main-color">确定</text>
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
						<uni-list-item title="货物名称" :required="true" :show-arrow="true" thumb="../../static/images/goods_description_of_goods_ic.png">
							<block slot="right">
								<view>请选择</view>
							</block>
						</uni-list-item>
						<uni-list-item title="货物数量" :required="true" :show-arrow="true" thumb="../../static/images/goods_total_amount_of_goods_ic.png">
							<block slot="right">
								<view>请选择</view>
							</block>
						</uni-list-item>
						<uni-list-item title="运价" :required="true" :show-arrow="true" thumb="../../static/images/goods_freight_rates_ic.png">
							<block slot="right">
								<view>请选择</view>
							</block>
						</uni-list-item>
					</uni-list>
				</view>

				<view class="margin20">
					<uni-list :radius="true">
						<uni-list-item title="所需船舶类型" :required="true" :show-arrow="true" thumb="../../static/images/goods_ship_types_ic.png">
							<block slot="right">
								<view>请选择</view>
							</block>
						</uni-list-item>
						<uni-list-item title="所需船舶吨位" :required="true" :show-arrow="false" thumb="../../static/images/goods_tonnage_ic.png">
							<block slot="right">
								<view>请选择</view>
							</block>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>

		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-90P">下一步</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				bgColcor: getApp().globalData.mainColor,
				items: ['按单次发货', '按批量发货'],
				moment: this.MOMENT,
				days: [0, 1, 2, 3, 4, 5],
				indicatorStyle: `height: 50px;background: rgba($color: #a1d2ff, $alpha: 0.4);color: #a1d2ff;`
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			clickCopy() {

			},
			onClickItem() {

			},
			open() {
				this.$refs.loadDate.open()
			},
			dayChange(e){
				let val = e.detail.value
				console.log(e,val)
			}
		},
		computed: {
			...mapState({
				totalTopHeight: state => state.login.totalTopHeight
			}),
			formatCurDate: function() {
				return this.moment(new Date()).format('YYYY-MM-DD')
			}
		},
	}
</script>

<style lang="scss">
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
</style>

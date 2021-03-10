<template>
	<view class="uni-height-100P">
		<view class="pos_relative" style="height: 600rpx;">
			<map style="width: 100%; height: 600rpx;" :latitude="covers[0].latitude" :longitude="covers[0].longitude" :markers="covers">
			</map>
			<view style="top: 0;left: 0;width: 710rpx;" class="margin20 flex pos_absolute">
				<view class="picker-text pro_city_box">
					<picker mode="region" :value="region" @change="regionChange">
						<view>
							<uni-icons type="location-filled" :color="mainColor"></uni-icons>
							<text class="uni-common-ml10">{{displayArea}}</text>
						</view>
					</picker>
				</view>
				<view class="uni-flex1 uni-common-ml30">
					<input class="search_input" placeholder="请输入关键字" @input="bindInput" />
				</view>
				<view class="uni-common-ml30 pro_city_box" style="flex: 0 1 120rpx;" @click="clickSearch">
					<text class="uni-main-color">搜索</text>
				</view>
			</view>
		</view>

		<scroll-view scroll-y style="height: calc(100% - 600rpx);" class="uni-width-100P uni-bg-white uni-border"
		 @scrolltolower="pullUpLoading">
			<view class="border_bottom uni-common-ptb20 uni-common-ml20 flex" v-for="(item,index) in defaultAddressLists" :key="item.title"
			 @click="selectAddress(item,index)">
				<view class="uni-flex1">
					<view>{{item.title}}</view>
					<view>{{item.address}}</view>
				</view>
				<view class="uni-flex uni-justify-c uni-align-c" style="flex: 0 1 120rpx;" v-if="addressIndex == index">
					<uni-icons type="checkbox" :color="mainColor"></uni-icons>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 引入SDK核心类
	const QQMapWX = require('../../common/qqmap-wx-jssdk.js');

	import {
		WXShowModal
	} from '../../common/common.js'

	import {
		goBack
	} from '../../common/common.js'

	// 实例化API核心类
	const qqmapsdk = new QQMapWX({
		key: 'OAYBZ-7D2WG-C25QL-IVH7Q-IQQRH-IEF6D' // 必填
	});

	// const eventChannel = this.getOpenerEventChannel()

	export default {
		data() {
			return {
				covers: [{
					id: 1,
					width: 50,
					height: 50,
					latitude: 39.984060,
					longitude: 116.307520,
					iconPath: '../../static/images/location_home.png'
				}],
				defaultAddressLists: [],
				mainColor: getApp().globalData.mainColor,
				addressIndex: -1,
				region: ['广东省', '广州市', '海珠区'],
				qqmapsdkAddress: '北京市北京市东城区', //定位到哪个城市进行搜索
				qqmapsdkLocation: '', //周边搜索中心点
				searchValue: '', //搜索的地址
				displayArea: '东城区',
			}
		},
		created() {
			this.initMap()
		},
		onLoad(option) {
			
		},
		methods: {
			bindInput(e) {
				let {
					value
				} = e.detail
				this.searchValue = value
			},
			regionChange(e) {
				let {
					value
				} = e.detail
				this.qqmapsdkAddress = value.join('')
				this.displayArea = value[value.length - 1]
				this.initMap()
			},
			initMap() {
				let _this = this
				_this.addressIndex = -1
				//调用地址解析接口
				qqmapsdk.geocoder({
					//获取表单传入地址  
					address: _this.qqmapsdkAddress, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
					success: function(res) { //成功后的回调
						let result = res.result,
							location,
							latitude = result.location.lat,
							longitude = result.location.lng

						location = latitude + ',' + longitude
						_this.qqmapsdkLocation = location

						_this.covers[0].latitude = latitude
						_this.covers[0].longitude = longitude

						//初始化显示的地址列表
						_this.searchAddress()
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			pullUpLoading() {
				console.log('上拉加载')
			},
			selectAddress(item, index) {
				this.addressIndex = index
				this.covers[0].latitude = item.latitude
				this.covers[0].longitude = item.longitude
				WXShowModal({
					content: '是否确认选择该地址?'
				}, () => {
					// uni.$emit('update',{item})
					const eventChannel = this.getOpenerEventChannel()
					eventChannel.emit('returnData', item);
					
					goBack()
				}, () => {

				})
			},
			clickSearch() {
				this.searchAddress(this.searchValue)
			},
			searchAddress(keyword = '政府') {
				let _this = this
				_this.addressIndex = -1
				// 调用接口
				qqmapsdk.search({
					keyword: keyword, //搜索关键词
					location: _this.qqmapsdkLocation, //设置周边搜索中心点
					page_size: 10, //每页条目数，最大限制为20条，默认值10
					success: function(res) { //搜索成功后的回调
						console.log(res, "搜索结果");
						let mks = []
						for (let i = 0; i < res.data.length; i++) {
							mks.push({ // 获取返回结果，放到mks数组中
								id: res.data[i].id,
								title: res.data[i].title,
								address: res.data[i].address,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng
							})
						}
						_this.defaultAddressLists = mks
					},
					fail: function(res) {
						console.log(res, 'fail');
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pro_city_box {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		justify-content: center;
		background-color: #F8F8F8;
		flex-direction: row;
		align-items: center;
		height: 36px;
		padding: 10px;
		border-width: 0.5px;
		border-style: solid;
		border-color: $uni-border-color;
		border-radius: 5px;
		color: $uni-text-main-color;
	}

	.search_input {
		background-color: #F8F8F8;
		height: 36px;
		width: 100%;
		padding-left: 15rpx;
		border-width: 0.5px;
		border-style: solid;
		border-color: $uni-border-color;
		border-radius: 5px;
	}
</style>

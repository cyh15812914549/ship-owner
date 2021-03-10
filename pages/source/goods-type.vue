<template>
	<view>
		<view class="fixed_bottom_mb140">
			<view class="uni-bg-white uni-common-mtb20">
				<view class="blockDiv">
					<view :class="[typeIndex == index ? 'uni-bg-main-color block' : 'block uni-border']" 
						v-for="(item,index) in typeLists" :key="index" @click="selectType(item,index)">
						<text>{{item}}</text>
					</view>
				</view>
				<view class="padding10 flex">
					<view :class="[ifDisplayInput ? 'uni-bg-main-color block' : 'block uni-border']" @click="clickCustom"><text>自定义</text></view>
					<view class="margin10" v-show="ifDisplayInput"><input placeholder="请输入货物类型" class="input" /></view>
				</view>
			</view>
			<view class="uni-bg-white flex uni-justify-sb padding20">
				<veiw>
					<text>是否危险品</text>
				</veiw>
				<view>
					<checkbox-group>
						<label>
							<checkbox value="" :color="mainColor" checked="true" />否
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100" @click="clickDefine">确定</button>
		</view>
	</view>
</template>

<script>
	
	import {goBack} from '../../common/common.js'
	
	export default {
		data() {
			return {
				typeLists: [
					'煤', '钢卷', '水泥熟料', '石灰石', '水泥', '中板', '钢材',
					'石子', '玉米', '大豆', '烟煤', '煤炭', '矿渣粉', '集装箱',
					'熟料', '带钢', '水渣', '石膏粉', '吉柜', '炉渣', '白云石',
					'螺纹钢', '热卷', '天然石膏', '鹅卵石',
					'钢板', '石灰', '木薯大包', '矿粉', '碎石'
				],
				ifDisplayInput: false,
				mainColor: getApp().globalData.mainColor,
				typeIndex: -1,
				sourceName: '',
				
			}
		},
		onLoad(options) {
			
		},
		methods: {
			selectType(name,index){
				this.ifDisplayInput = false
				this.typeIndex = index
				this.sourceName = name
			},
			clickCustom() {
				this.typeIndex = -1
				this.ifDisplayInput = !this.ifDisplayInput
			},
			clickDefine(){
				uni.$emit('selectData',{sourceName: this.sourceName})
				goBack()
			}
		}
	}
</script>

<style lang="scss">
	.width25P {
		width: 25%;
	}

	.blockDiv {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;
	}

	.block {
		width: calc(calc(100% / 4) - 25rpx);
		margin: 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		box-sizing: border-box;
	}


	.input {
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 15rpx;
		border: 2rpx solid $uni-border-color;
		border-radius: 15rpx;
	}
</style>

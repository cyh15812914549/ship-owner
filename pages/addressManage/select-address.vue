<template>
	<view>
		<!-- 搜索 -->
		<view class="margin20">
			<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		</view>
		
		<view class="margin20">
			<block v-for="(item,index) in addressLists" :key="index">
				<view @click="checkDetail(item)" class="padding20 uni-common-mt20 uni-bg-white flex uni-justify-sb">
					<view>
						<view>{{item.abbreviation}}</view>
						<view class="uni-h4">{{item.detail}}</view>
						<view class="font-size32">
							<text>{{item.name}}</text>
							<text class="uni-common-ml20">{{item.phone}}</text>
						</view>
					</view>
					<view class="flex uni-align-c">
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
			</block>
		</view>
		
		<view class="fixed_bottom">
			<button class="uni-bg-main-color uni-width-70P border-radius100 ">新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressLists: [
					{abbreviation: '地址简称1',detail: '详细地址1',name: '货主名1',phone: '12345678945'},
					{abbreviation: '地址简称2',detail: '详细地址2',name: '货主名2',phone: '12345678912'},
				]
			}
		},
		methods: {
			checkDetail(data){
				uni.navigateTo({
					url: './add-address?address=' + JSON.stringify(data)
				})
			}
		}
	}
</script>

<style>

</style>

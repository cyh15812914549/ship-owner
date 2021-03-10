<template>
	<view>
		<form @submit="clickSave">
			<view class="uni-common-mt20">
				<uni-list>
					<uni-list-item title="地址名称" :ifDisplayBorBot="true" :show-arrow="false">
						<block slot="footer">
							<view class="text-r w400 ">
								<input name="abbreviation" v-model="address.abbreviation" placeholder="例如: 黄埔港(10个字以内)" />
							</view>
						</block>
					</uni-list-item>
					<uni-list-item title="联系人名称" :ifDisplayBorBot="true" :show-arrow="false">
						<block slot="footer">
							<view class="text-r">
								<input name="name" v-model="address.name" placeholder="请输入联系人名称" />
							</view>
						</block>
					</uni-list-item>
					<uni-list-item title="联系人号码" :ifDisplayBorBot="true" :show-arrow="false">
						<block slot="footer">
							<view class="text-r">
								<input name="phone" maxlength="11" type="number" v-model="address.phone" placeholder="请输入联系人号码" />
							</view>
						</block>
					</uni-list-item>
					<uni-list-item title="详细地址" clickable="true" @click="selectAddress" :show-arrow="true">
						<block slot="footer">
							<view class="text-r w400">
								<input name="detail" v-model="address.detail" disabled placeholder="请选择" class=" uni-common-mr10" />
							</view>
						</block>
					</uni-list-item>
				</uni-list>
				
			</view>
			
			<view class="fixed_bottom">
				<button class="uni-bg-main-color uni-width-70P border-radius100 " form-type="submit">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		goBack
	} from '../../common/common.js'

	export default {
		data() {
			return {
				address: {
					id: '',
					abbreviation: '',
					detail: '',
					name: '',
					phone: ''
				},
				operation: 'add'
			};
		},
		onLoad(options) {
			if (options.address) {
				this.address = JSON.parse(options.address)
				console.log(this.address)
				this.operation = 'update'
			}
		},
		onShow() {

		},
		methods: {
			clickSave(e) {
				this.operation == 'add' ? this.$store.commit('increaseAddress', this.address) :
					this.$store.commit('updateAddress', this.address)
				goBack()
			},
			selectAddress() {
				uni.navigateTo({
					url: './address-map',
					events: {
						returnData: (data) => {
							this.address.detail = data.address
							this.operation == 'add' ? this.address.id = data.id : null
						},
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.w400 {
		width: 400rpx;
	}
</style>

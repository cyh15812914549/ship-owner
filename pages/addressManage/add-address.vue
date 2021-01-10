<template>
	<view>
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="地址名称" :ifDisplayBorBot="true" :show-arrow="false">
					<block slot="footer">
						<view class="text-r" style="width: 400rpx;">
							<input :value="address.abbreviation" placeholder="例如: 黄埔港(10个字以内)" />
						</view>
					</block>
				</uni-list-item>
				<uni-list-item title="联系人名称" :ifDisplayBorBot="true" :show-arrow="false" >
					<block slot="footer">
						<view class="text-r">
							<input :value="address.detail" placeholder="请输入联系人名称" />
						</view>
					</block>
				</uni-list-item>
				<uni-list-item title="联系人号码" :ifDisplayBorBot="true" :show-arrow="false" >
					<block slot="footer">
						<view class="text-r">
							<input :value="address.name" placeholder="请输入联系人号码" />
						</view>
					</block>
				</uni-list-item>
				<uni-list-item title="详细地址" :show-arrow="true">
					<block slot="footer">
						<view class="text-r">
							<input :value="address.phone" placeholder="请选择" class=" uni-common-mr10" />
						</view>
					</block>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: {}
			};
		},
		onLoad(options) {
			this.address = JSON.parse(options.address)
		}
	}
</script>

<style lang="scss">

</style>

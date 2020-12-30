<template>
	<view>
		<!-- <view class="uni-padding-wrap uni-common-mt">
			<view class="image-wrapper uni-center-cr">
				<image class="image" mode="widthFix" src="@/static/images/hdd_main_logo.png" />
			</view>

			<view>
				<form @submit="formSubmit">
					<view class="uni-flex border_bottom uni-common-prl20">
						<view class="uni-flex uni-align-c">
							<text class="icon iconfont icon-shouji color-666" style="font-size: 1.4em;"></text>
						</view>
						<view>
							<input class="uni-input" type="number" value="" maxlength="11" name="phoneNumber" placeholder="请输入手机号码" />
						</view>
					</view>
					<view class="uni-flex border_bottom uni-common-mt60 uni-common-prl20">
						<view class="uni-flex uni-align-c">
							<text class="icon iconfont icon-mima color-666" style="font-size: 1.4em;"></text>
						</view>
						<view class="uni-flex1">
							<input class="uni-input" name="password" value="" placeholder="请输入密码" :password="showPassword" />
						</view>
						<view class="text-r">
							<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
						</view>
					</view>
					<view class="uni-form-item uni-column" v-show="ifDisplayCanvas">
						<view class="title">验证码</view>
						<view style="display: flex;flex-direction: row;flex-wrap: nowrap;">
							<input class="uni-input" name="verCode" placeholder="请输入验证码" />
							<view class="canvas-img-code uni-common-ml20" @click="refresh()">
								<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
							</view>
						</view>
					</view>
					<view class="uni-btn-v uni-common-mt50">
						<button class="global-button" form-type="submit">登录</button>
					</view>
				</form>
			</view>

			<view class="uni-display-flex uni-justify-sb color-666 uni-common-prl20">
				<text @click="register">快速注册</text>
				<text @click="forgetPass">忘记密码?</text>
			</view>
			
		</view> -->
		
		<view style="position: relative;height: 200rpx;width: 200rpx;background-color: #576B95;">
			<view style="margin-top: 80rpx;background-color: #008BF8;">452154</view>
			<view style="background-color: #09BB07;position: absolute;top: 50%;
      transform: translateY(-50%);right: 5%;">
				测试一下
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		checkPhoneNumber,
		checkLoginPassword
	}
	from '../../utils/validate.js'
	
	import { Toast } from '../../common/common.js'
	

	import md5 from '../../utils/md5.min.js'

	export default {
		data() {
			return {
				showPassword: true,
				phoneNumber: '',
				password: '',
				openid: '',
				ifDisplayCanvas: false,
				width: 120,
				height: 40,
				verCode: '',
			}
		},
		onLoad(options) {
			const shape = {
			  radius: 10,
			  diameter() {
			    return this.radius * 2
			  },
			  perimeter: () => 2 * Math.PI * this.radius,
			  perimeter2() {
				  const func = () => 2 * Math.PI * this.radius
				  return func()
			  },
			}
		
			// console.log(shape.diameter.call(shape))
			
			
			
		},
		onShow() {
			 // #ifdef MP-WEIXIN
				uni.hideHomeButton()
			// #endif
		},
		onReady() {
			this.initImgCode()
		},
		methods: {
			// 初始化验证码
			initImgCode() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "2", "3", "4", "5", "6", "7", "8", "9"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			//刷新
			refresh() {
				this.initImgCode();
			},
			canvasIdErrorCallback(e) {
				console.error(e.detail.errMsg)
			},
			changePassword() {
				this.showPassword = !this.showPassword;
			},
			register() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			forgetPass() {
				uni.navigateTo({
					url: '/pages/login/forgetPassword'
				})
			},
			//登录
			formSubmit(e) {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			// 检查用户名和密码输入的有效性
			checkLoginInfo() {
				if (checkPhoneNumber(this.phoneNumber)) {
					if (checkLoginPassword(this.password)) {
						if (this.ifDisplayCanvas) {
							if (this.verCode == '' || this.verCode == null) {
								Toast({
									title: '请输入图形验证码'
								})
								return false
							}
							
							if (this.verCode.length == 4 && this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
								Toast({
									title: '验证码不正确'
								});
								return false;
							}
						} else {
							return true
						}
					}else {
						return false
					}
				}else {
					return false
				}
				
				

				if (!this.password) {
					console.log(this.password)
					Toast({
						title: '请输入正确的密码'
					})
					return false
				}
				return true
			},
		},
		components:{
		}
	}
</script>

<style lang="scss">
	
	.uni-padding-wrap{
		width:630rpx;
		padding:0 60rpx;
	}
	
	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		/* padding: 8px 13px; */
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.image-wrapper {
		height: 340rpx;
	}

	.image {
		height: 240rpx;
		width: 240rpx;
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		margin-top: 15rpx;
		margin-right: 20rpx;
		line-height: 24px;
		color: #999999;
	}

	.uni-eye-active {
		color: #007AFF;
	}


	.foot {
		position: fixed;
		left: 0;
		bottom: 30rpx;
		width: 750rpx;
		text-align: center;

		view:nth-child(1) {
			color: #444;
		}
	}
	
	.canvas-img-code {
		display: inline-block;
	}
</style>

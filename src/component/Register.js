/**
 * Created by zhanghua on 2017/2/6.
 */
import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    StyleSheet,
    StatusBar,
    Platform,
    Dimensions,
    Button,
} from "react-native"


const styles = StyleSheet.create({})

var getWidth = px => Dimensions.get('window').width / 750 * px;
var getHeight = px => Dimensions.get('window').height / 1334 * px;

function propsEqual(a, b) {
    if (a === b)
        return true
    if (!a || !b) {
        return !a && !b ? true : false
    }
    return Object.keys(a).length === Object.keys(b).length && !Object.keys(a).reduce((flag, key) => flag || a[key] !== b[key], false)
}
export default class Register extends Component {

    
    isCountDown = false;

    constructor(props) {
        super(props);
    }

    sendtxt = '发送验证码'



    cellphone = null
    code = null
    password = null
    countdown = 60;

    sendtimestamp = ''
    codeButton = false

    cellphoneChange = (t) => {
        let mobile = /^1\d*$/.exec(t)
        if (!mobile) {
            this.cellphone = ''
        }
        else {
            this.cellphone = mobile[0]
        }
        // console.log( /\d+/.exec(t));
    }


    countDown = () => {
        // 设置是否倒计时标志位
        this.isCountDown = true
        this.codeButton = true;
        // 开始倒计时
        this.sendtimestamp = Date.parse(new Date()) / 1000 + 1;
        this.interval = setInterval(() => {
            if (this.countdown > 0) {
                this.countdown = ((60 + this.sendtimestamp - Math.round(Date.parse(new Date()) / 1000)) - 1) > 0 ? (60 + this.sendtimestamp - Math.round(Date.parse(new Date()) / 1000)) - 1 : 0
            } else {
                this.resetCountDown();
            }

        }, 1000);


    }


    resetCountDown() {
        // 停止计时
        this.isCountDown = false
        this.sendtxt = '发送验证码'
        this.codeButton = false;
        clearInterval(this.interval);
        this.countdown = 60;
    }




    //清空定时器
    clear() {
        super.clear()
        this.interval && clearInterval(this.interval);

    }


    onSendVerificationCode = () => {
        if (!this.checkPhone()) return;
        this.callProxy('sendVerificationCode', {cellphone: this.cellphone})
        this.sendtxt = '发送中'
        console.log('开始发送验证码')
        this.codeButton = true

    }

    checkPhone() {
        if (!this.cellphone) {
            alert("请输入手机号", 1, 1);
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.cellphone.replace(/(^\s*)|(\s*$)/g, "")))) {//手机号码验证规则
            alert("请输入正确的手机号", 1, 1);
            return false;
        }

        return true;
    }

    checkCode() {
        if (!this.code) {
            alert("请输入验证码", 1, 1);
            return false;
        }
        if (this.code.length != 4) {
            alert("请输入正确的验证码", 1, 1);
            return false;
        }
        return true;
    }

    checkPwd() {
        if (!this.password) {
            alert("请输入密码", 1, 1);
        }
        // if (this.password.length > 0 && this.password.length < 6) {
        // 	this.showToast("请输入6位以上密码", 1, 1);
        // 	return false;
        // }
        if (!/^(\w){6,20}$/.exec(this.password.replace(/(^\s*)|(\s*$)/g, ""))) {
            // if( !(/^[A-Za-z0-9]+$/.test(this.userinfo.password)) || this.userinfo.password.length < 6 || this.userinfo.password.length > 12 || this.userinfo.password==null || this.userinfo.password==undefined || this.userinfo.password=='' ){//不是数字或者字母
            alert("请正确输入6-20位以上密码", 1, 1);
            return false;
        }

    }



    funcDic = new Map()
    createProps(key, obj) {
        if ((typeof obj) === 'function')
            return this.createFunc(key, obj)

        var o = null
        !(this.funcDic.has(key) && propsEqual(o = this.funcDic.get(key), obj) ) && this.funcDic.set(key, o = obj)
        return o
    }
    createFunc(key, func) {
        var f = null;
        this.funcDic.has(key) ? f = this.funcDic.get(key) : this.funcDic.set(key, f = func)
        return f
    }

    render() {
        var container = {
            flex: 1,
            backgroundColor: '#fff'
        }
        // 顶部导航
        var navBar = {
            height: getWidth(109),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: getHeight(3),
            marginTop: Platform.OS === 'ios' ? 0 : -Dimensions.get("window").height / 1334 * 40
        }
        //后退按钮
        var backWrap = {
            width: getWidth(200),
            height: getWidth(109),
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginRight: getWidth(30)
        }
        var backIcon = {
            width: getWidth(50),
            height: getWidth(50),
        }
        var backTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
            marginBottom: getHeight(6),
        }

        //注册文字
        var registTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(34),
        }
        //input 输入框 按钮等 主要部分
        var mainBox = {
            paddingHorizontal: getWidth(60),
            paddingTop: getHeight(100)
        }
        //请输入手机号
        var phoneIptWrap = {
            height: getHeight(88),
            borderStyle: 'solid',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#979797',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getHeight(42)
        }
        var phoneIptIcon = {
            width: getWidth(30),
            height: getHeight(44),
            marginLeft: getWidth(30),
            marginRight: getWidth(52)
        }
        var phoneIpt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
            padding: 0,
            height: getHeight(88),
            width: getWidth(400),
            // alignSelf: 'center'
        }
        //请输入验证码
        var codeWrap = {
            height: getHeight(68),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: getHeight(22)

        }
        var codeIptWrap = {
            width: getWidth(410),
            height: getHeight(68),
            borderStyle: 'solid',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#979797',
            flexDirection: 'row',
            alignItems: 'center'

        }
        var codeIptIcon = {
            width: getWidth(44),
            height: getHeight(34),
            marginLeft: getWidth(24),
            marginRight: getWidth(48)
        }
        var codeIpt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
            width: getWidth(300),
            height: getHeight(68),
            padding: 0,
            // alignSelf: 'center'
        }
        //发送验证码按钮
        // 可点状态
        var codeBtnWrap = {
            width: getWidth(180),
            height: getHeight(68),
            backgroundColor: '#ee5050',
            justifyContent: 'center',
            alignItems: 'center'
        }
        //不可点状态
        var codeBtnWrap_ = {
            width: getWidth(180),
            height: getHeight(68),
            backgroundColor: '#fbbebe',
            justifyContent: 'center',
            alignItems: 'center'
        }
        var codeBtnTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#fff',
            fontSize: getHeight(28),
        }
        //请输入密码部分
        var psdIptIcon = {
            width: getWidth(36),
            height: getHeight(44),
            marginLeft: getWidth(28),
            marginRight: getWidth(55)
        }
        //控制显示隐藏按钮
        var showPsdWrap = {
            width: getWidth(120),
            height: getHeight(88),
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            right: 0,
            top: 0
        }
        var showPsdTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#ee5050',
            fontSize: getHeight(28),
        }
        //提示
        var tipWrap = {
            marginTop: getHeight(20),
            marginBottom: getHeight(25),
            flexDirection: 'row',
            justifyContent: 'center'
        }
        var tipTxt_ = {
            fontFamily: 'PingFangSC-Light',
            color: '#9b9b9b',
            fontSize: getHeight(24)
        }
        var tipTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#ee5050',
            fontSize: getHeight(24),
            textDecorationLine: 'underline'
        }
        //同意并注册按钮
        var btnWrap = {
            height: getHeight(88),
            backgroundColor: '#ee5050',
            justifyContent: 'center',
            alignItems: 'center'
        }
        var btnTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#fff',
            fontSize: getHeight(34),

        }


        //登录按钮
        var registWrap = {
            width: getWidth(200),
            height: getWidth(109),
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: getWidth(30)
        }
        var registTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
        }


        //微信快捷登录
        var wxTitle = {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: getHeight(34)
        }
        var wxLine = {
            width: getWidth(210),
            height: StyleSheet.hairlineWidth,
            backgroundColor: '#bfbfbf'
        }
        var wxTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
        }
        var wxTouch = {
            width: getWidth(200),
            height: getHeight(200),
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: getHeight(54)
        }
        var wxIcon = {
            width: getWidth(98),
            height: getHeight(98),
        }


        return (
            <View style={this.createProps('container', container)}>
                <StatusBar
                    barStyle="dark-content"
                    networkActivityIndicatorVisible={true}
                />
                <View style={this.createProps('navBar', navBar)}>
                    {/*返回按钮*/}
                    <TouchableOpacity style={this.createProps('backWrap', backWrap)} onPress={this.backPress}>
                        <Image style={this.createProps('backIcon', backIcon)}
                               source={require("../assert/backblack.png")}/>
                        {/*<Text style={this.createProps('backTxt',backTxt)}> 登录</Text>*/}
                    </TouchableOpacity>
                    {/*注册Title*/}
                    <Text style={this.createProps('registTxt', registTxt)}>注册</Text>
                    {/*占位*/}
                    {/*<View style={this.createProps('backWrap',backWrap)}></View>*/}
                    <TouchableOpacity style={this.createProps('registWrap', registWrap)} onPress={this.goLogin}>
                        <Text style={this.createProps('registTxt', registTxt)}>登录</Text>
                    </TouchableOpacity>
                </View>

                {/*input输入框 按钮等主要部分*/}
                <View style={this.createProps('mainBox', mainBox)}>
                    {/*请输入手机号*/}
                    <View style={this.createProps('phoneIptWrap', phoneIptWrap)}>
                        <Image style={this.createProps('phoneIptIcon', phoneIptIcon)}
                               source={require('../assert/modifypwd_phone_.png')}
                        />
                        <TextInput
                            style={this.createProps('phoneIpt', phoneIpt)}
                            underlineColorAndroid={"transparent"}
                            placeholder={'请输入手机号'}
                            value={this.cellphone}
                            onChangeText={this.createProps('cellphoneChange', (t) => this.cellphoneChange(t))}
                            keyboardType={'numeric'}
                            maxLength={11}
                        />
                    </View>
                    {/*请输入验证码*/}
                    <View style={this.createProps('codeWrap', codeWrap)}>
                        <View style={this.createProps('codeIptWrap', codeIptWrap)}>
                            <Image style={this.createProps('codeIptIcon', codeIptIcon)}
                                   source={require('../assert/modifypwd_code_.png')}/>
                            <TextInput
                                underlineColorAndroid={"transparent"}
                                style={this.createProps('codeIpt', codeIpt)}
                                placeholder="请输入验证码"
                                keyboardType="numeric"
                                onChangeText={this.createProps('codeChange', (t) => this.code = t)}
                                maxLength={4}/>

                        </View>
                        {/*验证码按钮*/}
                        {
                            !this.isCountDown ?
                                <TouchableOpacity
                                    style={!this.codeButton ? this.createProps('codeBtnWrap', codeBtnWrap) : this.createProps('codeBtnWrap_', codeBtnWrap_)}
                                    disabled={this.codeButton}
                                    onPress={this.createProps('onSendVerificationCode', () => this.onSendVerificationCode())}>
                                    <Text style={this.createProps('codeBtnTxt', codeBtnTxt)}>{this.sendtxt}</Text>

                                </TouchableOpacity> :
                                <View style={this.createProps('codeBtnWrap_', codeBtnWrap_)}>
                                    <Text style={this.createProps('codeBtnTxt', codeBtnTxt)}>{this.countdown}秒重发</Text>
                                </View>
                        }
                    </View>
                    {/*请输入6位以上密码__样式大部分复制自 请输入手机号 so..命名有些怪异*/}
                    <View style={this.createProps('phoneIptWrap', phoneIptWrap)}>
                        <Image style={this.createProps('psdIptIcon', psdIptIcon)}
                               source={require('../assert/modifypwd_pwd_.png')}
                        />
                        <TextInput
                            style={this.createProps('phoneIpt', phoneIpt)}
                            underlineColorAndroid={"transparent"}
                            secureTextEntry={this.isShowPsd}
                            placeholder={'请输入6位以上密码'}
                            onChangeText={this.createProps('passwordChange', (t) => this.password = t)}
                            keyboardType={'default'}
                            onBlur={() => this.actionAtatistics({actionType: 49, actionSubtype: 9})}
                            maxLength={20}/>


                        {/*控制隐藏显示按钮*/}
                        <TouchableOpacity style={this.createProps('showPsdWrap', showPsdWrap)}
                                          onPress={this.createProps('showPsd', () => this.showPsd())}>
                            <Text
                                style={this.createProps('showPsdTxt', showPsdTxt)}>{this.isShowPsd ? '隐藏' : '可见'}</Text>

                        </TouchableOpacity>
                    </View>
                    {/*提示相关协议与通知*/}
                    <View style={this.createProps('tipWrap', tipWrap)}>
                        <Text style={this.createProps('tipTxt_', tipTxt_)}>了解并同意爱抢拍的 </Text>
                        <Text style={this.createProps('tipTxt', tipTxt)}
                              onPress={this.createProps('goWeb', () => {
							      this.href('/web?urltype=' + 0);
							      this.actionAtatistics({actionType: 51, actionSubtype: 9});
						      })}>《相关协议与通知》</Text>
                    </View>
                    {/*同意并注册按钮*/}
                    <TouchableOpacity style={this.createProps('btnWrap', btnWrap)}
                                      onPress={this.createProps('onRegister', () => this.onRegister())}
                                      activeOpacity={0.7}>
                        <Text style={this.createProps('btnTxt', btnTxt)}>同意并注册</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }



}


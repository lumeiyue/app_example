/**
 * Created by mac on 2017/10/12.
 */
/**
 * Created by zhanghua on 2017/2/6.
 */
import React, {PropTypes, Component} from 'react';

import {
    View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Button, Platform,  StatusBar, Dimensions,
} from "react-native"


const styles = StyleSheet.create({})
function propsEqual(a, b) {
    if (a === b)
        return true
    if (!a || !b) {
        return !a && !b ? true : false
    }
    return Object.keys(a).length === Object.keys(b).length && !Object.keys(a).reduce((flag, key) => flag || a[key] !== b[key], false)
}
var getWidth = px => Dimensions.get('window').width / 750 * px;
var getHeight = px => Dimensions.get('window').height / 1334 * px;



export default class Login extends Component {
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


    loginInfo = {
        name: "",
        pwd: "",
        showWxImageOrHidden: true
    }

    wxLogin=()=>{
        alert('前往微信登陆')
    }
    //TODO this.callProxy("req_detail",{})

    callLogin = (name, pwd) => {

        if (!name) {
           alert("请输入手机号", 1, 1);
            return;
        }
        if (!(/\d{11}$/.test(name.replace(/(^\s*)|(\s*$)/g, "")))) {//手机号码验证规则
            alert("请正确输入11位手机号码", 1, 1);
            return;
        }
        if (!pwd) {
            alert("请输入密码", 1, 1);
            return;
        }

        if (!/^(\w){6,20}$/.exec(pwd.replace(/(^\s*)|(\s*$)/g, ""))) {
            alert("请正确输入6-20位以上密码", 1, 1);
            return;
        }



    };


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
            justifyContent: 'flex-end',
            marginRight: getWidth(30)
        }
        var backIcon = {
            width: getWidth(50),
            height: getWidth(50),
        }
        //注册按钮
        var registWrap = {
            width: getWidth(200),
            height: getWidth(109),
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: getWidth(30)
        }
        var registTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#ee5050',
            fontSize: getHeight(28),
        }
        //登录文字
        var loginTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(34),
        }
        //输入框主要填写部分
        var mainBox = {
            paddingHorizontal: getWidth(60),
            paddingTop: getHeight(100)
        }
        var inputWrap = {
            height: getHeight(88),
            borderStyle: 'solid',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#979797',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getHeight(22)
        }
        var inputIconName = {
            width: getWidth(30),
            height: getHeight(44),
            marginLeft: getWidth(30),
            marginRight: getWidth(52)
        }
        var inputIconPsd = {
            width: getWidth(36),
            height: getHeight(44),
            marginLeft: getWidth(29),
            marginRight: getWidth(52)
        }
        var ipt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
            padding: 0,
            height: getHeight(88),
            width: getWidth(500),
            // alignSelf: 'center'
        }
        // 登录按钮
        var btnWrap = {
            height: getHeight(88),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ee5050',
            marginTop: getHeight(98)
        }
        var btnTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#fff',
            fontSize: getHeight(43),
        }
        //忘记密码
        var forgetWrap = {
            width: getWidth(200),
            paddingTop: getHeight(40),
            paddingBottom: getHeight(34),
            alignItems: 'flex-end',
            alignSelf: 'flex-end'
        }
        var forgetTxt = {
            fontFamily: 'PingFangSC-Light',
            color: '#4a4a4a',
            fontSize: getHeight(28),
        }
        //微信快捷登录
        var wxTitle = {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
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
                    <TouchableOpacity style={this.createProps('backWrap', backWrap)} >
                        <Image style={this.createProps('backIcon', backIcon)}
                               source={require("../assert/backblack.png")}/>
                    </TouchableOpacity>
                    {/*登录Title*/}
                    <Text style={this.createProps('loginTxt', loginTxt)}>登录</Text>
                    {/*注册按钮*/}
                    <TouchableOpacity style={this.createProps('registWrap', registWrap)}>
                        <Text style={this.createProps('registTxt',registTxt)}
                       >注册</Text>
                    </TouchableOpacity>
                </View>

                {/*Input框,登录按钮 下方图片 等主要部分*/}
                <View style={this.createProps('mainBox', mainBox)}>
                    {/*Input框 帐号*/}
                    <View style={this.createProps('inputWrap', inputWrap)}>
                        <Image style={this.createProps('inputIconName', inputIconName)}
                               source={require('../assert/modifypwd_phone_.png')}
                        />
                        {/*(t) => this.checkedCode(t)*/}
                        <TextInput
                            style={this.createProps('ipt', ipt)}
                            underlineColorAndroid={"transparent"}
                            placeholder={'请输入手机号'}
                            onChangeText={this.createProps('logintext', (t) => this.logintext(t))}
                            value={this.loginInfo.name}
                            keyboardType={'numeric'}
                            maxLength={11}
                            clearButtonMode={'while-editing'}
                        />
                    </View>
                    {/*Input框 密码*/}
                    <View style={this.createProps('inputWrap', inputWrap)}>
                        <Image style={this.createProps('inputIconPsd', inputIconPsd)}
                               source={require('../assert/modifypwd_pwd_.png')}
                        />
                        <TextInput
                            style={this.createProps('ipt', ipt)}
                            underlineColorAndroid={"transparent"}
                            placeholder="请输入6位以上密码"
                            secureTextEntry={true}
                            onChangeText={(text) => this.loginInfo.pwd = text}
                            maxLength={20}
                            autoFocus={true}
                            clearButtonMode={'while-editing'}
                        />

                    </View>
                    {/*登录按钮*/}
                    <TouchableOpacity style={this.createProps('btnWrap', btnWrap)}
                                      onPress={this.createProps('changeLogin', this.callLogin)}
                                      activeOpacity={0.7}
                    >
                        <Text style={this.createProps('btnTxt', btnTxt)}>登录</Text>
                    </TouchableOpacity>






                    {/*微信图标*/}

                        <TouchableOpacity style={this.createProps('wxTouch', wxTouch)} onPress={this.wxLogin}>
                            <Image style={this.createProps('wxIcon', wxIcon)}
                                   source={require("../assert/Group_2@2x.png")}></Image>
                        </TouchableOpacity>




                </View>
            </View>
        );
    }


}


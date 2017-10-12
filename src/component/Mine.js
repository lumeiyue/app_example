import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    ScrollView,
    Dimensions,
    TextInput,
    Platform,
    Image
} from "react-native"

var getWidth = px => Dimensions.get("window").width / 750 * px;
var getHeight = px => Dimensions.get("window").height / 1334 * px;

import AccountsBar from "./CustomTitleView"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    loginwrap:{
        width:getWidth(750),
        height:getHeight(340),
        backgroundColor:'#ffffff',
        alignItems:'center',
        justifyContent:'center'
    },
    logintopwrap:{
        width:getWidth(670),
        marginLeft:getWidth(50),
        marginRight:getWidth(30),
        height:getHeight(161),
        paddingTop:getHeight(41),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'

    },

    logintopleftwrap:{
        width:getWidth(430),
        height:getHeight(120),
        alignItems:'center',
        flexDirection:'row'
    },
    usrImg:{
        width:getWidth(120),
        height:getHeight(120),
        alignItems:'center',
    },
    usrinfo:{
        marginLeft:getWidth(40),
    },
    usrname:{
        width:getWidth(208),
        height:getHeight(40),
    },
    usrnametxt:{
        fontFamily: 'PingFangSC-Light',
        color: '#4A4A4A',
        fontSize: getHeight(28),
    },
    usrrealnametel:{
        flexDirection:'row',
        marginTop:getHeight(12)
    },
    usrrealname:{
        width:getWidth(68),
        height:getHeight(34),
        borderRadius:getWidth(10),
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#51C9C2',
        backgroundColor:'#51C9C2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usrrealnametxt:{
        fontFamily: 'PingFangSC-Light',
        color: '#FFFFFF',
        fontSize: getHeight(20),

    },
    usrtel:{
        width:getWidth(170),
        height:getHeight(34),
        borderRadius:getWidth(25),
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#4990E2',
        backgroundColor:'#4990E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:getWidth(12)
    },
    usrteltxt:{
        fontFamily: 'PingFangSC-Light',
        color: '#FFFFFF',
        fontSize: getHeight(20),
    },
    logintoparrow:{
        width:getWidth(35),
        height:getHeight(35),
    },

    loginBottomWrap:{
        width:getWidth(750),
        height:getHeight(95),
        flexDirection:'row',
        marginBottom:getHeight(24),
        marginTop:getHeight(60),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    loginBottomevery:{
        width:getWidth(96),
        height:getHeight(95),
        justifyContent:'center',
        alignItems:'center',
    },
    loginBottomimg:{
        width: getWidth(44),
        height: getHeight(44),
        backgroundColor:'#ffffff'
    },
    loginBottomtxt:{
        fontFamily: 'PingFangSC-Light',
        color: '#4A4A4A',
        fontSize: getHeight(24),
        marginTop:getHeight(18),
    },
    optionsWrap:{
        backgroundColor:'#ffffff',
        width:getWidth(750),
        paddingLeft:getWidth(42),
        marginTop:getHeight(31),
        // height:getHeight(176)
    },
    optionsevery:{
        width:getWidth(708),
        height:getHeight(88),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    optionsimg:{
        width:getWidth(36),
        height:getHeight(38),
    },
    optionstxt:{
        width:getWidth(646),
        height:getHeight(88),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderStyle: 'solid',
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft:getWidth(20)
    },
    optionseverytxt:{
        fontFamily: 'PingFangSC-Light',
        color: '#4A4A4A',
        fontSize: getHeight(28),
    },
    optionseveryarrow:{
        width:  getWidth(35),
        height:getHeight(35)
    }
});




export default class Mine extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <AccountsBar titleName="我的" backOnPress={() =>this.pop()}/>

                <View style={styles.loginwrap}>

                    <View style={styles.logintopwrap}>
                        <View style={styles.logintopleftwrap}>
                            <Image
                                style={styles.usrImg}
                                source={require("../assert/_login.png")}
                            />
                            <View style={styles.usrinfo}>
                                <View style={styles.usrname}><Text style={styles.usrnametxt}>feiminiberry</Text></View>
                                <View  style={styles.usrrealnametel}>
                                    <View style={styles.usrrealname}><Text style={styles.usrrealnametxt}>已实名</Text></View>
                                    <View style={styles.usrtel}><Text style={styles.usrteltxt}>187*****022</Text></View>
                                </View>
                            </View>

                        </View>
                        <View style={styles.logintoparrow}>
                            <Image
                                style={styles.logintoparrow}
                                source={require("../assert/arrow_right.png")}
                            />
                        </View>

                    </View>

                    <View style={styles.loginBottomWrap}>
                        <View style={styles.loginBottomevery}>
                            <Image style={styles.loginBottomimg} source={require("../assert/icon_recharge.png")}/>
                            <Text style={styles.loginBottomtxt}>充值</Text>
                        </View>
                        <View style={styles.loginBottomevery}>
                            <Image style={styles.loginBottomimg} source={require("../assert/icon_recharge.png")}/>
                            <Text style={styles.loginBottomtxt}>我的抢购</Text>
                        </View>

                        <View style={styles.loginBottomevery}>
                            <Image style={styles.loginBottomimg} source={require("../assert/icon_recharge.png")}/>
                            <Text style={styles.loginBottomtxt}>我的提醒</Text>
                        </View>
                    </View>
                </View>





                <ScrollView>
                    <View style={styles.optionsWrap}>
                        <View style={styles.optionsevery}>
                            <Image style={styles.optionsimg} source={require("../assert/icon_my_wallet.png")}/>

                            <View style={styles.optionstxt}>
                                <Text style={styles.optionseverytxt}>我的钱包</Text>
                                <Image
                                    style={styles.optionseveryarrow}
                                    source={require("../assert/arrow_right.png")}
                                />
                            </View>
                        </View>

                        <View style={styles.optionsevery}>
                            <Image style={styles.optionsimg} source={require("../assert/icon_my_wallet.png")}/>
                            <View style={styles.optionstxt}>
                                <Text style={styles.optionseverytxt}>我的钱包</Text>
                                <Image
                                    style={styles.optionseveryarrow}
                                    source={require("../assert/arrow_right.png")}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.optionsWrap}>
                        <View style={styles.optionsevery}>
                            <Image style={styles.optionsimg} source={require("../assert/icon_my_wallet.png")}/>

                            <View style={styles.optionstxt}>
                                <Text style={styles.optionseverytxt}>我的钱包</Text>
                                <Image
                                    style={styles.optionseveryarrow}
                                    source={require("../assert/arrow_right.png")}
                                />
                            </View>
                        </View>

                        <View style={styles.optionsevery}>
                            <Image style={styles.optionsimg} source={require("../assert/icon_my_wallet.png")}/>
                            <View style={styles.optionstxt}  >
                                <Text style={styles.optionseverytxt}>登录</Text>
                                <Image
                                    style={styles.optionseveryarrow}
                                    source={require("../assert/arrow_right.png")}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}





/**
 * Created by mac on 2017/7/3.
 */

/**
 * Created by zhanghua on 2017/2/6.
 */
import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl,
    Platform,
    Button,
    Dimensions

} from 'react-native';
import Slider from  './Slider'

const scrollViewColors = ['#ff0000', '#00ff00', '#0000ff', '#3ad564']



var getWidth = px => Dimensions.get('window').width / 750 * px;
var getHeight = px => Dimensions.get('window').height / 1334 * px;



const styles = StyleSheet.create({
//listView 的 renderHeader
    headerWrap: {
        width: getWidth(750),
        overflow: 'hidden',
        alignSelf: 'center'
    },
    emptyHeader: {
        width: getWidth(750),
        height: getHeight(410 + 174),
        // alignSelf: 'center',
        backgroundColor: 'white',
        marginBottom: getHeight(10)
    },
    //轮播图
    carousel: {
        width: getWidth(750),
        height: getHeight(410),
    },
    //导航图片
    navPicWrap: {
        backgroundColor: '#fff',
        paddingHorizontal: getWidth(15),
        width: getWidth(750),
        height: getHeight(174),
        flexDirection: 'row',
        marginBottom: getHeight(10)
    },
    navPic: {
        width: getWidth(180),
        height: getHeight(174),
    }
})

export default class Home extends Component {
    sliderPosition = {
        position: 0,
        interval: null
    }
    bannerList=[require('../assert/banner1.jpg'),require('../assert/banner2.jpg'),require('../assert/banner3.jpg')]
    funcDic = new Map()
    createFunc(key, func) {
        var f = null;
        this.funcDic.has(key) ? f = this.funcDic.get(key) : this.funcDic.set(key, f = func)
        return f
    }

    render() { return (
        <View style={styles.headerWrap}>
            {/*轮播图*/}
            <View style={styles.carousel}>
                <Slider
                    images={this.bannerList ? this.bannerList : []}
                    position={this.sliderPosition.position}
                    onPositionChanged={this.createFunc('sliderPosition.position.change', (position) => this.sliderPosition.position = position)}
                    height={getWidth(410)}
                    bannerLength={this.bannerList.length}
                    timeInterval={2000}
                />







            </View>
            </View>
    )}
}
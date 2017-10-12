/**
 * Created by softa on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

let getWidth = (px) => Dimensions.get("window").width / 750 * px;


let getHeight = (px) => Dimensions.get("window").height / 1334 * px;


const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: getHeight(128),
        backgroundColor: '#121212',
        marginTop: Platform.OS === 'ios' ? 0 : -Dimensions.get("window").height / 1334 * 40
    },

    touchSpace: {
        width: getWidth(130),
        height: getHeight(128),
        flexDirection:'row'
    },
    touchIcon: {
        width: getWidth(35),
        height: getHeight(35),
        marginLeft:getWidth(10),
        marginTop:getHeight(64),

    },
    touchTxt: {
        fontFamily: 'PingFangSC-Light',
        color: '#fff',
        fontSize: getHeight(31),
        marginLeft:getWidth(0),
        marginTop:getHeight(60),
    },
    titleTxt: {
        fontFamily: 'PingFangSC-Regular',
        color: '#fff',
        fontSize: getHeight(34),
        marginTop: getHeight(58)
    },



});

export default class CustomTitleView extends Component {
    static propTypes = {
        titleName: PropTypes.string.isRequired,
        backOnPress: PropTypes.func.isRequired
    };


    render() {
        return (
            <View style={styles.titleView}>
                <TouchableOpacity style={styles.touchSpace} onPress={this.props.backOnPress}>
                    <Image style={styles.touchIcon} source={require('../assert/back.png')}/>
                    <Text style={styles.touchTxt}>返回</Text>
                </TouchableOpacity>

                <Text style={styles.titleTxt}>{this.props.titleName}</Text>

                <View style={styles.touchSpace}></View>
            </View>
        );
    }
}

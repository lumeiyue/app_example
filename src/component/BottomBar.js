/**
 * Created by softa on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import TabBar from  './TabBar';
/**
 * Created by zhanghua on 2017/2/6.
 */
import Mine from "./Mine"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"

var getWidth = px => Dimensions.get('window').width / 750 * px;
var getHeight = px => Dimensions.get('window').height / 1334 * px;



export default class BottomBar extends Component {

    tabIndex = 0
    tabChooseChange = (data) => {
        this.tabIndex = data.index
    }
    tabIndexChanged = 0;
    //tab标签切换
    tabChooseEqual = (para) => {
        if (this.tabIndexChanged != para) {
            this.tabIndexChanged = para;
        }
        this.tabIndex = para
        title = ''
        switch (para) {
            case 0:
                title = '精选1'
                break;
            case 1:
                title = '精选2'
                break;
            case 2:
                title = '精选3'
                break;
            case 3:
                title = '精选4'
                break;
            default:

        }
    }

    //TODO this.callProxy("req_detail",{})
    // {onPress={() => {this.addId();}}
    // {badge={this.bage}}
    render() {
        return (
            <View style={styles.ijizheContainer}>
                {
                    <TabBar
                        style={styles.content}
                        onItemSelected={(index) => {
							this.tabChooseEqual(index)
						}}
                        seletedItem={this.tabIndex}
                    >
                        <TabBar.Item
                            icon={require('../assert/tab_feature_.png')}
                            selectedIcon={require('../assert/tab_feature.png')}
                            title='精选1'>
                            <Home/>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={require('../assert/tab_panic_.png')}
                            selectedIcon={require('../assert/tab-panic.png')}
                            title='精选2'>
                            <Register/>
                        </TabBar.Item>

                        <TabBar.Item
                            icon={require('../assert/tab_history_.png')}
                            selectedIcon={require('../assert/tab_history.png')}
                            title='精选3'>
                            <Login/>

                        </TabBar.Item>

                        <TabBar.Item
                            icon={require('../assert/tab_mine_.png')}
                            selectedIcon={require('../assert/tab_mine.png')}
                            title='精选4'>
                            <Mine/>
                        </TabBar.Item>
                    </TabBar>
                }
            </View >
        );

    }
}

const styles = StyleSheet.create({
    ijizheContainer: {
        flex: 1,
        position: 'relative',
        //borderStyle: "solid",
        //borderColor: "blue",
        //borderWidth: 2
    }
})





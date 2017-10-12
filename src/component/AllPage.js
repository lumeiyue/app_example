/**
 * Created by mac on 2017/10/12.
 */
/**
 * Created by zhanghua on 2017/2/6.
 */
import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl,
    ListView,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import AccountsBar from '../views/CustomTitleView';
import {ComponentBase, observable} from 'ijizhe_vue_react_core/react-native';
import AccountsDetailProxy from "../dataproxy/AccountsDetailProxy"
import {computed, autorun, action, map} from 'mobx'
import {observer} from 'mobx-react/native';


import PageList from '../views/PageList'


var getWidth = px => Dimensions.get("window").width / 750 * px;
var getHeight = px => Dimensions.get("window").height / 1334 * px;


@observer
export default class AccountsDetail extends ComponentBase {

    // @action
    // initData = () => {
    //     this.refreshing = false;
    //     this.pageing_length = 0;
    //     this.current_page = 1;
    //     this.dataSource = this.ds.cloneWithRows([]);
    //     this.page_info = null;
    //     // this.isLoadingMore =true;
    //
    // }


    
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.closeLoading();
        this.TalkingPageEnd('钱包-收支明细页');
    }

    componentDidMount() {
        super.componentDidMount();
        this.TalkingPageStart('钱包-收支明细页');
    }

    get proxyClassses() {
        return AccountsDetailProxy
    }


    render() {
        return (
            <View style={styles.container}>
                <AccountsBar titleName="收支明细" backOnPress={() => {
					this.closeLoading();
					this.pop();
					this.actionAtatistics({actionType: 63, actionSubtype: 12})
				}}/>

                <PageList
                    renderRow={(rowData, sectionId, Id) => <AccountsItem content={rowData} Id={Id}/>}
                    callproxy={'req_accountsdetailpage'}
                    registListens={'resp_accountsdetailpage'}
                    tips={'您目前还没有收支明细'}
                    callproxyPara={{page: 1, size: 7, old: 0}}
                    historyAddress="/accountshistory"
                />

            </View>
        );
    }
}


@observer
class AccountsItem extends ComponentBase {

    @observable
    bills = this.props.content;


    render() {
        return (
            <TouchableHighlight style={styles.touchWrap} underlayColor={'#dcdcdc'} delayPressOut={500}
                                onPress={this.createProps('xxx', () => {
				                    this.href("/accountdflowdetail?id=" + this.bills.id + "&old=0");
				                    this.actionAtatistics({actionType: 16, actionValue: this.bills.id})
			                    })}>
                <View>
                    <View style={styles.item1}>
                        <Text
                            style={styles.textBlack}>金额:{this.bills.amount > 0 ? this.moneySplit(this.bills.amount / 100) : 0}元</Text>
                        <Text style={styles.textBlack}>{this.bills.usetype}</Text>
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.textGray}>流水号: {this.bills.orderno}</Text>
                    </View>
                    <View style={styles.item3}>
                        <Text
                            style={styles.textGray}>{this.bills.createTime ? this.formatDateUitl(this.bills.createTime, 'YYYY-MM-DD hh:mm:ss') : "无"}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    touchWrap: {
        backgroundColor: '#fff',
        paddingLeft: getWidth(40),
        paddingRight: getWidth(40),
        paddingTop: getHeight(20),
        paddingBottom: getHeight(20),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dcdcdc',
    },
    item1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item2: {
        marginTop: getHeight(20)
    },
    item3: {
        marginTop: getHeight(6)
    },
    textBlack: {
        fontFamily: 'PingFangSC-Light',
        color: '#4a4a4a',
        fontSize: getHeight(28)
    },
    textGray: {
        fontFamily: 'PingFangSC-Light',
        color: '#9b9b9b',
        fontSize: getHeight(24)
    }
});


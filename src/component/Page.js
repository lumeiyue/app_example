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
import ComponentBase from '../publics/classes/com/ijizhe/core/component/ReactComponentBase';
import AccountsDetailProxy from "../dataproxy/AccountsDetailProxy"
import observable from '../publics/decorator/Observable'
import {computed, autorun, action, map} from 'mobx'
import {observer} from 'mobx-react/native';

var getWidth =  px => Dimensions.get("window").width / 750 * px;
var getHeight = px => Dimensions.get("window").height / 1334 * px;


@observer
export default class AccountsDetail extends ComponentBase {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.TalkingPageEnd('钱包-收支明细页');
    }

    componentDidMount() {
        super.componentDidMount();
        this.TalkingPageStart('钱包-收支明细页');
    }

    @observable({autoInit: true})
    refreshing = false

    @observable
    dataSource = this.ds.cloneWithRows([]);
    account_info = null;
    page_info = null;

    @observable
    lengthing = 0;
    pageing_length = 0;
    current_page = 1;

    _ondetailRefresh = () => {
        this.refreshing = true
        this.callProxy('req_accountsdetailpage', {count: this.lengthing, size: 8, page: 1});//共多少条 第一页 一页显示8条
        console.log("refreshing=======", {count: this.lengthing, size: 8, page: 1});
    }

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


    @action
    begin() {
        this.callProxy('req_accountsdetailproxy');
        this.callProxy('req_accountsdetailpage', {count: this.lengthing, size: 8, page: 1});//共多少条 第一页 一页显示8条
        console.log('wwwwww', {count: this.lengthing, size: 8, page: 1});
    }


    get proxyClassses() {
        return AccountsDetailProxy
    }

    registListens() {
        this.listen('resp_accountsdetailproxy', this.reAccountsdetail)
        this.listen('resp_accountsdetailpage', this.reAccountsdetailpage)
    }


    @action
    reAccountsdetail(data, errCode, fullData, requestData, response) {
        this.account_info = data;
        this.lengthing = this.account_info.length
        console.log("==========accountsDetail===============", data, this.lengthing);

    }

    @action
    reAccountsdetailpage(data, errCode, fullData, requestData, response) {
        if (data.arr) {
            this.page_info = data.arr;
            this.pageing_length = data.page_length;
            this.current_page = data.page
            console.log("==========pageing .......===============", data, '====this.current_page===', this.current_page);
            this.dataSource = this.ds.cloneWithRows(this.page_info);
        }
        this.refreshing && (this.refreshing = false)
    }


    _toEnd = (e) => {
        console.log('_toEnd======',e)
        if (this.pageing_length >= this.lengthing || this.refreshing) {
            return;
        }

        this._loadMoreData();

        // InteractionManager.runAfterInteractions(() => {
        // 	console.log("触发加载更多 toEnd() --> ");
        // 	this._loadMoreData();
        // });

    }
    _loadMoreData = () => {
        this.current_page++;
        this.callProxy('req_accountsdetailpage', {count: this.lengthing, size: 5, page: this.current_page});//共多少条 第一页 一页显示8条
    }

    _renderFooter = () => {
        if (this.pageing_length < 1 || this.refreshing) {
            return null
        }
        if (this.pageing_length < this.lengthing) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text style={styles.footerTitle}>正在加载更多…</Text>
                </View>
            )
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <AccountsBar titleName="收支明细" backOnPress={() => this.pop()}/>

                {this.lengthing > 0 &&
                <ListView
                    refreshControl={<RefreshControl
						refreshing={this.refreshing}
						onRefresh={this._ondetailRefresh}
						colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
						progressBackgroundColor="#ffffff"
						title={'加载中'}
						tintColor={'#14043d'}
					/>}
                    enableEmptySections={true}
                    dataSource={this.dataSource}
                    renderRow={(rowData,sectionId,Id) =><AccountsItem content={rowData} length={this.dataSource._cachedRowCount} Id={Id}/>}
                    contentContainerStyle={{backgroundColor: '#fff'}}
                    initialListSize={1}
                    pageSize={2}
                    scrollRenderAheadDistance={1}
                    onEndReached={ this._toEnd.bind(this) }
                    onEndReachedThreshold={50}
                    renderFooter={ this._renderFooter.bind(this) }
                />
                }


                {this.lengthing <= 0 &&
                <Text style={styles.noinfoTip}>您目前还没有收支明细</Text>}
            </View>
        );
    }
}


@observer
class AccountsItem extends ComponentBase {

    @observable
    bills = this.props.content;


    length = this.props.length

    render() {

        // console.log(this.length,this.props.Id)

        return (

            <TouchableHighlight style={styles.touchWrap} underlayColor={'#dcdcdc'} delayPressOut={500}
                                onPress={this.createProps('xxx', ()=>this.href("/accountdflowdetail?id=" + this.bills.id))}>
                <View style={styles.itemWrap}>
                    <View style={styles.item1}>
                        <Text style={styles.textBlack}>金额:{this.bills.amount > 0 ? this.moneySplit(this.bills.amount / 100) : 0}元</Text>
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
    noinfoTip: {
        fontFamily: 'PingFangSC-Light',
        color: '#9b9b9b',
        fontSize: getHeight(28),
        alignSelf: 'center',
        marginTop: getHeight(417)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeight(40),
    },
    footerTitle: {
        marginLeft: getWidth(10),
        fontSize: getHeight(28),
        color: 'gray'
    },
    touchWrap: {
        paddingLeft: getWidth(40),
        marginTop: -StyleSheet.hairlineWidth
    },
    itemWrap: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: getHeight(184),
        paddingRight: getWidth(40)
    },
    item1: {
        marginTop: getHeight(30),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item2: {
        marginTop: getHeight(19)
    },
    item3: {
        marginTop: getHeight(6)
    },
    textBlack:{
        fontFamily:'PingFangSC-Light',
        color:'#4a4a4a',
        fontSize:getHeight(28)
    },
    textGray:{
        fontFamily:'PingFangSC-Light',
        color:'#9b9b9b',
        fontSize:getHeight(24)
    }
});


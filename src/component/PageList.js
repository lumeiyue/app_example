import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ScrollView,
    ListView,
    StyleSheet,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import {ComponentBase, observable} from 'ijizhe_vue_react_core/react-native'


import {observable as observableMobx, computed, autorun, action, map} from 'mobx'

import {observer} from 'mobx-react/native';


var getWidth = px => Dimensions.get("window").width / 750 * px;
var getHeight = px => Dimensions.get("window").height / 1334 * px;

@observer
export default class PageList extends ComponentBase {

    page_info = []; //当前页的信息

    temp = [];//1-当前页信息

    @observable
    sum = 0

    @observable
    attemp = 0

    @observable
    isLoadingMore = true;

    @observable
    page_size = 0;

    @observable
    returncount = 0;

    @observable
    lengthing = 0;

    @observable
    current_page = 1;

    refreshControl = null

    @observable
    renderRow = null

    callproxyPara = {}

    @observable
    getcallproxy = null

    @observable
    getregistListens = null

    @observable({autoInit: true})
    refreshing = false

    @observable
    tips = null

    @observable
    dataHaveReceived = false        //请求发送，接收到数据

    @observable
    callwithdraw = null  //提现配置

    @observable
    respwithdraw = null

    @observable
    historyAddress = null

    HolidayArr = null

    @observable
    hasAuction = 0

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    @observable
    dataSource = this.ds.cloneWithRows([]);

    constructor(...props) {
        super(...props)
        this.renderRow = this.props.renderRow
        this.tips = this.props.tips
        this.historyTips = this.props.historyTips ? this.props.historyTips : ''

        this.callproxyPara = this.props.callproxyPara
        this.getcallproxy = this.props.callproxy
        this.getregistListens = this.props.registListens

        this.callwithdraw = this.props.callwithdraw ? this.props.callwithdraw : ''
        this.respwithdraw = this.props.respwithdraw ? this.props.respwithdraw : ''

        this.historyAddress = this.props.historyAddress ? this.props.historyAddress : ''
        console.log('==constructor====', this.historyAddress, this.callwithdraw, this.respwithdraw)
    }

    listRenderRow = (rowData, sectionID, rowID) => {
        return (
            <View >
                <Item renderRow={this.renderRow} rowData={rowData} sectionID={sectionID} rowID={rowID}/>
            </View>
        )
    }

    _ondetailRefresh = () => {
        this.refreshing = true
        this.lengthing = 0
        this.callproxyPara.page = 1
        console.log("refreshing=======", this.callproxyPara, this.refreshing);
        this.callProxy(this.getcallproxy, this.callproxyPara);//共多少条 第一页 一页显示8条
        if (this.callwithdraw) {
            this.callProxy(this.callwithdraw)
        }
        this.doLoadingNoImage();
    }

    @action
    begin() {
        if (this.callwithdraw) {
            this.callProxy(this.callwithdraw)
        }
        console.log('==list begin===callproxy=', this.getcallproxy, this.callproxyPara)
        this.isLoadingMore = true;
        this.callProxy(this.getcallproxy, this.callproxyPara);//共多少条 第一页 一页显示8条
        this.doLoading();
    }

    //转没有菊花的菊花
    doLoadingNoImage = () => {

        this.refreshing = true;
        this.openLoading(
            {
                time: 15000,
                loadingText: "加载中,请稍后",
                loadingEndFunc: () => {
                    this.dataHaveReceived = true;
                    this.refreshing = false;
                    this.confirm("网络不畅,请重试", {
                        close: null,
                        okText: "重试",
                        cancelText: "查看详情",
                        okCallBack: () => {
                            this.callProxy(this.getcallproxy, this.callproxyPara);//共多少条 第一页 一页显示8条
                            if (this.callwithdraw) {
                                this.callProxy(this.callwithdraw)
                            }
                            this.doLoadingNoImage();
                        },
                        cancelCallBack: this.viewDetail.bind(this)
                    });
                },
                showLoadingImage: false,
                accumulationFunc: () => {
                    this.refreshing = false;
                },
                preStop: () => {
                    this.refreshing = false;
                },
                mask: false
            }
        );
    }

    //获取当前页面
    getCurrentPage = () => {
        let page = this.currentlocation();
        console.warn("!!!!!!!!!!!!!", page)
        if (page = '/rewarddetail') return 32;
        if (page = '/accountsdetail') return 12;
        if (page = '/depositdetail') return 19;

    }

    //转菊花
    doLoading = () => {
        this.openLoading({
            time: 15000,
            loadingText: "加载中,请稍后",
            loadingEndFunc: () => {
                this.dataHaveReceived = true;
                this.confirm("网络不畅,请重试", {
                    close: null,
                    cancelText:"查看详情",
                    okText: "重试",
                    okCallBack: () => {
                        if (this.callwithdraw) {
                            this.callProxy(this.callwithdraw)
                        }
                        this.callProxy(this.getcallproxy, this.callproxyPara);//共多少条 第一页 一页显示8条
                        this.doLoading();
                    },
                    cancelCallBack: this.viewDetail.bind(this)
                })
            },
            showLoadingImage: true,
            mask: false
        });
    }

    registListens() {

        this.listen(this.getregistListens, this.reAccountsdetailpage)
        if (this.respwithdraw) {
            this.listen(this.respwithdraw, this.resp_Withdraw_info)
        }
    }

    @action
    resp_Withdraw_info(data, errCode) {


        this.HolidayArr = data.holiday;
        Object.keys(this.page_info).forEach(key => {
            if (this.HolidayArr)
                this.page_info[key].HolidayArr = this.HolidayArr
        })
        // console.log('==this.HolidayArr  pagelist===',this.HolidayArr,this.page_info)
    }


    @action
    reAccountsdetailpage(data, errCode, fullData, requestData, response) {

        this.closeLoading();
        if (data instanceof Error) {
            this.showToast('网络繁忙请重试', 1, 1)
            return
        }
        if (this.callproxyPara.page == 1) {
            this.page_info = [];
            this.temp = []
        }
        console.log('this.Listens', this.getregistListens, data, 'this.callproxyPara.page', this.callproxyPara.page, ' this.temp', this.temp)
        if (data.arr) {
            this.current_page = data.page //当前页
            this.page_size = data.page_length
            data.hs && (this.hasAuction = data.hs)
            this.returncount = data.arr.length
            this.lengthing += this.returncount  //总数
            Object.keys(data.arr).forEach(key => {
                if (this.HolidayArr)
                    data.arr[key].HolidayArr = this.HolidayArr

                this.temp.push(data.arr[key])
            })

            this.page_info = this.temp;
            this.sum = data.deposit ? data.deposit : ''
            this.attemp = data.recordnum ? data.recordnum : ''

            console.log('====this.current_page===', this.current_page, '=====this.page_info======', this.page_info);

            this.dataSource = this.ds.cloneWithRows(this.page_info);
        } else {
            this.dataSource = this.ds.cloneWithRows([]);
        }
        this.refreshing && (this.refreshing = false)
        this.isLoadingMore = false;


        this.dataHaveReceived = true;
    }

    _toEnd = (e) => {
        if (this.returncount == this.page_size && !this.refreshing) {
            this._loadMoreData();
        }
    }

    _loadMoreData = () => {
        this.isLoadingMore = true;
        this.temp = this.page_info;
        this.current_page++;
        this.callproxyPara.page = this.current_page;
        console.log('=== _loadMoreData====', this.callproxyPara.page, this.callproxyPara, 'this.isLoadingMore', this.isLoadingMore)
        this.callProxy(this.getcallproxy, this.callproxyPara);//共多少条 第一页 一页显示8条
    }

    _renderFooter = () => {
        console.log('lllllllmmmmmyyyyy', this.refreshing, 'this.isLoadingMore', !this.isLoadingMore)
        if (!this.callproxyPara.aid) {
            if (this.refreshing) {
                return null
            }
            if (this.returncount == this.page_size) {
                return (
                    <View style={styles.footer}>
                        <ActivityIndicator />
                        <Text style={styles.footerTitle}>正在加载更多…</Text>
                    </View>
                )
            }
            if (this.historyAddress != '' && (this.lengthing >= this.page_size - 1)) {
                return (
                    <View style={styles.history}>
                        <Text style={styles.historyTxt}>只为您保留近90天数据，请点击按钮查看历史记录</Text>
                        <TouchableOpacity style={styles.historyBtn}
                                          onPress={() => {
							                  this.actionAtatistics({
								                  actionType: 84,
								                  actionSubtype: this.getCurrentPage()
							                  })
							                  this.href(this.historyAddress)
						                  }}>
                            <Text style={styles.historyBtnTxt}>查看历史记录</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }

        if (this.callproxyPara.aid) {
            if (!this.isLoadingMore) {
                return null
            } else {
                return (
                    <View style={styles.footer}>
                        <ActivityIndicator />
                        <Text style={styles.footerTitle}>正在加载更多…</Text>
                    </View>
                );
            }
        }
    }

    render() {
        //this.refreshControl = this.refreshControl
        return (
            <View style={{flex: 1}}>
                {this.lengthing > 0 &&
                <ListView
                    refreshControl={
						<RefreshControl
							refreshing={this.refreshing}
							onRefresh={this._ondetailRefresh}
							colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
							progressBackgroundColor="#ffffff"
							title={'加载中'}
							tintColor={'#14043d'}
						/>
					}
                    dataSource={this.dataSource}
                    renderRow={this.listRenderRow}
                    onEndReached={this._toEnd.bind(this) }
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter.bind(this)}
                    enableEmptySections={true}
                    callproxyPara={this.callproxyPara}
                    tips={this.tips}
                    renderHeader={this.rendItemHeader}
                />
                }
                {console.log('this.hasAuction======', this.hasAuction)}
                {(this.lengthing == 0 && this.hasAuction == 0 && this.dataHaveReceived) &&
                <Text style={styles.noinfoTip}>{this.tips}</Text>}
                {(this.lengthing == 0 && this.hasAuction == 1) &&
                <Text style={styles.noinfoTip}>{this.historyTips}</Text>}
                {
                    (this.historyAddress != '' && (this.lengthing == 0 || (this.lengthing > 0 && this.lengthing < this.page_size - 1))) &&
                    (
                        <View style={styles.historyWithNull}>
                            <Text style={styles.historyTxt}>只为您保留近90天数据，请点击按钮查看历史记录</Text>
                            <TouchableOpacity style={styles.historyBtn}
                                              onPress={() => {
								                  this.actionAtatistics({
									                  actionType: 84,
									                  actionSubtype: this.getCurrentPage()
								                  })
								                  this.href(this.historyAddress)
							                  }}>
                                <Text style={styles.historyBtnTxt}>查看历史记录</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>)
    }


    rendItemHeader() {
        console.log('===this.callproxyPara.aid===', this.callproxyPara.aid)
        return (
            <View>
                {this.callproxyPara.aid && <View style={styles.itemWrap}>
                    <View style={styles.itemCell}><Text style={styles.listTitTxt}>用户</Text></View>
                    <View style={styles.itemCell}><Text style={styles.listTitTxt}>价格</Text></View>
                    <View style={styles.itemCell}><Text style={styles.listTitTxt}>时间</Text></View>
                </View>
                }
            </View>
        )
    }

    componentWillUnmount() {
        this.closeLoading();
    }

}

@observer
class Item extends Component {
    render() {
        let item = this.props.rowData
        if (!item || !this.props.renderRow)
            return (<View/>);
        return (this.props.renderRow(item, this.props.sectionID, this.props.rowID))
    }
}

const styles = StyleSheet.create({
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
        height: getHeight(100),

    },
    footerTitle: {
        marginLeft: getWidth(10),
        fontSize: getHeight(28),
        color: 'gray'
    },
    itemDivider: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        marginTop: -0.5,
        height: 0.5
    },
//	列表数据
    itemWrap: {
        backgroundColor: '#fff',
        height: parseInt(getHeight(88)),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dcdcdc',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemCell: {
        width: getWidth(250),
        flexDirection: 'row'
    },
    listTitTxt: {
        fontFamily: 'PingFangSC-Light',
        color: '#4a4a4a',
        fontSize: getHeight(28),
        textAlignVertical: 'center',
        marginLeft: getWidth(40)
    },
    history: {
        alignItems: 'center',
        paddingTop: getHeight(36),
        paddingBottom: getHeight(36),
    },
    historyWithNull: {
        alignItems: 'center',
        width: getWidth(750),
        position: 'absolute',
        bottom: getHeight(36),
    },
    historyTxt: {
        fontFamily: 'PingFangSC-Light',
        fontSize: getHeight(20),
        color: '#4b4b4b',
        marginBottom: getHeight(10),
    },
    historyBtn: {
        width: getWidth(340),
        height: getHeight(60),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4a4a4a',
        borderRadius: getHeight(20),
        backgroundColor: '#fff',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyBtnTxt: {
        fontFamily: 'PingFangSC-Light',
        fontSize: getHeight(24),
        color: '#656565',
    }
});

/**
 * Created by mac on 2017/10/12.
 */

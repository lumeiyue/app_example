/**
 * Created by mac on 2017/10/12.
 */
/**
 * Created by duwentao on 2017/2/24.
 */


'use strict'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import React, {Component} from 'react';

export default class TabBarItem extends Component {

    render() {
        let child = this.props.children;

        if (child.length && child.length > 0) {
            throw new Error("onlyChild must be passed a children with exactly one child.");
        }

        return (
            <View style={styles.weight}>
                {child}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    weight: {
        flex: 1,
    }
});

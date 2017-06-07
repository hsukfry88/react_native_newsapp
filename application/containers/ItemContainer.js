'use strict';
import { connect} from 'react-redux';
import { selectInfor} from '../actions';
import Item from '../components/Item';


import React, { Component} from 'react';

import { StyleSheet, View} from 'react-native';

const mapStateToProps = (state) => {
    return {
        selectedShareInfor: state.selectedShareInfor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectedShare: (id, title) => {
            dispatch(selectInfor(id, title));
        }
    }
}
const ItemContainer = connect(mapStateToProps, mapDispatchToProps)(Item);
export default ItemContainer;
/*
 * @Author: weimin
 * @Date:   2016-08-04 11:32:05
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 10:49:15
 */

import React from 'react';
import BgmItemAbstract from './BgmItemAbstract.js';
import BgmItemDetail from './BgmItemDetail.js';

export default class BgmItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showDetail: false
        }
    }
    componentWillReceiveProps(){
        this.setState({
            showDetail: false
        })
    }
    toggleDetail(){

        let showDetail = this.state.showDetail;
        this.setState({
            showDetail: !showDetail
        })
    }
    render() {
        return (
            <div className={this.state.showDetail?'bgm-item show-detail':'bgm-item'}>
                <BgmItemAbstract {...this.props} toggleDetail={this.toggleDetail.bind(this)}/>
                <BgmItemDetail {...this.props} toggleDetail={this.toggleDetail.bind(this)}/>
            </div>
        )
    }
}
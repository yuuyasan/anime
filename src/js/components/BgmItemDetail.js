/*
 * @Author: weimin
 * @Date:   2016-08-04 11:04:34
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 17:31:46
 */

import React from 'react';
import Action from '../action/Action.js';
import _ from 'underscore';

export default class BgmItemDetail extends React.Component {
    constructor(props){
        super(props)
    }
    labelItem(data,e){
        let value = e.target.checked;
        _.extend(data,{status:value});
        Action.labelItem(data);   
    }
   
    render() {
           let item = this.props.itemInfo;
           
        return (
            <div className='bgm-item-detail'>
                <p>
                    <span>在线观看：</span>
                    <a href="">官方网站</a>
                    <a href="">Bangumi页面</a>
                </p>
                <p>
                    <span>放送日期：</span>
                    <a>{item.showDate}</a>
                </p>
                <p>
                    <span>下载链接：</span>
                    <a href="">花园</a>
                    <a href="">Nyaa</a>
                </p>
                <div className='item-filter'>
                    <input type='checkbox' defaultChecked={item.interested} onClick={(e)=>this.labelItem({type:'interested',id:item.bgmId},e)} /><span>关注</span>
                    <input type='checkbox' onClick={(e)=>this.labelItem({type:'uninterested',id:item.bgmId},e)} /><span>隐藏</span>
                </div>
            </div>
        )
    }
}
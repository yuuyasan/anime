/*
* @Author: weimin
* @Date:   2016-08-16 13:45:53
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-08 11:16:32
*/

import React from 'react';
import Action from '../action/Action.js';
import _ from 'underscore';


export default class SearchTitle extends React.Component{
    search(e){
        let value = this.refs.searchVal.value;
        value = value.toLowerCase();
        Action.search(value);
    }
    render(){
        let title = this.props.title;
        return(
            <div className='search-wrapper clearfix'>
                <h1>20{title.year}年{title.month}月番</h1>
                <div className='search-content'>
                    <h3>本季共有{this.props.dataLength}部番剧</h3>
                    <div className='search-box-wrapper'>
                        <input  ref='searchVal'className='search-box' type='text' 
                        placeholder='搜索当季番组' onKeyUp={_.debounce(this.search.bind(this),250)}/>
                        <span className='iconfont icon-search'></span>
                    </div>
                </div>
            </div>
        )
    }
}
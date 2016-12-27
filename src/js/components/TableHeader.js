/*
* @Author: weimin
* @Date:   2016-08-16 17:26:39
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-03 16:46:22
*/

import React from 'react';
import Action from '../action/Action.js';


export  default class TableHeader extends React.Component{
    showConfig(){
        Action.setConfig('isShow');
    }
    render(){
        return(
            <div className='table-header'>
                <a className='config-btn' onClick={this.showConfig}>设置</a>
                <span className='header-title'>作品名</span>
                <span className='header-showtime-jp'>日本放送</span>
                <span className='header-showtime-cn'>大陆放送</span>
                <span className='header-station'>放送站点</span>
            </div>
        )
    }
}
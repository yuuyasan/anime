/*
* @Author: weimin
* @Date:   2016-08-04 15:40:23
* @Last Modified by:   weimin
* @Last Modified time: 2016-08-22 13:32:11
*/

import React from 'react';
import BgmItem from './BgmItem.js';
import $ from 'jquery';


export default class extends React.Component{
   
    render(){
        let listData = this.props.listData;
    
        return(
            <div className='bgm-list'>
            <p className={listData.length === 0 ? 'error-tip':'error-tip hide'}>没有要找的番剧哦~</p>
            {
                listData.map((item,index)=>{
                    return(
                        <BgmItem key = {index} itemInfo={item} configs={this.props.configs} />
                    )
                })
            }
            </div>
        )
        
    }
}
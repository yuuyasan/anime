/*
* @Author: weimin
* @Date:   2016-08-17 10:50:53
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-07 15:38:41
*/

import React from 'react';
import _ from 'underscore';
import Action from '../action/Action.js';
import BgmConfigStore from '../store/BgmConfigStore.js';

export default class ConfigBlock extends React.Component{
    componentDidMount(){
        BgmConfigStore.on('configChange',()=> this.forceUpdate())
    }
    setConfig(key){
        Action.setConfig(key);
    }
    setStation(key){
        Action.setStation(key);
    }
    resetSettings(){
        Action.resetSettings();
        Action.clearLabel();
    }
   
    render(){
        let configs = BgmConfigStore.getSettings('configs');
        let sites = BgmConfigStore.getSettings('station');
        return(
            <div className='config-block-wrapper'>
                <div className="config-block">
                    <div className="clearfix">
                        <div className='left-content clearfix'>
                            <div className="display-config-wrapper">
                                <h1>显示设置</h1>
                                <ul className='display-config-content'>
                                {
                                    _.map(configs,(value,key)=>{
                                        let status = value.status;
                            
                                        if(value.name)
                                        return (
                                            <li key={key} className='display-config-item'>
                                                <span>{value.name}</span>
                                                <span className={status?'iconfont icon-check checked':'iconfont icon-check'} 
                                                onClick={this.setConfig.bind(this,key)}></span>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                            <div className="setting-notice">
                                <h3>提示：</h3>
                                <p>重置所有设置包含<em>关注和隐藏内容</em></p>
                            </div>
                        </div>
                        <div className="station-config-wrapper">
                            <h1>站点过滤</h1>
                            <ul className='station-config-content'>
                            {
                                _.map(sites,(item,key)=>{
                                    return(
                                        <li key={key} className='station-config-item'>
                                            <span>{item.name}</span>
                                            <span className={item.status?'iconfont icon-check checked':'iconfont icon-check'}
                                            onClick={this.setStation.bind(this,key)}></span>
                                        </li>
                                    )
                                })
                            }
                            </ul>

                        </div>
                    </div>
                    <div className="btn-wrapper">
                        <a href="javascript:;" className="reset-btn btn" onClick={this.resetSettings}>重置所有设置</a>
                        <a href="javascript:;" className="close-btn btn" onClick={this.setConfig.bind(this,'isShow')}>关闭</a>
                    </div>
                </div>
            </div>
        )
    }
}
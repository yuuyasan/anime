/*
 * @Author: weimin
 * @Date:   2016-08-03 16:41:21
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 17:25:59
 */

import React from 'react';
import Utils from '../mods/Utils.js';
import BgmConfigStore from '../store/BgmConfigStore.js';
import _ from 'underscore';

export default class BgmItemAbstract extends React.Component {

    constructor(props){
        super(props);
    }

   
    render() {
        let item = this.props.itemInfo;
        let weekdayJP = Utils.formatWeekDay(item.weekDayJP);
        let weekdayCN = Utils.formatWeekDay(item.weekDayCN);
        let timeJP = Utils.formatTime(item.timeJP);
        let timeCN = Utils.formatTime(item.timeCN);
        let configs = this.props.configs;
        let sites = Utils.getSites(item.onAirSite);
        let stationFilter = BgmConfigStore.getSettings('station');
            sites = sites.filter((item)=>stationFilter[item.name].status)
                        .map((item)=>{
                            return {
                                name: stationFilter[item.name].name,
                                url: item.url
                            };
                            
                        });
        let stations =  sites.length?
                        sites.map( (item,index) =>{
                            return(
                                <li key={index}><a target="_blank" href={item.url} onClick={(e)=>{e.stopP
                                    ropagation()}}>{item.name}</a></li>
                            )
                        }):
                        <li className='no-sites'>过滤</li>;
       
        
        return (
            <div className={item.interested?'bgm-item-abstract interested clearfix':'bgm-item-abstract clearfix'} onClick={this.props.toggleDetail}>
                <div className='item-title'>{configs.showJPname.status?item.titleJP:item.titleCN}</div>
                <div className='item-jptime'>
                    <span>{weekdayJP}</span>
                    <span>{timeJP}</span>
                </div>
                <div className='item-cntime'>
                    <span>{weekdayCN}</span>
                    <span>{timeCN}</span>
                </div>
                <ul className="item-station">
                 {
                    stations                    
                 }
             
                </ul> 
                <div className="heart-wrapper"><span className='iconfont icon-heart'></span></div>
            </div>
        )
    }
}
/*
* @Author: weimin
* @Date:   2016-08-04 16:42:10
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-08 11:17:58
*/

import React from 'react';
import SideFilterBar from './SideFilterBar.js';
import BgmList from './BgmList.js';
import TableHeader from './TableHeader.js';
import SearchTitle from './SearchTitle.js';
import ConfigBlock from './ConfigBlock.js';
import $ from 'jquery';
import Utils from '../mods/Utils.js';
import BgmConfigStore from '../store/BgmConfigStore.js';
import BgmListStore from '../store/BgmlistStore.js';

export default class BgmWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgmListData:[],
            day: new Date().getDay(),
            showConfig: false
        }
        
    }
    componentDidMount(){
        BgmListStore.on('dataChange',() => this.forceUpdate());
        BgmConfigStore.on('configChange',() => this.forceUpdate());
    }
    changeDay(index){
        this.setState({
            day:index
        })
    }

    componentWillReceiveProps(nextProps){
        $.getJSON(nextProps.archive.path)
        .then( (res) => {
            console.log(res)
            this.setState({
                bgmListData: Utils.changeObjectToArray(res)
            })
        })
    }
    decideShow(item){
        let day = this.props.day;
        let filters = BgmListStore.getListFilter(),
            search = BgmListStore.getSearchInfo();
        let configs =  BgmConfigStore.getSettings('configs');

        if(day === 8 && !filters.interested[item.bgmId] ){
            return false;
        }

        if(configs.showNewOnly.status && !item.newBgm){
            return false;
        }
        if(day !== 7 && day!== 8 && item.weekDayCN !== day){
            return false;
        }
        if(search.status && item.titleCN.toLowerCase().indexOf(search.value) == -1){
            return false;
        }
         if( filters.uninterested[item.bgmId]){
            return false;
         }
         if(filters.interested[item.bgmId] === true){
            item.interested = true;
         }else{
            item.interested = false;
         }

        return true;
    }
    render(){
        console.log('bgm wrapper')
        let day = this.props.day;
        let bgmListData = this.state.bgmListData.filter(this.decideShow.bind(this));
        let date = Utils.changePathToDate(this.props.archive.path);
        let configs = BgmConfigStore.getSettings('configs');
        return(
            <div className='content-wrapper'>
                <SearchTitle title={date} dataLength={bgmListData.length}/>
                <div className='table-wrapper'>

                    <TableHeader/>
                    <div className={configs.isShow.status?'table-content clearfix show-config':'table-content clearfix'}>
                        <ConfigBlock/>
                        <SideFilterBar {...this.props} />
                        <BgmList listData={bgmListData} configs={configs} />
                    </div>
                </div>
            </div>
        )
    }
}
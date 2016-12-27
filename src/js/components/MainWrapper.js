/*
 * @Author: weimin
 * @Date:   2016-08-09 10:44:53
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 18:24:18
 */

import React from 'react';
import BgmWrapper from './BgmWrapper.js';
import BgmHeader from './BgmHeader.js';
import Utils from '../mods/Utils.js';
import ArchiveStore from '../store/ArchiveStore.js';
import BgmListStore from '../store/BgmlistStore.js';
import $ from 'jquery';

export default class MainWrapper extends React.Component {

    constructor() {
        super();
        // BgmConfigStore.initSettings();
        // let date = new Date();
        // let year = date.getFullYear();
        // let season = Utils.formatSeason(date.getMonth());

        this.state = {
            archivePath: '',
            archiveData: {},
            day: new Date().getDay()
        }

    }
 
    componentDidMount(){
        let date = new Date();
        let year = date.getFullYear();
        let season = Utils.formatSeason(date.getMonth());
    
        ArchiveStore.on('init',() => {
            this.setState({
                archivePath: ArchiveStore.getArchivePath(year,season),
                archiveData: ArchiveStore.getArchiveData()
            })
        })
        ArchiveStore.init();    
        BgmListStore.on('search',() => this.setState({
            day: 7
        }));
        
    }
    changeDay(index){
        this.setState({
            day:index
        })
    }

    changeTime(data){
        let year = data.year;
        let month = data.month;
        let season = Utils.formatSeason(month);
        let archivePath = ArchiveStore.getArchivePath(year,season);
        let archiveData = ArchiveStore.getArchiveData();
        this.setState({
            archivePath,
            archiveData
        })

    }
    render() {
        
        return ( 
            <div>
                <BgmHeader archiveData={this.state.archiveData} changeTime={this.changeTime.bind(this)}/>
                <BgmWrapper archive={this.state.archivePath} day={this.state.day} changeDay={this.changeDay.bind(this)}/> 
            </div>
        
        )
    }
}

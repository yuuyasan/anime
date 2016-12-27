/*
* @Author: weimin
* @Date:   2016-08-11 14:18:50
* @Last Modified by:   weimin
* @Last Modified time: 2016-08-16 10:31:46
*/

import React from 'react';
import _ from 'underscore';

export default class BgmHeader extends React.Component{

    render(){
        return (
            <div className='bgm-header-wrapper'>
                <div className='bgm-header'>
                    <h1>番剧放送</h1>
                    <div className='history-data-choose'>
                        <h2>历史数据</h2>
                        <ul className='history-year'>
                        {
                            _.map(this.props.archiveData,(val,year) => {
                                return (
                                    <li key={year} className='year-item'>
                                        {year}
                                        <ul className='history-month'>
                                        {
                                            _.map(val,(data,month) =>{
                                               return(
                                                    <li key={month} className='month-item' onClick={this.props.changeTime.bind(this,{year,month})}>{month}</li>
                                                )
                                            })
                                        }
                                        </ul>

                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
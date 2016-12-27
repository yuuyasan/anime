/*
* @Author: weimin
* @Date:   2016-08-04 16:10:28
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-07 18:28:59
*/

import React from 'react';
import Utils from '../mods/Utils.js';

export default class SideFilterBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowDay:props.day
        }
    }

    render(){
        let nowChooseDay = this.props.day;
        let nowDay = this.state.nowDay;
        return(
        
            <ul className='side-filter-bar'>
               {
                    Utils.getSideData().map((item,index) => {
                        return(
                            <li key={index} className={index===nowChooseDay?'side-item selected':'side-item'} 
                            onClick={this.props.changeDay.bind(this,index)}>
                                {index === nowDay && index !== 7 ? '今天' : item }
                            </li>
                        )
                    })
               }
            </ul>
        )
    }
}
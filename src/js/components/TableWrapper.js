/*
* @Author: weimin
* @Date:   2016-08-04 16:42:10
* @Last Modified by:   weimin
* @Last Modified time: 2016-08-04 16:46:23
*/

import React from 'react';
import SideFilterBar from './SideFilterBar.js';
import BgmList from './BgmList.js';

export default class TableWrapper extends React.Component{
    render(){
        return(
            <div className='table-wrapper'>
                <SideFilterBar/>
                <BgmList/>
            </div>
        )
    }
}
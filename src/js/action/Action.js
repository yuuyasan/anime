/*
* @Author: weimin
* @Date:   2016-08-18 10:22:10
* @Last Modified by:   weimin
* @Last Modified time: 2016-11-07 15:42:19
*/

import Dispatcher from '../dispatcher/Dispatcher.js';

export default {
    search(data){
        Dispatcher.dispatch({
            action: 'SEARCH_ITEM',
            data: data
        })
    },
    setConfig(data){
        Dispatcher.dispatch({
            action:'SET_CONFIG',
            data: data
        })
    },
    showConfig(){
        Dispatcher.dispatch({
            action: 'SHOW_CONFIG'
        })
    },
    setStation(data){
        Dispatcher.dispatch({
            action:'SET_STATION',
            data: data
        })
    },
    resetSettings(){
         Dispatcher.dispatch({
            action:'RESET_SETTINGS'
        })
    },
    labelItem(data){
        Dispatcher.dispatch({
            action:'LABEL_ITEM',
            data: data
        })
    },
    clearLabel(){
        Dispatcher.dispatch({
            action:'CLEAR_LABEL'
        })
    }
   
}
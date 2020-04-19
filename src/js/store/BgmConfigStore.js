 /*
  * @Author: weimin
  * @Date:   2016-08-16 17:56:19
  * @Last Modified by:   weimin
  * @Last Modified time: 2016-11-04 22:11:00
  */
 import { EventEmitter } from 'events';
 import Dispatcher from '../dispatcher/Dispatcher.js';
 import Utils from '../mods/Utils.js';
 import _ from 'underscore';

 let namespace = {
     configs: "CONFIGS",
     station: "STATION"
 }
 let defaultConfig = {
     isShow: {
         status: false
     },
     showNewOnly: {
         name: '只显示新番',
         status: false
     },
     showJPname: {
         name: '显示日文标题',
         status: false
     },

     openSwitchToToday: {
         name: '开启自动切换',
         status: true
     },
 };
 let defaultStationFilter = {
     acfun: {
         name: 'A站',
         status: true
     },
     bilibili: {
         name: 'B站',
         status: true
     },
     tucao: {
         name: 'C站',
         status: true
     },
     sohu: {
         name: '搜狐',
         status: true
     },
     youku: {
         name: '优酷',
         status: true
     },
     qq: {
         name: '腾讯',
         status: true
     },
     iqiyi: {
         name: '爱奇艺',
         status: true
     },
     letv: {
         name: '乐视',
         status: true
     },
     pptv: {
         name: 'PPTV',
         status: true
     },
     tudou: {
         name: '土豆',
         status: true
     },
     movie: {
         name: '迅雷',
         status: true
     },
     mgtv: {
         name: '芒果',
         status: true
     },
     all: {
         name: '全选',
         status: true
     }
 }
 let configs = {};

 let stations = {};

 class BgmConfigStore extends EventEmitter {

     getSettings(name) {

         let settings = Utils.storage(namespace[name]);
         if (_.isEmpty(settings)) {

             settings = this.initSettings(name);
         }
         return settings;
     }
     initSettings(name, setting) {
         switch (name) {
             case 'configs':
                 return defaultConfig;
                 break;
             case 'station':
                 return defaultStationFilter;
                 break;
         }
     }

     getStationFilter() {
         return stationFilter;
     }

     setConfig(key) {
         if (_.isEmpty(configs)) {
             configs = this.getSettings('configs');
         }

         let status = !configs[key].status;
         console.log(key)

         configs[key].status = status;
         // if(data.key == 'all'){
         //     setOption[data.key].name = status?'全选':'全不选';
         //     for(let item in setOption){
         //         setOption[item].status = status;
         //     }
         // }
         Utils.storage(namespace.configs, configs);
         this.emit('configChange');
     }

     setStation(key) {
         if (_.isEmpty(stations)) {
             stations = this.getSettings('station');
         }
         let status = !stations[key].status;
         stations[key].status = status;
         if (!status) {
             stations['all'].status = false;
         }
         if (key === 'all') {
             for (let item in stations) {
                 stations[item].status = status;
             }
         }
         Utils.storage(namespace.station, stations);
         this.emit('configChange');
     }
     resetSettings() {

         var isShow = {
             status: true
         }
         configs = this.deepClone(defaultConfig);
         configs.isShow.status = true;
         stations = this.deepClone(defaultStationFilter);


         console.log(defaultConfig)


         Utils.storage(namespace.configs, configs);
         Utils.storage(namespace.station, stations);
         this.emit('configChange');

     }
     deepClone(obj) {
         var cloneObj;
         if (!_.isObject(obj) || typeof obj === 'function') {
             return obj;
         }
         cloneObj = _.isArray(obj) ? [] : {};
         for (var i in obj) {
             if (obj.hasOwnProperty(i)) {
                 if (!_.isObject(obj[i])) {
                     // obj[i]为null和undefined都会进入这里  
                     cloneObj[i] = obj[i];
                 } else {
                     cloneObj[i] = this.deepClone(obj[i]);
                 }
             }
         }
         return cloneObj;
     }


 }
 let configStore = new BgmConfigStore();
 Dispatcher.register((e) => {

     switch (e.action) {
         case 'SET_CONFIG':
             configStore.setConfig(e.data);
             break;
         case 'SET_STATION':
             configStore.setStation(e.data);
             break;
         case 'RESET_SETTINGS':
             configStore.resetSettings();
     }
 });
 export default configStore;

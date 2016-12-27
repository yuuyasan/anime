/*
 * @Author: weimin
 * @Date:   2016-08-09 10:50:46
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 18:32:30
 */
import _ from 'underscore';
//获取当前年份，季度，day

let season = [1, 4, 7, 10];
let weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '全部','关注'];
let SITE_REGEX = {
    acfun: /acfun\.(tv|tudou)/,
    bilibili: /bilibili\.com/,
    tucao: /tucao\.(tv|cc)/,
    sohu: /sohu\.com/,
    youku: /youku\.com/,
    qq: /qq\.com/,
    iqiyi: /iqiyi\.com/,
    letv: /(le|letv)\.com/,
    pptv: /pptv\.com/,
    tudou: /tudou\.com/,
    movie: /kankan\.com/,
    mgtv: /mgtv\.com/
};
export default {
    getSites: (sites) => {
        return sites.map((item, index) => {
            for (let siteKey in SITE_REGEX) {
                if (SITE_REGEX[siteKey].test(item)) {
                    return {
                        name: siteKey,
                        url: item
                    }
                }
            }
        })
    },


    formatSeason: month => {
        let index = parseInt((month - 1) / 3);
        return season[index];
    },
    changeObjectToArray: obj => {
        let newArray = [];
        for (let key in obj) {
            newArray.push(obj[key])
        }
        return newArray;
    },
    formatWeekDay: day => {
        let index = day % 7;
        return weekday[index];
    },
    formatTime: time => {
        var arr = time.split('');
        arr.splice(2, 0, ":");
        return time && arr.join('');

    },
    getSideData: () => weekday,
    changePathToDate: (path = '') => {
        let res = path.match(/\d{2}/g) || {};
        return {
            year: res[0],
            month: res[1]
        };
    },
    storage: (name, data) => {
        let result = null;
        if (data) {
            localStorage.setItem(name, JSON.stringify(data));
        }
        result = localStorage.getItem(name);
        return (result && JSON.parse(result)) || [];
    },
    deepClone: function(obj) {
        var cloneObj;
        var that = this;
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
                    cloneObj[i] = that.deepClone(obj[i]);
                }
            }
        }
        return cloneObj;
    }



}

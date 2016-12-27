/*
 * @Author: weimin
 * @Date:   2016-08-09 11:35:20
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-08-15 15:38:27
 */

import { EventEmitter } from 'events';
import $ from 'jquery';

var archiveData = {};
class ArchiveStore extends EventEmitter {
    getArchivePath(year,season) {
        
        //console.log(archiveData[year][season])
        
        return archiveData[year][season];

    }
    getArchiveData(){
        return archiveData;
    }
    init() {
        $.getJSON('json/archive.json')
            .then((res) => {
                archiveData = res.data;
                this.emit('init');
        })
    }
}
export default new ArchiveStore();

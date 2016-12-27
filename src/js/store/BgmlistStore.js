/*
 * @Author: weimin
 * @Date:   2016-08-10 11:13:22
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-11-07 18:22:03
 */

import { EventEmitter } from 'events';
import $ from 'jquery';
import Dispatcher from '../dispatcher/Dispatcher.js';
import Utils from '../mods/Utils.js';
import _ from 'underscore';

let namespace = 'FILTERS';
let listFilter = {
    interested: {},
    uninterested: {}
}
let search = {
    status: false,
    value: ''
};
class BgmListStore extends EventEmitter {
    searchItem(val) {
        if (val !== '') {
            search = {
                status: true,
                value: val
            }
        } else {
            search = {
                status: false,
                value: ''
            }
        }
        //Utils.storage(namespace,listFilter);
        this.emit('dataChange');
        this.emit('search');
    }
    getListFilter() {
        let filters = Utils.storage(namespace);
        if (_.isEmpty(filters)) {

            filters = listFilter;
        }
        return filters;
    }
    getSearchInfo() {
        return search;
    }
    labelItem(data) {
        let that = this;
        _.extend(listFilter, that.getListFilter());
        let list = listFilter[data.type];
        if (data.status === true) {
            list[data.id] = data.status;
        } else if (data.status === false) {
            delete list[data.id];
        }
        console.log(list);

        Utils.storage(namespace, listFilter);
        this.emit('dataChange');
    }
    clearLabel() {
        listFilter = {
            interested: {},
            uninterested: {}
        }
        Utils.storage(namespace, listFilter);
        this.emit('dataChange');
    }
}
let listStore = new BgmListStore();
Dispatcher.register((e) => {
    switch (e.action) {
        case 'SEARCH_ITEM':
            listStore.searchItem(e.data);
            break;
        case 'LABEL_ITEM':
            listStore.labelItem(e.data);
            break;
        case 'CLEAR_LABEL':
            listStore.clearLabel();
    }

})
export default listStore;

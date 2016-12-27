/*
 * @Author: weimin
 * @Date:   2016-08-03 14:45:07
 * @Last Modified by:   weimin
 * @Last Modified time: 2016-08-09 10:49:16
 */
import React from 'react';
import ReactDom from 'react-dom';
import css from '../css/anime.less';
import MainWrapper from './components/MainWrapper.js';

ReactDom.render((
        <MainWrapper/>
    ),
    document.getElementById('app')
);
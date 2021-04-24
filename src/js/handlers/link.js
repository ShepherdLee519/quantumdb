/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 19:50:51 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 15:22:03
 */

import { solveAbstract, hightLight } from './common';
import { Data } from '../global';


/**
 * 点击显示摘要完整信息的事件处理函数
 */
export function initLinkHandler() {
    $('#container').on('click', '.abstract-link', function() {
        let state = $(this).data('state');
        let i = $(this).data('index');
        let $td = $(this).parent();
        const link_open = `<a href="#" class="abstract-link" 
            data-state="open" data-index="${i}"><<</a>`;

        let abstract = Data.get('abstract')[i];
        let key = Data.get('key').theme;
        if (state == 'close') {
            $td.html(hightLight(abstract, key) + ' ' + link_open);
        } else if (state == 'open') {
            $td.html(hightLight(solveAbstract(abstract, i), key));
        }

        return false;
    });
}
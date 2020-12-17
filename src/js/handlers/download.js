/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-17 00:04:25 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-17 00:18:30
 */

import { common as $$ } from '../common/common';


/**
 * 点击下载图标下载文献的事件处理函数
 */
function downloadHandler() {
    let index = +($(this).data('index'));
    let title = ($(this).parent().text()).trim();
    const filePath = './PDF/';

    const $a = $(`<a class="hidden" download="${title}" 
        href="${filePath + index + '.pdf'}" ></a>`);
    $('body').append( $a );
    $a[0].click();
    $a.remove();
    return false;
}


export function initDownloadHandler() {
    $$.delegate( $('#container-tbody'), {
        target: '.download-icon',
        event: 'click',
        handler: downloadHandler
    });
}
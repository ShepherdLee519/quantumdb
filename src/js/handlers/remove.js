/*
 * @Author: Shepherd.Lee 
 * @Date: 2021-04-24 14:37:21 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 15:10:12
 */

import { common as $$ } from '../common/common';


/**
 * 点击删除图标删除文献的事件处理函数
 */
 function removeHandler() {
    const $tr = $(this).closest('tr');
    const index = $tr.data('index'); // 该index即数据库中的index相同，与pdf文件的名字相同
    const title = $tr.data('title');
    const filePath = './PDF/';
    const path = filePath + index + '.pdf';

    const message = `请确认您是否要删除文献: \n< ${title} >?\n\n(WARNING:此举不能恢复！)`; 
    let flag = confirm(message);
    if ( !flag ) return false;

    $.get('./php/mysql/remove/mysql_remove_paper.php', 
        { index: index }, res => {
        if (res) {
            console.log('delete from DB!');  
            alert(`已删除文献< ${title} >!`);

            $.get('./php/delete_paper.php', 
                { index: index }, res => {
                if (res) {
                    console.log('delete pdf!');
                }

                // 自动刷新页面
                location.reload();
            })
        }
    });

    return false;
}


export function initRemoveHandler() {
    $$.delegate( $('#container-tbody'), {
        target: '.remove-icon',
        event: 'click',
        handler: removeHandler
    });
}
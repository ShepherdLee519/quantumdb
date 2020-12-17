/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 19:33:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-14 13:05:08
 */


import { common as $$ } from '../../common/common';
import { Data } from '../../global';


/**
 * 读入 savedrecs.html 文档
 * 
 * @param {String} url savedrecs.html 的路径
 */
export function readSavedrecs(url) {
    $.get('./php/read_savedrecs.php', { url: url }, res => {
        Data.set('savedrecs', $(res));
        
        $$.beacon('./php/delete_savedrecs.php');
        $$.trigger('readSavedrecs');
    });
}
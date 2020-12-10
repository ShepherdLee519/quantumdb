/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 19:33:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 09:36:11
 */


import { common as $$ } from '../common/common';
import { Data } from '../global';


/**
 * 读入所有待处理的pdf文件名
 * 
 * @param {String} url pdf 的文件夹所在的路径
 */
export function readFilenames(url) {
    $.get('./php/read_filename.php', { url: url }, res => {
        Data.set('filenames', JSON.parse(res));
        console.log(Data.get('filenames'));
        Data.set('dir', url);

        $$.trigger('readFilenames');
    });
}


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
/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 19:35:29 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-14 13:07:06
 */

import { common as $$ } from '../common/common';
import { readSavedrecs } from './folder/read';
import { solveFolderPDFs } from './folder/folderpdf';
import { solveFilePDFs } from './file/filepdf';


/**
 * 上传完 pdf(文件夹) 后实际触发的处理函数(处理pdf -> 写入数据库)
 */
export const solveFolder = $$.times(2, function solve() {
    // 路径相对于 ./php/read_file.php
    const savedrecsPath = '../PDF/savedrecs/savedrecs.html';

    // trigger('readSavedrecs');
    readSavedrecs(savedrecsPath);
    $$.listen('readSavedrecs', solveFolderPDFs);
});


/**
 * 上传完文件后实际触发的处理函数
 * 
 * @param {Number} num 待处理文件数量
 */
export function solveFiles(num) {
    solveFilePDFs(num);
}
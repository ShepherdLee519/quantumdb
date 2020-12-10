/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 19:35:29 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 10:07:15
 */

import { common as $$ } from '../common/common';
import { readFilenames, readSavedrecs } from './read';
import { solvePDFs } from './solvepdf';


/**
 * 上传完 pdf 后实际触发的处理函数(处理pdf -> 写入数据库)
 */
export const solve = $$.times(2, function solve() {
    // 路径相对于 ./php/read_file.php
    const pdfPath = '../PDF/target/';
    const savedrecsPath = '../PDF/savedrecs/savedrecs.html';

    // $$.multistep([
    //     readFilenames,
    //     readSavedrecs
    // ], [
    //     [pdfPath], 
    //     [savedrecsPath]
    // ]);
    readSavedrecs(savedrecsPath);

    // $$.multilisten(['readFilenames', 'readSavedrecs'], solvePDFs);
    $$.listen('readSavedrecs', solvePDFs);
});
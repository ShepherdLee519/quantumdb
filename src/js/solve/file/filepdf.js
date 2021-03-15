/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-10 20:02:43 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-01-25 21:09:51
 */

import { common as $$ } from '../../common/common';
import { Data } from '../../global';
import { initCheckTable } from './check';


/**
 * 实际处理 pdf 的函数：py脚本处理 -> 结果处理 -> 打包返回(未实际上传)
 * 
 * @param {Number} num 待处理的 pdf 序号 
 * @param {Object} filedatas 数据存储的位置
 * @param {Function} success 成功处理完后调用的函数
 */
function solveFilePDF(num, filedatas, success) {
    // 1. 通过 py 脚本获取数据
    $.ajax({
        type: 'GET', url: './php/script/runpy.php',
        data: { filenum: num },
        dataType: 'json',
        success: res => {
            console.log(`upload filenum: ${num}`);
            console.log(`Response data: ${res}`);

            if ( !Array.isArray(res) ) {
                console.error('Wrong response occured in <solveFilePDF>');
                return false;
            }

            // 2. 额外处理author
            let authors = res[1];
            if ( !$$.isundef(authors) ) {
                let author = authors.split(',')
                    .map(v => v.trim())
                    .filter(v => v != '');
                res[1] = author;
            } 

            // 3. 保存至全局 Data 中
            filedatas[num - 1] = res;
            success();
        }
    }) // end ajax
}


/**
 * 逐一处理所有PDF的外壳函数，实际处理的是solveFilePDF
 * 
 * @param {Number} num 待处理 pdf 文件数量 
 */
export function solveFilePDFs(num) {
    Data.set('filedatas', Array.from({length: num}, _ => []));
    const success = $$.times(num, function() {
        console.log(Data.get('filedatas'));
        // 建立确认table
        initCheckTable();
    });

    for (let i = 1; i <= num; i++) {
        solveFilePDF(i, Data.get('filedatas'), success);
    } 
}
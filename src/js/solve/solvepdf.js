/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 19:33:42 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 10:24:21
 */

import { common as $$ } from '../common/common';
import { Data } from '../global';


/**
 * 处理PDF: 提取对应的信息(从savedrecs中) 并写入数据库
 * 
 * @param {String} filename 文件名
 * @param {Object} $info savedrecs $对象
 * @param {Function} success 成功写入数据库后调用的函数
 */
function solvePDF(filename, index, $info, success) {
    console.log(filename);

    // 1. 正则提取出title
    let titlePattern = /[0-9]{4}-(.*)\.pdf/g;
    // 这个 title 可能不完整 完整的 title 在组装 json 值的步骤求得 
    let title = titlePattern.exec(filename)[1];

    // 2. 根据 title 获取 $table 对象
    let $table = $info.find(`td:contains(${title})`).closest('table');
    
    // 3. 组装json值
    let json = { pdfname: filename, dir: Data.get('dir') };
    let keys = [
        'title', 'source', 'type', 'volume', 'beginpage', 
        'endpage', 'doi', 'date', 'year', 'abstract'
    ];
    let targets = [
        'TI', 'SO', 'PT', 'VL', 'BP', 'EP', 'DI', 'PD', 'PY', 'AB'
    ];
    keys.forEach( (key, i) => {
        let $td = $table.find(`td:contains(${targets[i]})`), str;
        if ( !$td.length ) str = '';
        else {
            $td = $td.eq(0).next();
            if ( !$td.length ) str = '';
            else str = $td.html().trim();
        }
        json[key] = str.replace(/"/g, '\'');
    });
    json.title = (json.title).replace(/[*?"'<>|/\\]/g, '');

    json.author = [];
    let $td = $table.find('td:contains("AU")');
    if ( $td.length ) {
        $td.next().find('br').remove();
        let authors = $td.next().html().split('\n');
        authors.forEach(author => {
            json.author.push(author.trim());
        });
    }
    if ( !json.author.length ) return;
    else json.authors = json.author.join('; ');
    
    // 4. 添加入数据库
    $.get('./php/mysql/add/mysql_add_data.php', json, res => {
        console.log(res);
        if (res) {
            console.log('Insert ' + json.title); 
            success();
            // res 值为 index
            $$.beacon('./php/update_pdfname.php', 
                { name: index + '.pdf', title: title, index: res });
        }
    });
}

/**
 * 逐一处理所有PDF的外壳函数，实际处理的是solvePDF
 */
export function solvePDFs() {
    console.log('Finish!!!');

    const fileNames = Data.get('filenames');
    const savedrecs = Data.get('savedrecs');
    const success = $$.times(fileNames.length, function() {
        alert('文献上传成功！');
        // 自动刷新页面
        location.reload();
    });

    fileNames.forEach( (filename, i) => {
        solvePDF(filename, i + 1, savedrecs, success);
    });
}
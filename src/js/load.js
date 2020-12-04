/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:23:27 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:32:51
 */

import { common as $$ } from './common/common';
import { Data } from './global';


$(function() {
    // multistep([
    //     readFilenames,
    //     readSavedrecs
    // ]);

    // multilisten(['readFilenames', 'readSavedrecs'], solvePDFs);
});

/**
 * 读入所有待处理的pdf文件名
 */
function readFilenames() {
    let url = 'C:/Users/lenovo/Desktop/文献数据库/endnote/我的EndNote库.Data/PDF/';
    $.get('./php/read_filename.php', { url: url }, res => {
        Data.set('filenames', JSON.parse(res));
        Data.set('dir', url);
        $$.trigger('readFilenames');
    });
}


/**
 * 读入 savedrecs.html 文档
 */
function readSavedrecs() {
    let url = 'C:/Users/lenovo/Desktop/文献数据库/endnote/savedrecs.html';
    $.get('./php/read_file.php', { url: url }, res => {
        Data.set('savedrecs', $(res));
        $$.trigger('readSavedrecs');
    });
}

/**
 * 处理PDF: 提取对应的信息(从savedrecs中) 并写入数据库
 * @param {String} filename 文件名
 * @param {Object} $info savedrecs $对象
 */
function solvePDF(filename, $info) {
    console.log(filename);

    // 1. 正则提取出title
    let titlePattern = /[0-9]{4}-(.*)\.pdf/g;
    let title = titlePattern.exec(filename)[1];

    // 2. 根据 title 获取 $table 对象
    let $table = $info.find(`td:contains(${title})`).closest('table');
    
    // 3. 组装json值
    let json = {pdfname: filename, dir: Data.get('dir')};
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
    // console.log(json);
    
    // 4. 添加入数据库
    $.get('./php/mysql/add/mysql_add_data.php', json, res => {
        console.log(res);
        if (res) console.log('Insert ' + json.title); 
    });
}

/**
 * 逐一处理所有PDF的外壳函数，实际处理的是solvePDF
 */
function solvePDFs() {
    console.log('Finish!!!');
    
    let fileNames = Data.get('filenames');
    let savedrecs = Data.get('savedrecs');

    fileNames.forEach(filename => {
        solvePDF(filename, savedrecs);
    });
    // console.log(fileNames[48]);
}
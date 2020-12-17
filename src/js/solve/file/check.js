/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-11 16:29:49 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-15 13:03:43
 */

import { common as $$ } from '../../common/common';
import { Data } from '../../global';


// 相关 DOM 元素的初始化
const $modal = $('#checkModal');
const $body = $('#check-tbody');


/**
 * 组装 Tr 并以字符串形式返回
 * 
 * @param {Number} index 序号 - 与target文件的序号对应
 * @param {String} title 标题
 * @param {String} authors 作者
 * @param {String} abstract 摘要 
 */
function createTr(index, title, authors, abstract) {
    let str = `
    <tr>
        <td>${index}</td>
        <td>
            <input type="text" class="title form-control" value="${title}" /></td>
        <td>
            <textarea class="authors form-control" rows=4>${authors}</textarea></td>
        <td>
            <textarea class="abstract form-control" rows=4>${abstract}</textarea></td>
    </tr>`.trim();

    return str;
}


/**
 * 提取check table中的值组装成数据返回
 */
export function getCheckData() {
    const arr = [];
    const $trs = $body.find('tr');

    [...$trs].forEach(tr => {
        let $tr  = $(tr);
        let obj = {};
        
        $$.inject( $tr );
        obj['title'] = $$._('.title').val();
        obj['authors'] = $$._('.authors').val();
        obj['author'] = (obj['authors']).split(',');
        obj['abstract'] = $$._('.abstract').val();
        $$.reject();

        arr.push(obj);
    });

    return arr;
}


/**
 * 初始化确认上传文件的表单
 */
export function initCheckTable() {
    const filedatas = Data.get('filedatas');
    $body.html('');

    let str = ''
    filedatas.forEach( (data, i) => {
        let [title, authors, abstract] = data;
        str += createTr(i + 1, title, authors, abstract);
    });

    $body.html(str);
    $modal.modal('show');
}
/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 19:50:32 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:19:47
 */

import { solveAbstract, hightLight } from './common';
import { Data } from '../global';


/**
 * 显示查询的结果
 * 
 * @param {Array<Object>} json 
 * @param {Object} key
 */
function showResponse(json, key) {
    const $body = $('#container-tbody');
    $body.html('');

    let abstracts = [];
    let str = '';
    json.forEach( (data, i) => {
        str += `
        <tr>
            <td>${i + 1}</td>
            <td>${hightLight(data.title, key.theme)}</td>
            <td>${hightLight(data.author, key.author)}</td>
            <td>${data.year}</td>
            <td>${hightLight(solveAbstract(data.abstract, i), key.theme)}</td>
        </tr>
        `;
        abstracts.push(data.abstract);
    });
    
    Data.set('abstract', abstracts);
    $body.html(str);
}


/**
 * 点击查询按钮的事件处理函数
 */
export function initBtnHandler() {
    const $search = $('#search');
    
    $search.on('click', () => {
        let theme = $('#theme-input').val();
        let author = $('#author-input').val();
        let year = $('#year-input').val();
        let key = {
            theme: theme,
            author: author,
            year: year
        };
        
        if (theme == '' && author == '' && year == '') return false;
        else {
            $.get('./php/mysql/find/mysql_find_paper.php', key, res => {
                res = JSON.parse(res);
                Data.set('key', key);
                showResponse(res, key);
            });
        }

        return false;
    });
}
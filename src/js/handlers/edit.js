/*
 * @Author: Shepherd.Lee 
 * @Date: 2021-04-24 14:37:21 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 16:13:28
 */

import { common as $$ } from '../common/common';
import { Data } from '../global';
import { hightLight, solveAbstract } from './common';

const $modal = $('#editModal');

function updateTr(data) {
    const $tr = $(`tr[data-index = ${data.index}]`);
    const $tds = $tr.find('td');
    const key = Data.get('key');

    // 1. 修改标题
    $tr.data('title', data.title);
    $tds.eq(1).html(`${hightLight(data.title, key.theme)} 
    <span class="glyphicon glyphicon-cloud-download download-icon"
        data-index=${data.index} title="点击下载文件">`);

    // 2. 修改作者
    $tds.eq(2).html(`${hightLight(data.authors,key.author)}`);

    // 3. 修改年份
    $tds.eq(3).html((data.year && +(data.year) != 0) ? data.year : ' — ');

    // 4. 修改摘要
    const i = +($tds.eq(0).html()) - 1;
    $tds.eq(4).html(`${hightLight(solveAbstract(data.abstract, i), key.theme)}`);
    Data.get('abstract')[i] = data.abstract;
}

/**
 * 点击确认编辑结果的事件处理函数
 */
export function initEditConfirmHandler() {
    $('#editConfirm').on('click', () => {

        const index = +($('#edit-index').html());
        const title = $('#edit-title').val();
        const authors = $('#edit-authors').val();
        const year = $('#edit-year').val();
        const abstract = $('#edit-abstract').val();

        const data = {
            'index': index,
            'title': title,
            'authors': authors,
            'year': year,
            'abstract': abstract
        };

        $.get('./php/mysql/update/mysql_update_paper.php', 
            data, res => {
            if (res) {
                updateTr(data);
                console.log('Edit Paper!');
                $modal.modal('hide');
            }
        });
    });
}

/**
 * 点击编辑图标编辑文献的事件处理函数
 */
 function editHandler() {
    const $tr = $(this).closest('tr');
    const index = $tr.data('index');
    const $tds = $tr.find('td');

    const i = $tds.eq(0).html().trim();
    const title = $tds.eq(1).text().trim();
    const authors = $tds.eq(2).html().trim();
    let year = $tds.eq(3).html().trim();
    const abstract = Data.get('abstract')[+i - 1];

    $('#edit-index').html(index);
    $('#edit-title').val(title);
    $('#edit-authors').val(authors);
    $('#edit-year').val( Number.isNaN( +year ) ? undefined : +year );
    $('#edit-abstract').val(abstract);
    $modal.modal('show');
    
    return false;
}


export function initEditHandler() {
    $$.delegate( $('#container-tbody'), {
        target: '.edit-icon',
        event: 'click',
        handler: editHandler
    });
}
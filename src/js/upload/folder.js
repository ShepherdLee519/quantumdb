/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-30 13:48:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 10:03:50
 */

import { common as $$ } from '../common/common';
import { Data } from '../global';
import { solve } from '../solve/solve';


// 相关的 DOM 对象的获取
const $modal = $('#uploadModal');
$$.inject( $('#uploadFolderForm') );
const $location     = $$._('#uploadFolder-location');
const $check        = $$._('#uploadFolder-check');
const $file         = $$._('#uploadFolder-file');
$$.reject();


/**
 * uoloadFolderForm 中的与上传相关的一些 handler
 */
function uploadFolderFormHandlers() {
    // 上传文件夹
    $file.change( () => {
        $location.val( $file.val() );
    });

    $check.click( () => {
        $file.click();
    });
}


/**
 * 清空 location 与 file 的 input 的值
 */
function uploadFolderClearHandler() {
    $file.val('');
    $location.val('');
}


/**
 * 取消文件的上传
 */
function uploadFolderCancelHandler() {
    const $cancel = $('#uploadModalCancel');
    
    $cancel.on('click', () => {
        uploadFolderClearHandler();
        $modal.modal('hide');
        
        return false;
    });
}


/**
 * 涉及文件的上传
 */
function uploadFolderConfirmHandler() {
    const $form = $('#uploadFolderForm');
    const $confirm = $('#uploadModalConfrim');
    
    $confirm.on('click', function() {
        $form.trigger('submit');
        return false;
    });

    $form.on('submit', function() {
        // 组装用于post的表单数据对象
        const formData = new FormData( $form[0] );

        $.ajax({
            type: 'POST', url:'./php/upload/upload_folder.php',
            data: formData, cache: false, dataType: 'json',
            contentType: false, processData: false,
            success: function(res) {
                // if ( +res < 0) {
                //     console.log('Error Code: ', res);
                // } else {
                //     console.log('Upload <PDF> Successfully!');
                //     solve();
                //     $modal.modal('hide');
                // }
                $modal.modal('hide');
                Data.set('filenames', JSON.parse(JSON.stringify(res)));
                solve();
            }
        });

        return false;
    });
}


/**
 * 上传文件部分的功能的初始化\
 * 注意 点击按钮触发模态框的部分在 btn.js 中
 */
export function initUploadFolder() {
    $$.multistep([
        uploadFolderFormHandlers,
        uploadFolderCancelHandler,
        uploadFolderConfirmHandler
    ]);
}
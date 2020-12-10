/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-30 13:48:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 20:29:09
 */

import { common as $$ } from '../common/common';
import { solve } from '../solve/solve';


// 相关的 DOM 对象的获取
const $modal = $('#uploadModal');
$$.inject( $('#uploadSavedrecsForm') );
const $location  = $$._('#savedrecs-location');
const $check     = $$._('#savedrecs-check');
const $file      = $$._('#savedrecs-file');
$$.reject();


/**
 * uoloadFolderForm 中的与上传相关的一些 handler
 */
function uploadSavedrecsFormHandlers() {
    // 上传 savedrecs.html
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
function uploadSavedrecsClearHandler() {
    $file.val('');
    $location.val('');
}


/**
 * 取消文件的上传
 */
function uploadSavedrecsCancelHandler() {
    const $cancel = $('#uploadModalCancel');
    
    $cancel.on('click', () => {
        uploadSavedrecsClearHandler();
        $modal.modal('hide');
        
        return false;
    });
}


/**
 * 涉及文件的上传
 */
function uploadSavedrecsConfirmHandler() {
    const $form = $('#uploadSavedrecsForm');
    const $confirm = $('#uploadModalConfrim');
    
    $confirm.on('click', function() {
        $form.trigger('submit');
        return false;
    });

    $form.on('submit', function() {
        // 组装用于post的表单数据对象
        const formData = new FormData( $form[0] );

        $.ajax({
            type: 'POST', url:'./php/upload/upload_savedrecs.php',
            data: formData, cache: false, dataType: 'json',
            contentType: false, processData: false,
            success: function(res) {
                if ( +res < 0) {
                    console.log('Error Code: ', res);
                } else {
                    console.log('Upload <savedrecs> Successfully!');
                    solve();
                    $modal.modal('hide');
                }
            }
        });

        return false;
    });
}


/**
 * 上传文件部分的功能的初始化\
 * 注意 点击按钮触发模态框的部分在 btn.js 中
 */
export function initUploadSavedrecs() {
    $$.multistep([
        uploadSavedrecsFormHandlers,
        uploadSavedrecsCancelHandler,
        uploadSavedrecsConfirmHandler
    ]);
}
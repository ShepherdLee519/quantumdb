/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-30 13:48:05 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-03-09 22:15:16
 */

import { common as $$ } from '../../common/common';
import { solveFiles } from '../../solve/solve';
import { radioVal } from '../../handlers/radio';


// 相关的 DOM 对象的获取
const $modal = $('#uploadModal');
$$.inject( $('#uploadFileForm') );
const $location     = $$._('#uploadFile-location');
const $check        = $$._('#uploadFile-check');
const $file         = $$._('#uploadFile-file');
$$.reject();


/**
 * uoloadFileForm 中的与上传相关的一些 handler
 */
function uploadFileFormHandlers() {
    // 上传文件
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
function uploadFileClearHandler() {
    $file.val('');
    $location.val('');
}


/**
 * 取消文件的上传
 */
function uploadFileCancelHandler() {
    const $cancel = $('#uploadModalCancel');
    
    $cancel.on('click', () => {
        uploadFileClearHandler();
        $modal.modal('hide');
        
        return false;
    });
}


/**
 * 涉及文件的上传
 */
function uploadFileConfirmHandler() {
    const $form = $('#uploadFileForm');
    const $confirm = $('#uploadModalConfrim');
    
    $confirm.on('click', function() {
        $form.trigger('submit');
        return false;
    });

    $form.on('submit', function() {
        if (radioVal !== 'file') return false;
        
        // 组装用于post的表单数据对象
        const formData = new FormData( $form[0] );

        // 上传至临时文件夹 - 未正式上传
        $.ajax({
            type: 'POST', url:'./php/upload/upload_file.php',
            data: formData, cache: false, dataType: 'json',
            contentType: false, processData: false,
            success: function(res) {
                $modal.modal('hide');
                console.log(`upload files: ${res}`);
                // 进一步处理 - 正式上传文件
                solveFiles(+res);
            }
        });

        return false;
    });
}


/**
 * 上传文件部分的功能的初始化\
 * 注意 点击按钮触发模态框的部分在 btn.js 中
 */
export function initUploadFile() {
    $$.multistep([
        uploadFileFormHandlers,
        uploadFileCancelHandler,
        uploadFileConfirmHandler
    ]);
}
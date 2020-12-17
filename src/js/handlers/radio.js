/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 17:22:01 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-15 12:33:54
 */

import { common as $$ } from '../common/common';


export let radioVal = 'file';
const $folder       = $('#uploadFolderForm');
const $savedrecs    = $('#uploadSavedrecsForm');
const $file         = $('#uploadFileForm');


/**
 * 模态框内的 单选按钮对应的切换事件处理
 */
export function initRadioHandler() {
    const $radios = $('input[type="radio"][name="uploadtype"]');

    $radios.on('change', function() {
        const val = $(this).val();
        if (radioVal === val) return false;
        else radioVal = val;

        switch(val) {
            case 'folder':
                $$.show([ $folder, $savedrecs ]).hide( $file );
                break;
            case 'file':
                $$.show( $file ).hide([ $folder, $savedrecs ]);
                break;
            default:
                console.error(`Wrong Radio val: ${val}`);
        }

        return false;
    });
}
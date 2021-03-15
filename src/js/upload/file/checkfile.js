/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-11 20:46:21 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-03-09 23:47:42
 */

import { common as $$ } from '../../common/common';
import { getCheckData } from '../../solve/file/check';


// 相关的 DOM 对象的获取
const $modal = $('#checkModal');


/**
 * 上传确认后的文件数据
 * 
 * @param {Object} obj 上传的数据对象 title/author/authors/abstract
 * @param {Number} num 对象对应的index => target${num}.pdf
 * @param {Function} success 全部上传成功后调用
 */
function uploadCheckedFile(obj, num, success) {
    obj.num = num;
    $.get('./php/mysql/add/mysql_add_data_file.php', obj, res => {
        try {
            let index = +res; // 数据库中的id值
            console.log('index: ', index);
            success();
            if (index != -1) {
                moveCheckedFile(`target${num}.pdf`, index);
            }
        } catch(err) {
            console.error('Error occured in <uploadCheckedFile>');
        }
    });
}


/**
 * 上传完后移动 pdf 位置\
 * 由uploadCheckedFile 上传结束后调用
 * 
 * @param {String} pdfname 应为targetX.pdf 注意要带后缀
 * @param {Number} index 此处的 index 应为数据库中存储的index值
 */
function moveCheckedFile(pdfname, index) {
    $$.beacon('./php/update_pdfname.php', 
        { name: pdfname, index: index });
}


/**
 * 确认文献上传点击确切后的事件处理
 */
function uploadCheckConfirmHandler() {
    const $confirm = $('#checkConfrim');

    $confirm.on('click', () => {
        // 1. 获取打包后的上传数据
        const data = getCheckData();

        // 写入数据库成功后触发
        const success = $$.times(data.length, function() {
            alert('文献上传成功！');
            // 自动刷新页面
            location.reload();
        });
        
        // 2. 加入数据库(并移动pdf文件)
        data.forEach( (obj, i) => {
            uploadCheckedFile(obj, i + 1, success);
        });
        
        $modal.modal('hide');

        return false;
    });
}


/**
 * 确认文件并上传的事件处理\
 * 使用initUploadCheck包装调用是为了保证API格式的统一
 */
export function initUploadCheckedFile() {
    uploadCheckConfirmHandler();
}
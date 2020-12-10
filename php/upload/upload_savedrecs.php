<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 15:49:24 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 19:52:52
 */

$str = "savedrecs"; // name(input)
$FILE_PATH = "../../PDF/savedrecs/"; // 文件上传文件夹，注意文件夹的路径末尾需要有'/'
$FILE_MAX_SIZE = 8 * 1024 * 1024; // 当前最大上传大小为 8M - 需要在php.ini中修改

setlocale(LC_ALL, 'zh_CN.UTF8'); // 设置编码格式否则中文文件乱码

if ( $_FILES[ $str ]['error'] > 0) {
    die(-3);
}

$filename = 'savedrecs.html';
$upload_file = $FILE_PATH . $filename;

if (is_uploaded_file( $_FILES[ $str ]['tmp_name'] )) {
    if ( !move_uploaded_file(
            $_FILES[ $str ]['tmp_name'], 
            iconv("UTF-8", "gb2312", $upload_file)
        )){
        echo -4;
    }
}

echo 1;

?>
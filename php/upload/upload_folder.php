<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 15:49:24 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 09:51:33
 */

require_once '../helper.php';

$str = "uploadFolder"; // name(input)
$FILE_PATH = "../../PDF/target/"; // 文件上传文件夹，注意文件夹的路径末尾需要有'/'
$FILE_MAX_SIZE = 8 * 1024 * 1024; // 当前最大上传大小为 8M - 需要在php.ini中修改


$total = count( $_FILES[ $str ]['name'] );
$files = array();
for ( $i = 0; $i < $total; $i++) {
    if ( $_FILES[ $str ]['error'][ $i ] > 0) {
        die(-1);
    }

    $files[] = $_FILES[ $str ]['name'][ $i ];
    $upload_file = $FILE_PATH . ($i + 1) . '.pdf';

    if (is_uploaded_file( $_FILES[ $str ]['tmp_name'][ $i ] )) {
        if ( !move_uploaded_file(
                $_FILES[ $str ]['tmp_name'][ $i ], 
                iconv("UTF-8", "gb2312", $upload_file)
            )){
            echo -2;
        }
    }
}

echo _tojson( $files );;

?>
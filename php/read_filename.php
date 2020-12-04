<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:32:29 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:40:19
 */

/**
 * 从指定文件夹下收集文件名并返回文件名数组
 */

require_once './helper.php';
$url = $_GET["url"];

function read_all_dir ( $dir ) {
    global $files;
    $handle = opendir($dir); // 读资源
    if ( !$handle ) return;
    
    while ( ( $file = readdir( $handle ) ) !== false ) {
        if ( $file == '.' || $file == '..') continue;
        
        $cur_path = $dir . DIRECTORY_SEPARATOR . $file;
        if (is_dir( $cur_path )) { 
            // 判断是否为目录，递归读取文件
            read_all_dir( $cur_path );
        } else {
            $files[] = basename( $cur_path );
        }
    } // end while
    closedir($handle);
}
    
$dir = iconv('UTF-8', 'GB2312', $url);
$files = array();
read_all_dir( $dir );
echo _tojson( $files );

?>
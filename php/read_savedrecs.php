<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:32:29 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:40:14
 */

/**
 * 读入指定文件内容并返回字符串
 */

require_once './helper.php';
$url = $_GET["url"];
$path = iconv('UTF-8', 'GB2312', $url);

$handle = fopen( $path, 'r');
$content = '';

while ( $str = fread( $handle, 8080)) {
    $content .= $str;
}

echo $content;

?>
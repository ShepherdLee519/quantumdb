<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-11-26 22:42:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 10:08:57
 */

// 提取完 pdf 对应数据后移动 pdf 至父目录下 

$name = $_GET["name"];
$title = $_GET["title"];
$index = $_GET["index"];

$oldname = "../PDF/target/" . $name;
$newname = "../PDF/" . $index . ".pdf";

// 判断文件是否存在后重命名文件
if (file_exists( $newname ) || 
    !file_exists( $oldname )) {
    echo 0;
} else {
    rename( $oldname, $newname );
    echo 1;
}

?>
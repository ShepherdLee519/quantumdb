<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-11-26 22:42:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 15:04:40
 */

// 删除父目录下的pdf

$index = $_GET["index"];

$name = "../PDF/" . $index . ".pdf";

unlink( $name );
echo 1;

?>
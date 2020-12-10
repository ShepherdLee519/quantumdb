<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-26 04:51:55 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 22:42:40
 */

// 删除 savedrecs.html

$FILE = "../PDF/savedrecs/";

$res = unlink( $FILE.'savedrecs.html' );
echo $res;

?>
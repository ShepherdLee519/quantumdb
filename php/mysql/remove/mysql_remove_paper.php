<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 15:00:56
 */

$index = (int)$_GET["index"];


// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加
mysqli_query( $link, "SET foreign_key_checks = 0"); // 关闭外键确认 

// 1. 从paper表删除
$sql_paper = "DELETE FROM paper WHERE paperid = $index";

if ( !mysqli_query( $link, $sql_paper )) {
    // echo("error: failed to delete from table <paper>");
    die(0);
} 

$paperid = (int)mysqli_insert_id( $link );


// 2. 从 paperauthor 表
$sql_paperauthor = "DELETE FROM paperauthor WHERE paperid = $index";

if ( !mysqli_query( $link, $sql_paperauthor )) {
    // echo("error: failed to delete from table <paperauthor>");
    die(0);
} 

mysqli_query( $link, "SET foreign_key_checks = 1"); // 恢复外键确认 
echo 1;

?>
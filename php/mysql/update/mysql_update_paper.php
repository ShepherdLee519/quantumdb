<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 16:01:47
 */

$index = (int)$_GET["index"];
$title = $_GET["title"];
$year = (int)$_GET["year"];
$abstract = $_GET["abstract"];
$author = $_GET["author"];
$authors = $_GET["authors"];


// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加

// 1. 加入paper表
$sql_paper = "UPDATE paper SET
    `title` = '$title', `year` = $year, `abstract` = \"$abstract\",
    `authors` = \"$authors\"
WHERE paperid = $index";

if ( !mysqli_query( $link, $sql_paper )) {
    // echo("error: failed to update table <paper>");
    die(0);
} 

echo 1;

?>
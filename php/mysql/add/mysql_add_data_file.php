<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-15 12:49:54
 */

$title = $_GET["title"];
$abstract = $_GET["abstract"];
$author = $_GET["author"];
$authors = $_GET["authors"];


// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加

// 1. 加入paper表
$sql_paper = "INSERT INTO paper (
	`title`, `abstract`, `authors`
) VALUES (
    '$title', \"$abstract\", \"$authors\"
)";

if ( !mysqli_query( $link, $sql_paper )) {
    echo("error: failed to update table <paper>");
    echo $sql_paper;
    exit();
} 

$paperid = (int)mysqli_insert_id( $link );

// 2. 加入 author 表
$sql_author = "INSERT IGNORE INTO author(`name`) VALUES(\"$author[0]\")";
for ($i = 1; $i < count( $author ); $i++) {
    $sql_author .= ", (\"$author[$i]\")";
}

if ( !mysqli_query( $link, $sql_author )) {
    echo("error: failed to update table <author>");
    echo $sql_author;
    exit();
} 

// 3. 加入 paperauthor 表
for ($i = 0; $i < count( $author ); $i++) {
    $sql_authorid = "SELECT authorid FROM author WHERE name = \"$author[$i]\"";
    $result = mysqli_query( $link, $sql_authorid );
    $row = mysqli_fetch_assoc( $result );
    $authorid = (int)$row["authorid"];

    $sql_paperauthor = "INSERT INTO paperauthor(
        `paperid`, `authorid`, `number`
    ) VALUES ( $paperid, $authorid, $i + 1 )";
    mysqli_query( $link, $sql_paperauthor );
}


echo $paperid;

?>
<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-03-09 23:46:19
 */

$title = $_GET["title"];
$abstract = $_GET["abstract"];
$author = $_GET["author"];
$year = $_GET["year"];
$authors = $_GET["authors"];
$num = $_GET["num"];


// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加

// 1. 加入paper表
$filename = "../../../PDF/target/target".$num.".pdf";
$sha = sha1_file( $filename );

$sql_check_sha = "SELECT sha FROM paper WHERE sha = \"$sha\"";
if ($result = mysqli_query( $link, $sql_check_sha )) {
    $rowcount = mysqli_num_rows( $result );
    if ( $rowcount == 1 ) {
        echo -1;
        exit();
    }
}

$sql_paper = "INSERT INTO paper (
	`title`, `abstract`, `year`, `authors`, `sha`
) VALUES (
    '$title', \"$abstract\", $year, \"$authors\", '$sha'
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
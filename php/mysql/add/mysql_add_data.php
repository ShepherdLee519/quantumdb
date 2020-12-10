<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-10 10:12:20
 */

$title = $_GET["title"];
$source = $_GET["source"];
$type = $_GET["type"];
$volume = $_GET["volume"];
$beginpage = $_GET["beginpage"];
$endpage = $_GET["endpage"];
$doi = $_GET["doi"];
$date = $_GET["date"];
$year = (int)$_GET["year"];
$abstract = $_GET["abstract"];
$author = $_GET["author"];
$authors = $_GET["authors"];
$pdfname = $_GET["pdfname"];

// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加

// 1. 加入paper表
$sql_paper = "INSERT INTO paper (
	`title`, `source`, `type`, `volume`,
	`beginpage`, `endpage`, `doi`,
	`date`, `year`
) VALUES (
    '$title', '$source', '$type', '$volume',
    '$beginpage', '$endpage', '$doi',
    '$date', $year
)";

if ( !mysqli_query( $link, $sql_paper )) {
    echo("error: failed to update table <paper>");
    echo $sql_paper;
    exit();
} 

// 2. 加入 abstract 表
$paperid = (int)mysqli_insert_id( $link );
$sql_abstract = "INSERT INTO abstract (
	`paperid`, `abstract`
) VALUES (
    $paperid, \"$abstract\"
)";

if ( !mysqli_query( $link, $sql_abstract )) {
    echo("error: failed to update table <abstract>");
    echo $sql_abstract;
    exit();
} 

// 3. 加入 authors 表
$sql_authors = "INSERT INTO authors (
	`paperid`, `authors`
) VALUES (
    $paperid, \"$authors\"
)";

if ( !mysqli_query( $link, $sql_authors )) {
    echo("error: failed to update table <authors>");
    echo $sql_authors;
    exit();
} 

// 4. 加入 author 表
$sql_author = "INSERT IGNORE INTO author(`name`) VALUES(\"$author[0]\")";
for ($i = 1; $i < count( $author ); $i++) {
    $sql_author .= ", (\"$author[$i]\")";
}

if ( !mysqli_query( $link, $sql_author )) {
    echo("error: failed to update table <author>");
    echo $sql_author;
    exit();
} 

// 5. 加入 paperauthor 表
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

// 6. 加入 pdf 表
$sql_pdf = "INSERT INTO pdf(`pdfname`) VALUES('$pdfname')";

if ( !mysqli_query( $link, $sql_pdf )) {
    echo("error: failed to update table <pdf>");
    echo $sql_pdf;
    exit();
} 

echo $paperid;

?>
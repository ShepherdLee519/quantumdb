<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-16 23:56:11
 */

$theme = $_GET["theme"];
$author = $_GET["author"];
$year = $_GET["year"];

// 0. 连接数据库
@include "../mysqllink.php";
mysqli_query( $link, "set names 'utf8'"); // 在插入数据执行前添加

// 1. 填写对应的SQL
$sql = "SELECT paperid, title, authors, year, abstract FROM paper WHERE title != ''";

// $flag = False;
if ( $theme != "") {
    $sql .= " AND (title LIKE '%$theme%' OR abstract LIKE '%$theme%') ";
}
if ( $author != "") {
    $sql .= " AND authors LIKE '%$author%' ";
}
if ( $year != "") {
    $year = (int)$year;
    $sql .= " AND year = $year";
}

// 2. 数据结构
class Paper
{
    public $id;
    public $title;
    public $authors;
    public $year;
    public $abstract;

    function __construct( $row ) {
        $this->id = $row["paperid"];
        $this->title = $row["title"];
        $this->authors = $row["authors"];
        $this->year = $row["year"];
        $this->abstract = $row["abstract"];
    }
}

// 3. 查询并返回结果
$data = array();
$result = mysqli_query( $link, $sql );  

if ( $result ) {
    while ( $row = mysqli_fetch_array( $result, MYSQL_ASSOC ) ) {
        $paper = new Paper( $row );
        $data[] = $paper;
    }

    $json = json_encode( $data, JSON_UNESCAPED_UNICODE );
    echo $json;
}else{
    echo $sql;
}

?>
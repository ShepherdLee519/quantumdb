<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:39:38
 */

// -----------------mysql参数----------------------------------------------
$servername = "localhost:3307";
$usern = "root";
$passw = "hello";
$dbname = "paper";

// -----------------连接mysql服务器----------------------------------------------
$link = mysqli_connect( $servername, $usern, $passw );
$res = mysqli_set_charset( $link, 'utf8' );

// 选择数据库
mysqli_query( $link, 'use ' . $dbname );

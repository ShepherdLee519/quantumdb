<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:38:59 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-30 14:11:29
 */

@include "../../config/mysql_config.php";

// -----------------连接mysql服务器----------------------------------------------
$link = mysqli_connect( $servername, $usern, $passw );
$res = mysqli_set_charset( $link, 'utf8' );

// 选择数据库
mysqli_query( $link, 'use ' . $dbname );

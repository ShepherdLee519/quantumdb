<?php

/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:32:29 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:40:11
 */

/**
 * author: Shepherd.Lee
 * info: 简化一些操作的php辅助函数
 * index:
 */

/**
 * _deleteFile
 * 
 * 删除指定位置的文件
 * 
 * @param string $file
 * @return integer 1/0
 */
function _deleteFile( $file ) {
    $file = iconv('utf-8', 'gbk', $file);
    if (file_exists( $file )) {
        if ( !unlink( $file )) {
            return 0;
        } else {
            return 1;
        }
    }
}


/**
 * _mkdir
 * 
 * 在指定位置创建文件夹(有则不) - 0777
 * 
 * @param string $FILE_PATH
 */
function _mkdir( $FILE_PATH ) {
    is_dir( $FILE_PATH ) or mkdir( $FILE_PATH, 0777, true); // 文件夹不存在则创建
}


/**
 * _deldir
 * 
 * 删除文件夹即以下的所有文件
 * 
 * @param string $dir
 */
function _deldir( $dir ) {
    //先删除目录下的文件：
    $dh = opendir( $dir );
    while ( $file = readdir( $dh ) ) {
        if ( $file != '.' && $file != '..') {
            $fullpath = $dir.'/'.$file;
            if ( !is_dir( $fullpath ) ) {
                unlink( $fullpath );
            } else {
                deldir( $fullpath );
            }
        }
    } // end while
  
    closedir( $dh );
    // 删除当前文件夹：
    if (rmdir( $dir )) {
        return true;
    } else {
        return false;
    }
}

/**
 * _tojson
 * 
 * 将php对象转为json格式(eg. php array)
 * 
 * @param object $data
 * @return object $data(json)
 */
function _tojson( $data ) { 
   return json_encode( $data, JSON_UNESCAPED_UNICODE );
}

/**
 * _jsonin
 * 
 * 从指定位置读入json 并转化为json格式
 * 
 * @param string $path
 * @return object $data(json)
 */
function _jsonin( $path ) { 
    $file = file_get_contents( $path );
    $data = json_decode( $file, true);
    return $data;   
}

/**
 * _jsonout
 * 
 * 输出json到指定位置
 * 
 * @param string $path
 * @param object $data
 */
function _jsonout( $path, $data ) {
    file_put_contents(
        $path, 
        json_encode( $data, JSON_UNESCAPED_UNICODE )
    );
}

?>
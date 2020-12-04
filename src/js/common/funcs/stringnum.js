/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:18:01 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-11-28 13:45:25
 */

/*
 * ./js/common/funcs/stringnum.ji
 * 
 * 与字符串、数字有关的辅助函数
 */

import { common, Add } from '../commonObj';


/**
 * 返回用于填充在html中的空格(&nbsp;)
 * 
 * @param {Number} num = 8 空格数
 * @returns {String} 指定数量的空格(用于html)
 */
function space(num = 8) {
    return '&nbsp;'.repeat(num);
}

/**
 * 返回用于填充用的随机字符(默认12位)
 * 
 * @param {Number} len = 12 随机字符长度
 * @returns {string} 返回该随机字符串
 */
function random(len = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const num = chars.length;
    let str = '';
    
    for (let i = 0; i < len; i++) {
        str += chars.charAt( ~~(Math.random() * num) );
    }
    return str;
}

/**
 * 返回增加了 ?random= 的阻止缓存的 url
 * 
 * @param {String} url 
 */
function nocache(url) {
    return `${url}?random=${random()}`;
}

/**
 * 以n位字符串格式返回数字
 * 
 * @example
 * //returns 0012
 * num(12, 4)
 * @param {Number} number 原数字
 * @param {Number} precision = 3 返回的位数
 * @returns {String} n位格式的
 */
function num(number, precision = 3) {
    let i = 0, str = '';

    while (i < precision) {
        str += number % 10;
        number = ~~(number/10);
        i++;
    }
    return [...str].reverse().join('');
}


// 加入common空间
common[Add](
    space, random, nocache, num
);
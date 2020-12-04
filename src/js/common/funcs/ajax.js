/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:19:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-11-27 17:11:56
 */

/*
 * ./js/common/funcs/ajax.js
 * 
 * 与ajax为主的post/get调用以及相关的参数设置的辅助函数
 */

import { common, Add } from '../commonObj';


// 控制 async 与否的开关变量
let asyncFlag = true;
/**
 * 将ajax的同步/异步模式切换\
 * 需要成对使用，先关闭异步再开启
 */
function exasync() {
    $.ajaxSetup( {async: asyncFlag = !asyncFlag});
}

/**
 * 将ajax的缓存功能开启/关闭
 * 
 * @param {String} type "on" or "off"
 */
function excache(type = 'on') {
    if (type == 'on') {
        $.ajaxSetup( {cache: true} );
    } else if (type == 'off') {
        $.ajaxSetup( {cache: false} );
    }
}

/**
 * 将函数同步化并调用
 * 
 * @param {Function} func 
 * @param  {...any} args 
 */
function synchronize(func, ...args) {
    exasync();
    func.apply(null, args)
    exasync();
}

/**
 * Promise包装的$.ajax
 * 
 * @param {String} obj ajax 参数对象\
 *      默认：type = GET, data = {}, dataType = "JSON"
 * @param {Boolean} nocache = true 默认使用添加随机数不加载缓存 
 * @returns {Object} 返回Promise对象
 */
function request({type = 'GET', data = {}, dataType = 'JSON', url}
    , nocache = true) {
    return new Promise(function(resolve, reject) {
        nocache && (url = `${url}?random=${common.random()}`);
        $.ajax({
            url: url,
            data: data,
            type: type,
            dataType: dataType,
            
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

/**
 * 利用信标进行数据传输
 * 
 * @param {String} path get的路径 
 * @param {Object} params 组装querystring的对象
 */
function beacon(path, params = {}) {
    let url = path + '?' + $.param(params),
        beacon = new Image();
    
    beacon.src = url;
}

/**
 * 同步的执行 $.post 的替代
 * 
 * @param {String} url 
 * @param {Object} obj 
 * @param {Function} callback 
 */
function post(url, obj, callback) {
    exasync();
    $.post(url, obj, res => {
        callback(res);
    });
    exasync();
}

/**
 * 同步的执行 $.get 的替代
 * 
 * @param {String} url 
 * @param {Function} callback 
 */
function get(url, callback) {
    exasync();
    $.get(url, res => {
        callback(res);
    });
    exasync();
}


// 加入common空间
common[Add](
    [exasync, 'async'], [excache, 'cache'],
    synchronize,
    request, beacon,
    post, get
);
/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:17:22 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-25 01:46:33
 */

/*
 * ./js/common/funcs/console.jigsaw-row
 * 
 * 与控制台相关的辅助函数，主要为测试时使用
 * 对应的不同控制台输出内容在commonConfig中可以配置输出是否允许
 */

import { common, Add, Config } from '../commonObj';


/**
 * 调试中用，打印在控制台
 */
function ok() {
    if ( !common[Config].ok ) return;
    console.log('OK!!!!!!!!!');
}

/**
 * 在js文件开头调用，测试文件是否正确加载
 * 
 * @param {String} filename 文件名
 */
function hello(filename) {
    if ( !common[Config].hello ) return;
    console.log(`Hello! - ${filename}.js`);
}

/**
 * 标记废弃的函数，仅在该文件夹内使用
 * 
 * @param {String} funcname 函数名
 * @param {Boolean} absolute = false 为true时无视commonConfig
 */
function _abandon(funcname, absolute = false) {
    if ( !absolute && !common[Config].abandon ) return;
    console.warn(`${funcname} has abandoned!`);
}


// 加入common空间
common[Add](
    ok, hello,
    _abandon
);
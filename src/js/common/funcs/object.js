/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:19:40 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-04-25 01:51:58
 */

/*
 * ./js/common/funcs/object.js
 * 
 * 与对象操作相关的辅助函数
 * 需要用到common中的[Target]来存储临时的操作对象
 */

import { common, Add, Target } from '../commonObj';


/**
 * 判断某个js对象是否为undefined的简写
 * 
 * @param {Object} target 检查对象
 * @returns {Boolean} true-是undefined
 */
function isundef(target) {
    return target === void 0;
}

/**
 * 注入节点 存于[Target](存为jQuery对象)
 * 
 * @example
 * inject(XXX);//注入
 * _(XX);//查询
 * reject();//取出
 * @param {Object} target 存入的对象
 */
function inject(target) {
    common[Target] = $(target);
}

/**
 * 将全局的_TARGET清空 - 取出
 */
function reject() {
    common[Target] = null;
}

/**
 * 相对于_TRAGET中的对象进行find操作，返回结果
 * 
 * @param {String} target find()中的字符串，即查询目标
 * @returns {Object} find的结果 
 *      - 保证只返回一个对象(非数组)
 *      - 默认会返回_TARGET自身
 */
function _(target = null) {
    if ( !target ) return common[Target];
    return common[Target].find(target).eq(0);
}


// 加入common空间
common[Add](
    isundef,
    inject, reject, _,
);
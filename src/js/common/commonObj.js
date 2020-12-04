/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:12:30 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-11-24 22:09:34
 */

/*
 * ./js/common/commonObj.js
 *
 * 封装工具函数的common对象的原始定义
 * 以及在common对象上添加工具函数等的方法的定义
 */

/**
 * 导出的，用以封装所有工具函数的命名空间对象
 */
export const common = {};

/*
 * common的功能属性名 - 使用Symbol保证私有
 * 只在该文件夹内导入使用
 */
export const Add = Symbol('add function');
export const Target = Symbol('store target');
export const Config = Symbol('config');


/**
 * 为common添加工具函数
 * 
 * @param  {...any} funcs 添加的工具函数，函数参数逐个列出
 */
function addFunction(...funcs) {
    for (let func of funcs) {
        if ( !Array.isArray(func) ) {
            common[func.name] = func;
        } else {
            // [func, "alias"]格式，为工具函数设置别名
            common[func[1]] = func[0];
        }
    }
}

/**
 * 与控制台相关的输出函数的配置(控制输出与否)\
 * 属性对应console.js下的控制台输出函数
 */
const commonConfig = {
    ok      : true,
    hello   : false,
    abandon : true
};


/*
 * 为common对象添加仅在该文件夹内部使用的辅助用的属性与方法
 */
Object.assign(common, {
    /**
     * 为common添加工具函数
     * 
     * @property {Function}
     */
    [Add]: addFunction,
    /**
     * inject, _等函数操作的对象存放处
     * 
     * @property {Object} 
     */
    [Target]: null,
    /**
     * 相关控制台输出控制的配置
     * 
     * @property {Object}
     */
    [Config]: commonConfig
});
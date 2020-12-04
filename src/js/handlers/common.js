/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-04 20:00:33 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:09:21
 */


/**
 * 处理摘要字符串
 * 
 * @param {String} abstract 
 * @param {Number} i
 */
export function solveAbstract(abstract, i) {
    if (abstract === '') return '';
    const LIMIT = 200;
    const link = `<a href="#" class="abstract-link" 
        data-state="close" data-index="${i}">>></a>`;

    if (abstract.length > LIMIT) {
        return abstract.slice(0, LIMIT) + '......' + link;
    }
}


/**
 * 对匹配文字增加高亮式样
 * 
 * @param {String} target 
 * @param {String} key 
 */
export function hightLight(target, key) {
    if (key === '' || target === '' || key === '') return target;

    const reg = new RegExp('(' + key + ')', 'ig');
    let before = '<span class="highlight">';
    let after = '</span>';
    let length = before.length + after.length;

    while (reg.test(target)) {
        let begin = reg.lastIndex - key.length;
        let end = reg.lastIndex;
        
        target = target.slice(0, begin) + before + RegExp.$1 + after + target.slice(end);
        reg.lastIndex += length;
    }
    
    return target;
}
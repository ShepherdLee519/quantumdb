/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:20:20 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 17:49:04
 */

/*
 * ./js/common/funcs/style.js
 * 
 * 样式相关(尤其是类控制)的辅助函数
 */

import { common, Add } from '../commonObj';


/**
 * 交换两个对象的某个类 结果只有其中一个对象有目标类
 * 
 * @param {Object} $nodeA jQuery对象 
 * @param {Object} $nodeB jQuery对象 
 * @param {String} classname 
 */
function exClass( $nodeA, $nodeB, classname ) {
    if ( $nodeA.hasClass(classname) ){
        $nodeA.removeClass(classname);
        $nodeB.addClass(classname);
    } else if ( $nodeB.hasClass(classname) ) {
        $nodeB.removeClass(classname);
        $nodeA.addClass(classname);
    }
}

/**
 * 目标对象删去A类 换上B类
 * 
 * @param {Object} $node jQuery对象
 * @param {String} classA
 * @param {String} classB
 */
function replaceClass( $node, classA, classB ) {
    $node.removeClass(classA).addClass(classB);
}

/**
 * addClass("hidden") 的简写\
 * 可适用于节点数组 - 默认传入jQuery对象
 * 
 * @param {Object} $node 
 */
function hide( $node ) {
    if ( !Array.isArray( $node ) ) {
        $node.addClass('hidden');
    } else {
        $node.forEach( $target => {
            $target.addClass('hidden');
        });
    }
    return { show: show };
}

/**
 * removeClass("hidden") 的简写\
 * 可适用于节点数组 - 默认传入jQuery对象
 * 
 * @param {Object} $node 
 */
function show( $node ) {
    if ( !Array.isArray( $node ) ) {
        $node.removeClass('hidden');
    } else {
        $node.forEach( $target => {
            $target.removeClass('hidden');
        });
    }
    return { hide: hide };
}


// 加入common空间
common[Add](
    exClass, replaceClass,
    hide, show
);
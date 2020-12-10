/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:20:04 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 20:06:12
 */

/*
 * ./js/common/funcs/event.js
 * 
 * 与事件相关的辅助函数，包括部分简单的效果(例如滚轮控制等)
 */

import { common, Add } from '../commonObj';


/**
 * 在document上监听事件
 * 
 * @param {String} eventType 监听的事件类型
 * @param {Function} fn 事件函数
 * @param {Array} args = [] 事件函数的参数
 */
function listen(eventType, fn, args = []) {
    $(document).on(eventType, function() {
        fn.apply(null, args);
    });
}

/**
 * 在document上监听复数个事件(触发先后无所谓)
 *
 * @param {Array<String>} eventTypes 监听的事件类型列表
 * @param {Function} fn 事件函数
 * @param {Array} args = [] 事件函数的参数
 */
function multilisten(eventTypes, fn, args = []) {
    let count = 0, need = eventTypes.length;
    
    eventTypes.forEach(eventType => {
        $(document).on(eventType, function() {
            count++;
            if (count == need) {
                count++; // 避免重复触发
                fn.apply(null, args);
            }
        });
    });
}

/**
 * 在document上触发事件
 * 
 * @param {String} eventType 触发的事件类型
 * @param {Boolean} hold = false 默认不保持，即触发后就取消绑定
 */
function trigger(eventType, hold = false) {
    $(document).trigger(eventType);
    if ( !hold ) $(document).off(eventType);
}

/**
 * 在指定对象上委托多个事件的简写
 * 
 * @example
 * delegate($(target), {
 *      target: ".classname",
 *      event: "click",
 *      handler: handler
 * });
 * @param {Object} $target 
 * @param {Object} handlerObjs - target/event/handler
 */
function delegate($target, handlerObjs) {
    handlerObjs = ( !Array.isArray(handlerObjs) ) ? 
        [handlerObjs] : handlerObjs;
    
    handlerObjs.forEach(obj => { 
        if( !Array.isArray(obj.target) ) {
           $target.delegate(
                obj.target, obj.event, obj.handler
            ); 
        } else {
            obj.target.forEach(target => {
                $target.delegate(
                    target, obj.event, obj.handler
                );
            });
        }
    })
}

/**
 * 滚轮控制
 * 
 * @param {Object} $target  
 * @param {String} type = "top" / "bottom" 
 * @param {Number|String} speed = 400
 */
function scroll($target, type, speed = 400) {
    if (type === 'top') {
        $target.animate({ scrollTop: 0 }, speed);
    } else if (type === 'bottom') {
        let scrollHeight = $target.prop('scrollHeight');
        $target.animate({ scrollTop: scrollHeight }, speed);
    }
}


// 加入common空间
common[Add](
    listen, multilisten, trigger, delegate,
    scroll
);
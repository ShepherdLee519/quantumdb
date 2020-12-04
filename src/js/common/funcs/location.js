/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-04-25 17:23:45 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-11-30 10:28:47
 */

/*
 * ./js/common/funcs/event.js
 * 
 * 与url相关的辅助函数，包括querystring控制
 */

import { common, Add } from '../commonObj';


/**
 * 保存search变化的工具函数\
 * 使用window.location.search 会触发刷新\
 * 使用history.pushState 不会刷新
 * 
 * @param {Boolean} refresh true - 刷新/false - 使用history 
 * @param {String} querystring 
 * @param {Object} data = null history.pushState中的对象
 */
function saveLocation(refresh, querystring, data = null) {
    if (refresh) {
        window.location.search = querystring;
    } else {
        history.pushState(data, '', querystring);
    }
}

/**
 * 根据传入的querystring对象组装url并跳转
 * 
 * @example
 * //http://localhost/AniNavi/index.php?page=1&year=2020&month=1
 * _toLocation({page:1, year:2020, month:1})
 * @param {Array<Object>} queryObj querystring对象
 * @param {Boolean} refresh = false 默认不刷新
 */
function toLocation(queryObj, refresh = false) {
    let querys = [], querystring = '?';
    
    for (let key in queryObj) {
        querys.push(`${key}=${queryObj[key]}`);
    }
    querystring += querys.join('&');
    saveLocation(refresh, querystring, queryObj);
}

/**
 * 根据变量名查询querystring值\
 * 默认情况下(无变量名)返回querystring的键值对对象
 * 
 * @param {String} variable = null 变量名 
 * @param {String} defaultValue = null 默认值
 * @returns {Object} 键值对对象或某个键对应的值
 */
function getQuery(variable = null, defaultValue = null) {
    let querys = window.location.search.slice(1).split('&'),
        obj = {};

    querys.forEach(query => {
        query = query.split('=');
        obj[query[0]] = query[1];
    });
    
    return variable ? 
        (obj[variable] ? obj[variable] : defaultValue) : obj;
}

/**
 * 将键值以key=value的格式存入location.search\
 * 有则修改，无则添加
 * 
 * @param {String} key 
 * @param {*} value 
 * @param {Boolean} refresh = false 默认不刷新
 */
function saveQuery(key, value, refresh = false) {
    let location = window.location,
        search = location.search,
        querystring = '',
        querys = location.search.slice(1).split('&');
    
    if (search === ''){
        querystring = `?${key}=${value}`;
    } else {
        if ( ~search.indexOf(key) ) {
            for (let i = 0; i < querys.length; i++){
                if ( ~querys[i].indexOf(key) ) {
                    querys[i] = `${key}=${value}`;
                    break;
                }
            }
            querystring = '?' + querys.join('&');
        } else {
            querystring = search + `&${key}=${value}`;
        }
    }
    saveLocation(refresh, querystring, {key:key, value:value});

    return saveQuery;
}

// 加入common空间
common[Add](
    saveLocation, toLocation,
    getQuery, saveQuery
);
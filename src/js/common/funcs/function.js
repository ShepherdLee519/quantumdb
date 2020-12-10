/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-03-27 17:18:38 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 22:10:54
 */

/*
 * ./js/common/funcs/function.js
 * 
 * 函数操作相关的辅助函数，例如柯里化，记忆化等操作
 */

import { common, Add } from '../commonObj';


/**
 * 函数的柯里化
 * 
 * @example
 * function add(a, b) { return (a + b); }
 * const add1 = curry(add, 1);
 * add1(3); // 4
 * @param {Function} func 
 * @param  {...any} oldargs 传入原函数的部分参数
 * @returns {Function} 柯里化后的新函数
 */
function curry(func, ...oldargs) {
    return (...newargs) => func(...oldargs, ...newargs);
}

/**
 * 偏函数生成工具
 * 
 * @example
 * function greeting(a, b, c){
 *     return [a, b, c].join(' );
 * }
 * const meetu = partial(greeting, 'Hi', undefined, 'Nice to meet you!');
 * meetu('Jack'); // Hi Jack Nice to meet you!
 * @param {Function} func 
 * @param  {...any} partialArgs 
 * @returns {Function} 处理生成的偏函数
 */
function partial(func, ...partialArgs) {
	let backupArgs = partialArgs;

	return (...rest) => {
		let args = backupArgs.slice(),
			count = 0;
		for (let i = 0; i < args.length && count < rest.length; i++) {
			if (args[i] === void 0) {
				args[i] = rest[count++];
			}
		}
		return func.apply(null, args);
	}
}

/**
 * 循环参数数组调用指定函数
 * 
 * @example
 * map(console.log, 1, 2, 3); // 1 2 3
 * map( (k, v) => { console.log(k + v); }, [1, 2], [3, 4]); // 3 7
 * @param {Function} func 
 * @param  {...any} args 每次调用使用的参数数组
 */
function map(func, ...args) {
	if (args[0] === void 0) return;
	args.forEach(arg => {
		if ( !Array.isArray(arg) ) arg = [arg];
		func.apply(null, arg);
	});
}

/**
 * 分割任务异步调用的公用方法
 * 
 * @param {Array<Function>} steps 调用的函数数组
 * @param {Array<Array<*>>} argsArray 每个函数对应的参数列表的数组
 */
function multistep(steps, argsArray = []) {
    for (let i = 0, len = steps.length; i < len; i++) {
        setTimeout(function(){
            steps[i].apply(null, argsArray[i] || []);
        }, 25);
    }
}

/**
 * 异步运行生成器函数的运行工具
 * 
 * @example
 * run(function *() {
 *     console.log('resolve');
 * }).then( () => {
 *     console.log('then');
 * }); // resolve then
 * @param {Function} gen 一个生成器
 * @param  {...any} rest 生成器函数的参数列表
 * @returns {Object} 返回Promise对象
 */
function run(gen, ...rest) {
	let args = [].slice.call(rest, 1),
		it = gen.apply(this, args);

	return Promise.resolve()
    .then(function handleNext(value) {
        let next = it.next(value);

        return (function handleResult(next) {
            if (next.done) return next.value;

            return Promise.resolve(next.value)
            .then( 
                handleNext,
                (err) => Promise.resolve(
                    it.throw(err)
                ).then(handleResult)
            );
        })(next);
    });
}

/**
 * 函数可记忆化
 * 
 * @param {Function} func 
 * @returns {Function} 返回可记忆的新函数
 */
function memoized(func) {
	const lookUpTable = {};

	return (arg) => lookUpTable[arg] ||
		( lookUpTable[arg] = func(arg) );
}

/**
 * 保证函数只执行一次
 * 
 * @param {Function} func 
 * @returns {Function} 返回仅执行一次(单例)的新函数
 */
function once(func) {
	let done = false;

	return (...args) => {
		return done ? void 0 :
			( (done = true), func.apply(this, args) );
	}
}

/**
 * 调用 time 次后才真正调用 fn 函数
 * 
 * @param {Number} time 调用次数
 * @param {Function} fn 原函数
 * @returns {Function} 返回修改后的新函数
 */
function times(time, fn) {
	let count = 0;

	return function(...args) {
		count++;

		if (count === time) {
			count = 0;
			fn.apply(null, args);
		}
	}
}

/**
 * 在函数前注入新函数内容
 * 
 * @param {Function} func 
 * @param {Function} beforeContent 
 * @returns {Function} 返回修改后的新函数
 */
function before(func, beforeContent) {
	return (...args) => {
		beforeContent.apply(null, args);
		func.apply(null, args);
	}
}

/**
 * 在函数后注入新函数内容
 * 
 * @param {Function} func 
 * @param {Function} afterContent 
 * @returns {Function} 返回修改后的新函数
 */
function after(func, afterContent) {
	return (...args) => {
		func.apply(null, args);
		afterContent.apply(null, args);
	}
}


// 加入common空间
common[Add](
    curry, partial,
	map, multistep, run,
	memoized, once, times,
    before, after
);
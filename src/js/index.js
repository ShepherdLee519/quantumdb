/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:23:27 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-04 20:29:47
 */

import $ from 'expose-loader?$!jquery';
import { initLinkHandler } from './handlers/link';
import { initBtnHandler } from './handlers/btn';


$(function() {
    initLinkHandler();
    initBtnHandler();
});
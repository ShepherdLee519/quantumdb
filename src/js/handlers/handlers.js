/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 17:22:52 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 17:37:07
 */

import { common as $$ } from '../common/common';
import { initBtnHandler } from './btn';
import { initLinkHandler } from './link';
import { initRadioHandler } from './radio';


$$.multistep([
    initBtnHandler,
    initLinkHandler,
    initRadioHandler
]);
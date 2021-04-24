/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 17:22:52 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2021-04-24 16:03:07
 */

import { common as $$ } from '../common/common';
import { initBtnHandler } from './btn';
import { initLinkHandler } from './link';
import { initRadioHandler } from './radio';
import { initDownloadHandler } from './download';
import { initRemoveHandler } from './remove';
import { initEditConfirmHandler, initEditHandler } from './edit';


$$.multistep([
    initBtnHandler,
    initLinkHandler,
    initRadioHandler,
    initDownloadHandler,
    initRemoveHandler,
    initEditHandler,
    initEditConfirmHandler
]);
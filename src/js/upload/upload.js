/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 17:25:42 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 19:21:15
 */

import { common as $$ } from '../common/common';
import { initUploadFolder } from './folder';
import { initUploadSavedrecs } from './savedrecs';
import { initUploadFile } from './file';


$$.multistep([
    initUploadFolder,
    initUploadSavedrecs,
    initUploadFile
]);
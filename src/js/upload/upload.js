/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-12-09 17:25:42 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-14 14:49:59
 */

import { common as $$ } from '../common/common';
import { initUploadFolder } from './folder/folder';
import { initUploadSavedrecs } from './folder/savedrecs';
import { initUploadFile } from './file/file';
import { initUploadCheckedFile } from './file/checkfile';


$$.multistep([
    initUploadFolder,
    initUploadSavedrecs,
    initUploadFile,
    initUploadCheckedFile
]);
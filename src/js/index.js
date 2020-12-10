/*
 * @Author: Shepherd.Lee 
 * @Date: 2020-10-30 23:23:27 
 * @Last Modified by: Shepherd.Lee
 * @Last Modified time: 2020-12-09 17:27:31
 */

import $ from 'expose-loader?$!jquery';
import 'bootstrap/dist/js/bootstrap.min.js';

import { common as $$ } from './common/common';
import './handlers/handlers';
import './upload/upload';


$(function() {
    $$.hello('Success!');
});
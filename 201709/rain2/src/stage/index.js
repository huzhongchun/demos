import {loading} from './load';
import {generateStyle} from './generateStyle';
import {initScene} from './scene';
import {bodyStr} from './body'
import {loadCss} from '../utils/loadCss';
export function init(){
	document.body.className = 'stage-body';
	document.body.innerHTML = bodyStr;
	generateStyle();
	loadCss('/css/stage.css',function(){
		loadCss('/css/dialog.css',function(){
			//loading();
			initScene();
		})
	});
}
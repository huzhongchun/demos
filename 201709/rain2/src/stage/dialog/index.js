import { templateStr } from './template';
import { Visualizer } from './Visualizer';
import { getState } from '../../state';
import {load} from './Player/load';
import {iOSLoad} from './Player/iOSLoad';
import {rainDrops} from '../scene/drops/dropTypes';
let source = null;
let audioBuffer = null;
const state = getState();
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const loadFunc = isiOS ? iOSLoad : load;

function clearContext() {
	state.audioCtx && state.audioCtx.close().then(function () {
		state.paused = true;
		source = null;
		state.audioCtx = null;
		audioBuffer = null;
	});
	source && source.context.close().then(function () {
		state.paused = true;
		source = null;
		state.audioCtx = null;
		audioBuffer = null;
	});
}

function insertDialog(index) {
	const data = rainDrops[index];

	const domString = _.template(templateStr)({
		index: index,
		audio: '',
		position: data.position,
		content: data.content,
		user: data.user,
		time: data.time
	});
	$(document.body).append(domString);
}

function showShare(ev) {
	ev && ev.preventDefault();
	const div = document.createElement('div');

	div.className = 'g-share-tip';
	document.body.appendChild(div);

	div.addEventListener('touchstart', function (ev) {
		ev.preventDefault();
	});
	div.addEventListener('touchend', hideShare);
}

function hideShare() {
	const div = document.getElementsByClassName('g-share-tip')[0];
	if (div) {
		div.parentNode.removeChild(div);
	}
}

export const showDialog = (function () {
	let haveOpening = false;

	return function (i, me) {
		if (haveOpening) {
			return;
		}
		insertDialog(i);

		const el       = $('#dialog_' + i),
		      content  = $('.m-dialog-content-text', el),
		      closeBtn = $('.m-close-btn', el);
		let showQR = false;
		const top = content.get(0).offsetTop, maxHeight = 430 - top - 10;
		content.css('height', maxHeight + 'px').css('overflow', 'auto');
		const btn = $('.m-play-btn', el).get(0), qrBtn = $('.m-share-qr-btn', el);
		$('.m-share-tip-btn', el).on('touchstart', showShare);

		qrBtn.on('touchstart', function (ev) {
			$('.m-qr-block', el).addClass('show');
			showQR = true;
		});

		closeBtn.on('touchstart', function (ev) {
			ev && ev.preventDefault();
			if (showQR) {
				showQR = false;
				$('.m-qr-block', el).removeClass('show');
			} else {
				clearContext();
				me && (me.lockMove = false);
				haveOpening = false;
				el.removeClass('show');
				el.remove();
			}
		});
		if (haveOpening) {
			return;
		}
		//el.on('touchstart',function(ev){
		const content_el = content.get(0);
		content.on('touchstart', function (ev) {
			ev.preventDefault();
			content.lastY = ev.touches[0].pageY;
			console.log(content.lastY);
		});
		content.on('touchmove', function (ev) {
			ev.stopPropagation();
			const deltaY = ev.touches[0].pageY - content.lastY;
			content.lastY += deltaY;
			content_el.scrollTop -= deltaY;
		});
		content.on('touchend', function (ev) {
			ev.stopPropagation();
		});
		el.addClass('show');
		me && (me.lockMove = true);
		loadFunc(btn, '/media/3185.wav');
		haveOpening = true;
	};
})();


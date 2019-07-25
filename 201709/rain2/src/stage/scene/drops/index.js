import { C3D } from '../../../lib/css3d-engine';
import { R, DROP_SIZE, DROP_HEIGHT, DROP_NUMBER, ALL_WIDTH, GROUP_WIDTH, ANCHORS } from './config';
import {dropTypes} from './config';
import {showDialog} from '../../dialog';
export function addDrops(skyBox) {
	const sprite = new C3D.Sprite();
	const l = ANCHORS.length;
	//创建20个平面放入容器，并定义鼠标事件
	for (let i = 0; i < DROP_NUMBER; i++) {
		let imageURL = 'drops/' + dropTypes[i] + '.png';
		const offsetX = Math.floor(i / l) * GROUP_WIDTH + ANCHORS[i % l][0];
		const alpha = (offsetX / ALL_WIDTH);
		const theta = (offsetX / ALL_WIDTH) * 2 * Math.PI;
		const plane = new C3D.Plane();
		const dy = ANCHORS[i % l][1];
		const scale = ANCHORS[i % l][2];
		plane.size(DROP_SIZE * scale, DROP_HEIGHT * scale)
		.position(Math.sin(theta) * R, dy - R * 0.15, -Math.cos(theta) * R)
		.rotation(0, -alpha * 360, 0)
		.buttonMode(true)
		.class('m-rain-drop ' + 'drop' + i + ' anim_' + i)
		.update();
		sprite.addChild(plane);
		plane.on('touchstart', function (ev) {
			ev.preventDefault();
			const el = this.le.el;
			el.classList.add('hovering');
			setTimeout(function () {
				el.classList.remove('hovering');
			}, 1000);
		});
		plane.on('touchend', onDropTouchEnd(i,skyBox));
	}
	return sprite;
}

export function onDropTouchEnd(i,pano) {
	return function () {
		this.le.el.classList.add('visited');
		showDialog(i, pano);
	};
}
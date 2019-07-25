import {imageBlob} from '../utils/loadImageBlob';
import {rainDrops} from '../stage/scene/drops/config';
export const loadImagesFunc = (loading, loadVideo) => () => {
	const images = _.range(0, 20).map(x => `/images/stage/skybox/${x}.jpg`)
	.concat(rainDrops.map(x => `/images/stage/drops/${x.file}.png`))
	.concat(['/images/ball/ball.png', '/images/ball/ball_fg.png', '/images/ball/ball_bg.png']);
	const len = images.length;
	let loaded = 0;
	const cb = function () {
		loaded++;
		loading(50 * loaded / len);
		if (loaded >= len) {
			loadVideo('/media/v.mp4');
		}
	};
	images.forEach(function (url, i) {
		const s = setTimeout(function () {
			imageBlob(url, cb);
			clearTimeout(s);
		}, i * 100);
	});
};
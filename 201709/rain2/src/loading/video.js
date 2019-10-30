function hideBg() {
	document.body.removeChild(document.getElementById('loading_wrap'));
	document.body.removeChild(document.getElementById('loading_mask'));
}

function showVideo(src) {
	let played = false;
	const video = document.createElement('video');
	video.setAttribute('playsinline', 'true');
	video.setAttribute('width', window.innerWidth);
	video.setAttribute('height', window.innerHeight);
	document.body.appendChild(video);

	const doPlayVideo = function () {
		if (!played) {
			hideBg();
			video.classList.add('playing');
			video.play();
			played = true;
		}
	};
	const playVideo = function(){
		if (window.WeixinJSBridge) {
			WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
				doPlayVideo();
			}, false);
			document.addEventListener("WeixinJSBridgeReady", function () {
				WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
					doPlayVideo();
				});
			}, false);
		} else {
			doPlayVideo();
		}
	};

	video.addEventListener('canplay', playVideo);
	video.addEventListener('touchstart', playVideo);
	video.onended = function () {
		video.classList.add('playing');
		$(window).trigger('ball_show');
	};
	video.src = src;
	video.load();
	playVideo();
}

export const loadVideoFunc = loading => src => {
	const req = new XMLHttpRequest();
	req.open('GET', src, true);
	req.responseType = 'blob';
	req.onprogress = function (progressEvent) {
		const progress = 0.5 + 0.5 * (progressEvent.loaded / progressEvent.total);
		loading(progress * 100);
	};
	req.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			const videoBlob = this.response;
			const url = (URL || webkitURL).createObjectURL(videoBlob); // IE10+
			showVideo(url);
		}
	};
	req.send();
};

export function loadingFunc(){
	const wrap = document.getElementById('wrap');

	const text = document.getElementById('text');
	let hasLoading = false;
	return function (percent) {
		console.log(percent);
		if (!hasLoading) {
			wrap.classList.add('loading');
			hasLoading = true;
		}
		wrap.style.transform = 'translateY(' + (-70 + (420 * (100 - percent) / 100)) + 'px)';
		if (percent >= 100) {
			wrap.className += ' stop';
			text.innerHTML = '轻触以继续';
		} else {
			text.innerHTML = percent < 10 ? 0 + '' + percent.toFixed(2) + '%' : percent.toFixed(2) + '%';
		}
	}
}

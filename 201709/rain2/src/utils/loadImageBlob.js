const loadedUrl = {};
window.loadedUrl = loadedUrl;
function loadXHR(url) {
	return new Promise(function (resolve, reject) {
		if (url in loadedUrl) {
			resolve(loadedUrl[url]);
		} else {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);
				xhr.responseType = 'blob';
				xhr.onerror = function () {reject({ ok: false });};
				xhr.onload = function () {
					if (xhr.status < 400 && xhr.status >= 200) {
						const newURL = (URL||webkitURL).createObjectURL(xhr.response);
						loadedUrl[url] = newURL;
						resolve({ ok: true, blob: newURL });
					}
					else {
						reject({ ok: false });
					}
				};
				xhr.send();
			}
			catch (err) {reject({ ok: false });}
		}
	});
}

export async function imageBlob(url,cb) {
	const {ok,blob} = await loadXHR(url);
	if(ok) {
		cb(blob);
	}
}

export async function imageURL(url){
	return loadedUrl[url];
}
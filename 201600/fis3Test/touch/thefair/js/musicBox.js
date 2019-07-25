define(function(require){
    /**
     * 初始化audio
     * @param src
     * @returns {Element}
     */
	function createAudio(src){
		var audio = document.createElement('audio');
		audio.src = src;
		return audio;
	}

    /**
     * 初始化音乐盒
     * @param src
     * @param boxDom
     * @param audioDuration
     */
    function initMusicBox(src,boxDom,audioDuration) {
        var _audio = createAudio(src),
            _musicBox = boxDom, _audioDuration = audioDuration;
        $(_audio).on('timeupdate', function () {
            var curTime = parseSecondsFunc(this.currentTime),
                percent = this.currentTime / _audioDuration;
            percent = percent > 1 ? 1 : percent;
            _musicBox.find('.process-icon').css({
                transform: 'translate3d(' + parseInt(percent * 291) + 'px,0,0)',
                transition: 'all .5s linear 0s',
            });
            _musicBox.find('.current-time').html(curTime);
        });
        $(_audio).on('ended', function () {
            _musicBox.find('.play-pause-btn').removeClass('pause').addClass('play')
        });
        _musicBox.find('.play-pause-btn').on('click', function () {
            if ($(this).hasClass('play')) {
                //如果是结束后重新播放,需要指针恢复初始位置
                if (_audio.ended) {
                    _musicBox.find('.process-icon').css({
                        transform: 'translate3d(0,0,0)',
                        transition: 'all 0s linear 0s',
                    });
                }
                _audio.play();
                $(this).removeClass('play').addClass('pause');
            }
            else if ($(this).hasClass('pause')) {
                _audio.pause();
                $(this).removeClass('pause').addClass('play');
            }
        });

    }

    /**
     * 把时间戳解析成00:00:00格式
     * @param seconds
     * @returns {string}
     */
	function parseSecondsFunc(seconds){
		var S = isNaN(seconds) ? 0 : parseInt(seconds),
            leaveS = 0;
		var H = parseInt(S/60/60);
		leaveS = S-H*60*60;
		var M = parseInt(leaveS/60);
		leaveS = leaveS-M*60;
		if(H>0){
			return addZeroFunc(H)+':'+addZeroFunc(M)+':'+addZeroFunc(leaveS);
		}else{
			return addZeroFunc(M)+':'+addZeroFunc(leaveS);
		}
	}

    /**
     * 个位数前面增加'0'
     * @param n
     * @returns {*}
     */
	function addZeroFunc(n){
		if(n < 10){
			n = '0'+n;
		}else
			n = ''+n;
		return n;
	}

    return initMusicBox;

    var _musicBox = initMusicBox;

    var src = 'http://resource.thefair.net.cn/touch/thefair/images/music_2.mp3',
        musicBoxDom = $('.card-audio-area .audio-play-box'),
        audioDuration = 20;
    _musicBox(src,musicBoxDom,audioDuration);
});
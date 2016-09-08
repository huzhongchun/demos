/**
 * 音频播放
 * @example
 *
 $('#test').share({
 title:'name'
 });
 */
Jumei.widget('ui.play', {
    init: function(options) {
        this.options = {
            //需要创建的audio对象
            audioObj: null,
            //当前播放歌曲的索引号
            currentId: 0,
            //播放文件数组
            playList: [
                        {'name': '小苹果', 'Singer':'筷子兄弟','poster':'', url: 'http://images.jumei.com/mobile/act/music/xiaopingguo.mp3'},
                        {'name': '喵喵喵', 'Singer':'喵星人', 'poster':'', url: 'http://images.jumei.com/mobile/act/music/cat.mp3'},
                        {'name': '花园',   'Singer':'梁静茹', 'poster':'', url:'http://file.dengo.org/music/ljr_hy.mp3'},
                        {'name': 'frog',  'Singer':'未知歌手', 'poster':'', url: 'http://images.jumei.com/mobile/act/music/frog.mp3'},
                      ],
            playIndex: 0,
            volume: 1,
            addAutoPlay: true,
            isShowPlayList: true,
            isStartAutoPlay: false,
            loopMoudle:'listLoop',
            preload:'meta',//预加载
        };
        //需要集成父类的构造函数需要这样调用
        //初始化入口
        this._super.call(this, options);
    },
    _create: function() {
        this.options.loopArray = [['listLoop','顺序播放'],['randomLoop','随机播放'],['repeat','单曲循环']];
        //创建audio对象
        var aObj = $("<audio id='ai'></audio>");
        var buffObj = $("<audio class='buff-audio'></audio>")[0];
        buffObj.src= 'http://file.dengo.org/music/ljr_hy.mp3';

        this.audioObj = aObj[0];
        this.audioObj.src = this.options.playList[this.options.playIndex].url;
        this.initSet();
        this.updatePlayProcess();
        this.updateBufferState();
        if(this.options.isStartAutoPlay)
            this.play(this.options.playIndex);
        this.initLeaveTime();
        this.changeLoopMoudle();

    },
    initSet:function(){
        var self = this;
        self.audioObj.volume = self.options.volume;
        self.audioObj.preload = self.options.preload;
        this.updatePlayList();
        this.setLoopModule('listLoop');

    },
    addVolume: function(volume) {
        var curVolume = this.audioObj.volume;
        if( (curVolume + 0.1) <= 1){
            this.audioObj.volume = curVolume + 0.1;
        }
    },
    cutVolume: function(volume) {
        var curVolume = this.audioObj.volume;
        if( (curVolume - 0.1) >= 0){
            this.audioObj.volume = curVolume - 0.1;
        }
    },
    clearList: function() {
        this.options.playList.length = 0;
        this.options.currentId = -1;
    },
    //添加音乐
    add: function(name, url)
    {
        this.options.playList.push({"name": name, "url": url});
        if(this.options.addAutoPlay === true){
            var playId = this.options.playList.length - 1;
            this.play(playId);
        }
        this.updatePlayList()
    },
    //删除音乐
    remove: function(name)
    {
        delete this.options.playList[name];
    },
    //按索引播放音乐
    play: function(index){
        var self = this;
        var song = null;
            if ((song = self.options.playList[index]) != null){
                //如果当前音乐可以播放并且和需要播放的一致，则继续播放，否则重新加载音乐
                if (self.audioObj.readyState == 4 && self.options.currentId == index)
                {
                    self.audioObj.play();
                }
                else
                {
                    self.options.currentId = index;
                    //先停止音乐
                    self.pause();
                    //重新加载
                    self.audioObj.src = song.url;
                    //绑定加载完数据后播放
                    self.updateBufferState();
                    $(self.audioObj).bind("canplaythrough", function() {
                        this.play();
                    })
                }
            }
            return song;
    }, //停止音乐
    pause: function()
    {
        this.audioObj.pause();
    },
    //歌曲列表是否为空
    _isEmptyPlayList: function()
    {
        return this.options.playList.length == 0;
    },
    //step:1 播放下一首 step:-1 播放上一首
    _playStep: function(step){
        var self = this;
        var action = self.options.loopMoudle;
        if (self._isEmptyPlayList()){
            return null;
        }
        //如果当前播放id为空，则播放第一首
        if (self.options.currentId == null){
            return self.play(self.options.playList[0]);
        }
        else{
            if(action === 'randomLoop'){
                var maxLength = this.options.playList.length - 1;
                var curIndex = self.options.currentId;
                var index = null;
                var random = parseInt(maxLength * Math.random());
                index = random == curIndex ? curIndex + 1 : random;
                index = index > maxLength ? 0 : index;
                self.play(index);
            }
            else{
                var id = self.options.currentId;
                //1表示前进一首
                if (step == 1)
                {
                    id = (id < self.options.playList.length - 1) ? id + 1 : 0;
                }
                else if (step == -1) //-1表示后退一首
                {
                    id = (id > 0) ? id - 1 : self.options.playList.length - 1;
                }
                self.play(id);
            }
        }
    },
    //播放下一首
    playNext: function(){
        var self = this;
        self.updateBufferState();
        return self._playStep(1);
    },
    //播放前一首
    playPri: function(){
        var self = this;
        self.updateBufferState();
        return self._playStep(-1);
    },
    //更新播放列表
    updatePlayList: function(){
        var playList = this.options.playList;
        var tpl = '';
        for (var i = 0; i < playList.length; i++) {
            tpl += '<li data-name="'+playList[i].name+'">'+playList[i].name+'</li>';
        };
        $('.list').html('').append(tpl);
    },
    //静音
    setMute: function(){
        this.audioObj.muted = this.audioObj.muted ? false : true;
    },
    updateBufferState: function(){
        var self = this;
        var curState = null;
        self.isLoadDone = false;
        $('.loading').css('width',0);
        var bufferLoop = setInterval(function(){
            curState = self.audioObj.buffered.length;
            $('.duration').html('curState:'+curState+'___'+'duration:'+self.audioObj.duration);
            if (curState > 0 && !isNaN(self.audioObj.duration)) {
                self.isLoadDone = curState == 1 ? true : false;
                var width = parseInt(self.audioObj.buffered.end(curState-1) / self.audioObj.duration * 300);
                $('.loading').css('width',width + 'px');
                if (Math.abs(self.audioObj.duration - self.audioObj.buffered.end(curState-1)) <1) {
                    clearInterval(bufferLoop);
                }
            }
        },1000)
    },
    updatePlayProcess:function(){
        var self = this;
        self.audioObj.addEventListener('timeupdate',function(){
            if (!isNaN(self.audioObj.duration)) {
                //剩余时间
                self.updateLeaveTime(self.audioObj.duration,self.audioObj.currentTime);
                //播放进度条
                var width = self.audioObj.currentTime / self.audioObj.duration * 300;
                $('.processing').css('width',width + 'px');
            };
        },false);
    },
    updateLeaveTime:function(maxLength,curLenth){
        var leaveTime = maxLength - curLenth;
        var leaveTimeMin = parseInt(leaveTime/60);
        var leaveTimeSecond = parseInt(leaveTime%60);
        if (leaveTimeSecond < 10 ) {
            leaveTimeSecond = '0'+leaveTimeSecond;
        };
        $('.leave-time').html(leaveTimeMin + ":" +leaveTimeSecond);
    },
    initLeaveTime:function(){
        var self = this;
        var initLeaveTimeLoop = setInterval(function(){
            if (!isNaN(self.audioObj.duration)){
                self.updateLeaveTime(self.audioObj.duration,self.audioObj.currentTime);
                clearInterval(initLeaveTimeLoop);
            }
        })
    },
    setLoopModule:function(loopMoudle){
        var self = this;
        self.options.loopMoudle = loopMoudle;
        $(self.audioObj).off('ended');
        $(self.audioObj).on('ended',function(){
            var maxLength = self.options.playList.length - 1;
            var curIndex = self.options.currentId;
            var index = null;
            switch(loopMoudle){
                //列表循环
                case 'listLoop':
                    index = curIndex == maxLength ? 0 : curIndex + 1;
                    self.play(index);
                    break;
                case 'randomLoop':
                    var random = parseInt(maxLength * Math.random());
                    index = random == curIndex ? curIndex + 1 : random;
                    index = index > maxLength ? 0 : index;
                    self.play(index);
                    break;
                case 'repeat':
                    index = curIndex;
                    break;
            }
            self.play(index);
        },false);
    },
    changeLoopMoudle:function(){
        var self = this;
        $('.change-loopMoudle-btn').on('click',function(e){
            var curMoudleindex = parseInt($(this).attr('data-loop'));
            var neXTMoudleindex = (curMoudleindex + 1) > 2 ? 0 : (curMoudleindex + 1);
            self.setLoopModule(self.options.loopArray[neXTMoudleindex][0]);
            $(this).html(self.options.loopArray[neXTMoudleindex][1]).attr('data-loop',neXTMoudleindex);
        })
    }
});








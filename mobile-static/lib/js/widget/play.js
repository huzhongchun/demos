/**
 * 音频播放
 * @example  
 *  
 $('#test').share({
 title:'name'
 });
 
 */
Jumei.widget('ui.play', {
    init: function() {
        this.options = {
            //需要创建的audio对象
            audioObj: null,
            //当前播放歌曲的索引号
            currentId: -1,
            //播放文件数组
            playList: [{'name': 'cat', url: 'http://images.jumei.com/mobile/act/music/cat.mp3'}, {'name': 'cat', url: 'http://images.jumei.com/mobile/act/music/cat.mp3'}],
            playIndex: 0,
            loop: false,
            volume: 1
        };
    },
    _create: function() {
    },
    _init: function() {
        //创建audio对象
        var aObj = $("<audio id='ai'></audio>");
        this.options.audioObj = aObj[0];
        this.setLoop(this.options.loop);
        this.setVolume(this.options.volume);
        this.play(this.options.playIndex);
    },
    setVolume: function(volume) {
        this.options.audioObj.volume = volume;
    },
    setLoop: function(loop) {
        this.options.audioObj.loop = loop;
    },
    clearList: function() {
        this.options.playList.length = 0;
        this.options.currentId = -1;
    },
    //添加音乐
    add: function(name, url)
    {
        this.options.playList.push({"name": name, "url": url});
    },
    //删除音乐
    remove: function(name)
    {
        delete this.options.playList[name];
    },
    //按索引播放音乐
    play: function(index)
    {
        var song = null;
        if ((song = this.options.playList[index]) != null)
        {
            //如果当前音乐可以播放并且和需要播放的一致，则继续播放，否则重新加载音乐
            if (this.options.audioObj.readyState == 4 && this.options.currentId == index)
            {
                this.options.audioObj.play();
            }
            else
            {
                this.options.currentId = index;
                //先停止音乐
                this.stop();
                //重新加载
                this.options.audioObj.src = song.url;
                //绑定加载完数据后播放
                $(this.options.audioObj).bind("canplaythrough", function() {
                    this.play();
                })
            }
        }
        return song;
    }, //停止音乐
    stop: function()
    {
        this.options.audioObj.pause();
    },
    //歌曲列表是否为空
    isEmptyPlayList: function()
    {
        return this.options.playList.length == 0;
    },
    //step:1 播放下一首 step:-1 播放上一首
    playStep: function(step)
    {
        if (this.isEmptyPlayList())
        {
            return null;
        }
        //如果当前播放id为空，则播放第一首 
        if (this.options.currentId == null)
        {
            return this.play(this.options.playList[0]);
        }
        else
        {
            var id = this.options.currentId;
            //1表示前进一首
            if (step == 1)
            {
                id = (id < this.options.playList.length - 1) ? id + 1 : 0;
            }
            else if (step == -1) //-1表示后退一首
            {
                id = (id > 0) ? id - 1 : this.options.playList.length - 1;
            }
            return this.play(id);
        }
    },
    //播放下一首
    playNext: function()
    {
        return this.playStep(1);
    },
    //播放前一首
    playPri: function()
    {
        return this.playStep(-1);
    }

});

$(function() {
    window.urlshare = 'http://f.m.jumei.com/envelope/openbag?package='+$('#package').val();
    var JumeiRedBag = Jumei.create({
        init: function() {
            // dialog.init('login');
            this.getFriend();
            this.initEvent();
        },
        getFriend: function() {
            var package = $('#old-package').val();
            var status = $('#status').val();
            $.ajax({
                type: 'post',
                url: '/envelope/friends',
                dataType: 'json',
                data: {package: package, status: status},
                success: function(data) {
                    if (data) {
                        var str = '';
                        for(var i = 0; i< data.length; i++){
                            var content = [
                                    '我抢到了红包'+data[i].hongbao+'元。霾头苦干，等待聚美11.11红包犒赏！',
                                    '我抢到了红包'+data[i].hongbao+'元。今天捡到的尽然是钱，去聚美验验是真的吗？',
                                    '我抢到了红包'+data[i].hongbao+'元。再攒几个红包邮费就有了，货真价实的红包。',
                                    '我抢到了红包'+data[i].hongbao+'元。楼上的咱能不这样抠搜吗？',
                                    '我抢到了红包'+data[i].hongbao+'元。有真品防伪码更放心一些，希望更多品牌能加入。',
                                ];
                            var index = Math.floor(Math.random() * content.length);
                            var randomContent = content[index];
                            var img = data[i].head;
                            if($.trim(img) == ''){
                                img = 'http://images.jumei.com/mobile/act/activities/2014_11/11zhuhuichang/default.png';
                            }
                            str += '<li>'
                                    + '<img class="friend-icon" src="'+img+'"/>'
                                    + '<div class="friend-detail">'
                                    + '<div class="friend-name">'+data[i].name+'</div>'
                                    + '<div>'+randomContent+'</div>'
                                    + '</div>'
                                    + '</li>';
                        }
                        $('.friend-desc ul').html(str);
                    } else {
                        alert("网络不给力，过会儿试试～");
                    }
                },
                error: function(e) {
                    $('#wrapper').loadding("close");
                    alert("网络不给力，过会儿试试～");
                }
            });
        },
        initEvent: function() {
            $('#bg-share').on('click', function(){
                $(this).hide();
            });
            $('#share-hongbao').on('click', function(){
                $('#bg-share').show();
            });
            $('.wrapper-join').on('click', function(){
                try{
                    Jumei.ja('hongbaoweixin11','fangweima');
                }catch(e){} 
                location.href = "http://s.m.jumei.com/pages/1168?package="+$('#package').val();
            });
        }
    });
    new JumeiRedBag();
});
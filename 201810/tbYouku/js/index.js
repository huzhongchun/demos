
$(function(){
    $('.select-box .s').click(function () {
        $('.select .active').removeClass('active');
        $(this).addClass('active');
        $('.select-box').hide();
        $('.video-box').show();
        if($(this).hasClass('s-1')){
            $('.img-7 .s-1').addClass('active')
            $('.video-box video').attr('src','./video/yes.mp4')
        }else{
            $('.img-7 .s-2').addClass('active')
            $('.video-box video').attr('src','./video/no.mp4')
        }
        setTimeout(function () {
            $('video')[0].play();
        },200)
    });

    $('video').on('ended',function () {
        goNextPage();
    });
    $('.skip').on('click',function () {
        $('video')[0].pause();
        goNextPage();
    });

    function goNextPage () {
        $('.content').show();
        $('.start-page').addClass('hide');
        setTimeout(function () {
            $('.start-page').hide();
            $('.start-page').removeClass('hide');
        },420)
    }


    $('.img-7 .s').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.select .active').removeClass('active');
        $(this).addClass('active');
        $('.content').hide();
        $('.start-page').show();
        if($(this).hasClass('s-1')){
            $('.video-box video').attr('src','https://resource2.thefair.net.cn/_assets/touch/activity/third/tbYouku/audio/yes.mp4')
        }else{
            $('.video-box video').attr('src','https://resource2.thefair.net.cn/_assets/touch/activity/third/tbYouku/audio/no.mp4')
        }
        setTimeout(function () {
            $('video')[0].play();
        },200)
    });

});

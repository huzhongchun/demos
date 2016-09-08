$(function() {
    var nav_sign = 1;
    $(window).scroll(function() {
        var top = $(window).scrollTop();
        if (top > 300) {
            if (nav_sign === 1) {
                setTimeout(function() {
                    $('.fix-btn').removeClass('fixedhide');
                    nav_sign = 0;
                }, 100);
            }
        } else {
            if (nav_sign === 0) {
                setTimeout(function() {
                    $('.fix-btn').addClass('fixedhide');
                    nav_sign = 1;
                }, 100);
            }
        }

    });

});

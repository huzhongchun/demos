import { init as initStage } from './stage';
import { initBall } from './ball';
import {initLoading} from './loading';
$(window).on('stage_show', function () {
	initStage();
});
$(window).on('ball_show', function () {
	initBall();
});
$(window).on('loading_show', function () {
	initLoading();
});

function match(str) {
	if (window.location.pathname.indexOf(str) > -1) {
		$(window).trigger(`${str}_show`);
	}
}
match('loading');
match('ball');
match('stage');
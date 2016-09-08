define(function(){
    
    /**
     ** 基于375的缩放布局，所以不能取window或者document的宽度，而是scale-wrapper缩放容器的宽度，其实就是375的宽度
     **/

    var _country = $('.hide-country-value').val(),
	    _platform = F.platform(),
        _category = gaLinkToCategoryFunc(),
        _cookieUid = $.getCookie('uid');

    var _handleTags = require('touch/js/handleTags');


    /** 
     ** 懒加载图片和内容
     **/

    var lazyload = require('widget/lazyLoadContent');
    F.widget.lazyload = new lazyload({
        picSelector: '.lazy-load',
        contentSelector: '.lazy-load-content',
        threshold: 1000,
    });


    /** 
     ** urlScheme
     **/
    F.widget.refreshUrlSchme = function(country){
        $('.url-scheme').urlScheme({
            country: country,
            className: 'url-scheme',
        })
    }

    /** 
     ** hack在IOS下微信等webview中无法修改document.title的情况 
     **/
    F.widget.setTitle = setTitle;
    function setTitle(titleTxt){
        var $body = $('body');    
        document.title = titleTxt;    
        var $iframe = $('<iframe src="/favicon.ico" style="display:none"></iframe>').on('load', function() {      
            setTimeout(function(){        
                $iframe.off('load').remove()      
            }, 0)    
        }).appendTo($body)
    }
     
	var _windowW = $('#scale-wrapper').width();
    F.parseCard = {
        handleFeedResultFunc: handleFeedResultFunc,
        setBanner : 
            {
                initFunc : setBannerFunc,
            },
        setMetro : 
            {
                initFunc : setMetroFunc,
            },
        setUserMiniProfileList : 
            {
                initFunc : setUserMiniProfileListFunc,
            },
        callFeedRecommend: 
            {
                initFunc : callFeedRecommendFunc,
                ajaxCallFunc: ajaxCallFeedRecommend,
                parseRecommendNoteDataFunc: parseRecommendNoteDataFunc,
            },
        callFeedUser: 
            {
                initFunc : callFeedUserFunc,
                ajaxCallFunc: ajaxCallUserFeedFunc,
            },
        setScrollImage:
            {
                initFunc : setScrollImageFunc,
            },
        setNoteImage :
            {
                initFunc : setNoteImageFunc,
            },
        callNoteContent : 
            {
                initFunc : callNoteContentFunc,
            },
        callNoteContentTranslation : 
            {
                initFunc : callNoteContentTranslationFunc,
            },
        setNoteTagInfo : 
            {
                initFunc : setNoteTagInfoFunc,
            },
        setUserMiniProfile : 
            {
                initFunc : setUserMiniProfileFunc,
            },
        setFavoriteUser : 
            {
                initFunc : setFavoriteUserFunc,
            },
        setNoteCommentInfo : 
            {
                initFunc : setNoteCommentInfoFunc,
            },
        setNoteModelInfo : 
            {
                initFunc : setNoteModelInfoFunc,
            },
        setMagazineInfo : 
            {
                initFunc : setMagazineInfoFunc,
            },
        callFeedMagazine : 
            {
                initFunc : callFeedMagazineFunc,
                ajaxCallFunc: ajaxCallMagazineFeedFunc,
            },
        setNoteRelatedProductsInfo : 
            {
                initFunc : setNoteRelatedProductsInfoFunc,
            },
        setCollectionInfo : 
            {
                initFunc : setCollectionInfoFunc,
            },
        callFeedCollection : 
            {
                initFunc : callFeedCollectionFunc,
                ajaxCallCollectionFeedFunc: ajaxCallCollectionFeedFunc,
            },
        callNoteList : 
            {
                initFunc : callNoteListFunc,
                ajaxCallNoteListFunc : ajaxCallNoteListFunc,
            },
        setUserInfo : 
            {
                initFunc : setUserInfoFunc,
            },
        setMagazineBanner : 
            {
                initFunc : setMagazineBannerFunc,
            },  
        setUsersList : 
            {
                initFunc : setUsersListFunc,
            },
        setMagazinesList : 
            {
                initFunc : setMagazinesListFunc,
                parseMagazinesListFunc: parseMagazinesListFunc,
            }, 
        setSearchBar :
            {
                initFunc : setSearchBarFunc,
            },
        setBrandInfo :
            {
                initFunc : setBrandInfoFunc,
            },
        callCardList :
            {
                initFunc : callCardListFunc,
            },
        hiddenShareInfo : 
            {
                initFunc : hiddenShareInfoFunc,
            },
        successLoginCallback : successLoginCallback,
        //返回href，解析是否需要新窗口打开
        getResponseHrefFunc : getResponseHrefFunc,
        addFollowUserEventFunc: addFollowUserEventFunc,
        gaLinkToCategoryFunc: gaLinkToCategoryFunc,
    }

    /**
     ** 解析feed_type，分配解析方法
     **/
    function handleFeedResultFunc(cardList){
    	for (var i = 0; i < cardList.length; i++) {
    		var type = cardList[i].type;
    		var cardItemData = cardList[i];
    		switch(type){
    			case  'set_banner':
                    setBannerFunc(cardItemData,i);
                    break;
                case  'set_metro':
                    setMetroFunc(cardItemData,i);
                    break;
                case  'set_user_mini_profile_list':
                    setUserMiniProfileListFunc(cardItemData,i);
                    break;
                case  'call_feed_recommend':
                    callFeedRecommendFunc(cardItemData,i);
                    break;
                case  'set_scroll_image':
                    setScrollImageFunc(cardItemData,i);
                    break;
                case  'call_feed_user':
                    callFeedUserFunc(cardItemData,i);
                    break;
                case  'set_note_image':
                    setNoteImageFunc(cardItemData,i);
                    break;
                case  'call_note_content':
                    callNoteContentFunc(cardItemData,i);
                    break;
                case  'set_note_content':
                    setNoteContentFunc(cardItemData,i);
                    break;
                case  'call_note_content_translation':
                    callNoteContentTranslationFunc(cardItemData,i);
                    break;
                case  'set_note_content_translation':
                    setNoteContentTranslationFunc(cardItemData,i);
                    break;
                case  'set_note_tag_info':
                    setNoteTagInfoFunc(cardItemData,i);
                    break;
                case  'set_user_mini_profile':
                    setUserMiniProfileFunc(cardItemData,i);
                    break;
                case  'set_favorite_user':
                    setFavoriteUserFunc(cardItemData,i);
                    break;
                case  'set_note_comment_info':
                    setNoteCommentInfoFunc(cardItemData,i);
                    break;
                case  'set_note_model_info':
                    setNoteModelInfoFunc(cardItemData,i);
                    break;
                case  'set_magazine_info':
                    setMagazineInfoFunc(cardItemData,i);
                    break;
                case  'call_feed_magazine':
                    callFeedMagazineFunc(cardItemData,i);
                    break;
                case  'set_note_related_products_info':
                    setNoteRelatedProductsInfoFunc(cardItemData,i);
                    break;
                case  'set_collection_info':
                    setCollectionInfoFunc(cardItemData,i);
                    break;
                case  'call_feed_collection':
                    callFeedCollectionFunc(cardItemData,i);
                    break;
                case  'call_note_list':  //专题下的全部笔记
                    callNoteListFunc(cardItemData,i);
                    break;
                case  'set_user_info':
                    setUserInfoFunc(cardItemData,i);
                    break;
                case  'set_magazine_banner':
                    setMagazineBannerFunc(cardItemData,i);
                    break;
                case  'set_search_bar':
                    setSearchBarFunc(cardItemData,i);
                    break;
                case  'set_brand_info':
                    setBrandInfoFunc(cardItemData,i);
                    break;
                case  'call_card_list':
                    callCardListFunc(cardItemData,i);
                    break;
                case 'hidden_note_info':
                    hideNoteInfoFunc(cardItemData,i);
                    break;
                case  'hidden_share_info':
                    hiddenShareInfoFunc(cardItemData,i);
                    break;
    		}
    	}
    }
    /**
     ** 初始化横滑组件
     **/
    function  newScrollXFunc(dom){
        var scrollXObject = require('widget/scroll-X');
        return new scrollXObject({
            dom: dom,
        })
    }


    /*************  set_banner  *************/

    function setBannerFunc(cardItemData,idNumb,containerDom){
        if(containerDom)
            $(containerDom).append('<div class="card-banner-area"><div class="card-banner-title"></div><div class="card-banner-list" id="card-banner-id-'+idNumb+'"></div></div>');
        else    
		  $('#content-container').append('<div class="card-banner-area"><div class="card-banner-title"></div><div class="card-banner-list" id="card-banner-id-'+idNumb+'"></div></div>');
    	parseBannerCardFunc(cardItemData,idNumb);
    }

    /**
     **	rowArray :  存放一行metro的数组；
     **	widthCount : 统计是否当前已经达到12格；
     **	curRowWidth : 当前行的宽度；
     **
     **/
    function parseBannerCardFunc(cardItemData,idNumb){
    	var $bannerListBox = $('#card-banner-id-'+idNumb);
    	if(cardItemData.title)
    		$bannerListBox.prev().text(cardItemData.title).show();
    	var material = cardItemData.material;
    	if(material.length > 0){
    		for (var i = 0; i < material.length; i++) {
    			$bannerListBox.append('<a class="banner-item url-scheme" data-bannerid="'+material[i].id+'" href="'+material[i].link+'"><img src="'+material[i].image.url+'"></a>')
    		};

            var sliderObject = require('widget/slider-Touch-by-transform');
    		var slider = new sliderObject('card-banner-id-'+idNumb,{
                dotsClass : 'banner-dots-box',
                dotsSelectedId : 'selected-banner-dots',
                autoPlay: true,
            })
    	}
        $('.card-banner-area').on('click','.banner-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            //ga统计
            var bannerId = $(this).attr('data-bannerid');
            F.addEventGa(_category,'goto','banner_'+bannerId+'_'+finalLink);
            location.href = finalLink;
        })
    }



    /*************  set_metro  *************/

    function setMetroFunc(cardItemData,idNumb,containerDom){
        if(containerDom)
            $(containerDom).append('<div class="card-metro-area" id="card-metro-area-id-'+idNumb+'"><div class="card-metro-title" ></div><div class="card-metro-list" id="card-metro-id-'+idNumb+'"></div></div>');
        else
	       $('#content-container').append('<div class="card-metro-area" id="card-metro-area-id-'+idNumb+'"><div class="card-metro-title"></div><div class="card-metro-list" id="card-metro-id-'+idNumb+'"></div></div>');

        var metroItemBox = containerDom ? $(containerDom).find('#card-metro-id-'+idNumb) : $('.card-metro-area #card-metro-id-'+idNumb).last();
    	parseMetroCardFunc(cardItemData,idNumb,metroItemBox);
    }

    /**
      *	rowArray :  存放一行metro的数组；
      *	widthCount : 统计是否当前已经达到12格；
      *	curRowWidth : 当前行的宽度；
      *
    */
    function  parseMetroCardFunc(cardItemData,idNumb,boxDom){
    	var rowArray = [] , widthCount = 0 ,curRowWidth = 0 ,leaveWidth = 0 , len = 0 , curRowTpl = '', moreTpl= '';
    	var material = cardItemData.material;
        var $curMetroArea = $('#scale-wrapper .card-metro-area').last();
        if(cardItemData.more){
            moreTpl = '<a class="check-more url-scheme" href="'+cardItemData.more+'">更多</a>'
        }
    	if(cardItemData.title)
			$curMetroArea.find('.card-metro-title').html(cardItemData.title+moreTpl).show();
    	if(material.length > 0){
    		for (var i = 0; i < material.length; i++) {
    			var metroItemInfo = parseMetroTplFunc(material[i]);
    			rowArray.push(metroItemInfo);
    			widthCount += parseInt(metroItemInfo.metroWidthNumb);
    			if(widthCount == 12){
    				var k = 0;
					len = rowArray.length;
    				for (var j = 0; j < len; j++) {
    					curRowWidth += rowArray[j].metroWidth;
    					//curRowTpl += rowArray[j].metroTpl;
    				};
    				leaveWidth = _windowW - curRowWidth;

                    //如果正好能放下(一行三个)
                    if(leaveWidth == 0){
                        $curMetroArea.css('padding-left',0);
                    }
    				//挨个增加 1px
    				// if(!hasAddPandding){
    				// 	hasAddPandding = true;
	    			// 	while(leaveWidth > 0){
	    			// 		//基数先增加padding－right
	    			// 		if(leaveWidth % 2 == 1){
	    			// 			var curPaddingRigth = parseInt(window.getComputedStyle($('#scale-wrapper .card-metro-area').last()[0],null)['padding-right']);
	    			// 			$('#scale-wrapper .card-metro-area').last().css('padding-right',(curPaddingRigth+1)+'px');
	    			// 		}
	    			// 		else if(leaveWidth % 2 == 0){
	    			// 			var curPaddingLeft = parseInt(window.getComputedStyle($('#scale-wrapper .card-metro-area').last()[0],null)['padding-left']);
	    			// 			$('#scale-wrapper .card-metro-area').last().css('padding-left',(curPaddingLeft+1)+'px');
	    			// 		}
	    			// 		leaveWidth--;
	    			// 		//修正metroTpl的宽度值
	    			// 		//rowArray[k].metroTpl = replaceMetroWidthFunc(rowArray[k].metroTpl,rowArray[k].metroWidth + 1);
	    			// 		// k++;
	    			// 		// if(k == len){
	    			// 		// 	k = 0;
	    			// 		// }
	    			// 	}
	    			// }
    				//注入本行的metro
    				for (var n = 0; n < rowArray.length; n++) {
    					$(boxDom).append(rowArray[n].metroTpl);
    				};
    				//恢复初始状态
    				rowArray= [];
    				k = 0;
    				widthCount = 0;
    				leaveWidth = 0;
    				curRowWidth = 0;
    			}
    			
    		};


            $('#card-metro-id-'+idNumb).on('click','.metro-item',function(e){
                e.preventDefault();
                e.stopPropagation();
                var href = $(this).attr('href');
                var finalLink = getResponseHrefFunc(href);
                //ga统计
                var metroId = $(this).attr('data-metroid');
                F.addEventGa(_category,'goto','metro_'+metroId+'_'+finalLink);
                location.href = finalLink;
            });

            $('#card-metro-area-id-'+idNumb).on('click','.check-more',function(e){
                e.preventDefault();
                e.stopPropagation();
                var href = $(this).attr('href');
                var finalLink = getResponseHrefFunc(href);
                //ga统计
                F.addEventGa(_category,'goto','metro_more_'+finalLink);
                location.href = finalLink;
            });

            F.widget.refreshUrlSchme();
    	}
    }

    /** 解析metro的HTML模板 **/
    function  parseMetroTplFunc(data){
    	if(data){
    		switch(data.type){
    			case 'image' :
    				var _metroInfo = parseMetroPositionFunc(data.position);
    				return {
    						metroWidth : _metroInfo.ww.px,
    						metroWidthNumb : _metroInfo.ww.numb,
    						metroTpl : 
    							'<a class="metro-item url-scheme" data-metroid="'+data.id+'" style="width:'+_metroInfo.ww.px+'px;height:'+_metroInfo.hh.px+'px;"  data-id="'+data.id+'" href="'+data.link+'">'+
						            '<span class="metro-img-box" data-imgtype="'+data.image.type+'"><img src="'+data.image.url+'"></span>'+
						            '<span class="metro-title-box">'+data.title+'</span>'+
						        '</a>',
					    }
			        break;
    		}
    		
    	}
    }

    /** 替换metro的宽度 **/
    function replaceMetroWidthFunc(metroTpl,width){
    	return metroTpl.replace(/width:\s*\d+\s*px/,'width:'+width+'px');
    }

    /** 解析metro定位和高宽信息 
    /**
     ** 目前页面以375px的宽度做缩放布局,所以_windowW = 375;
     **/
    function parseMetroPositionFunc(postion){
    	if(postion){
    		var info = postion.split('_');
    		return {
    			ll :  {
    					numb : info[0],
    					px : Math.floor(((info[0] - 1) / 12) * _windowW),
    				},

    			tt :  {
    					numb : info[1],
    					px : Math.floor(((info[1] - 1) / 12) * _windowW)
    				},
    			ww :  {
    					numb : info[2],
    					px : Math.floor((info[2] / 12) * _windowW)
    				},
    			hh :  {
    					numb : info[3],
    					px : Math.floor((info[3] / 12) * _windowW)
    				},
    		}
    	}

    }


    /*************  set_user_mini_profile_list  *************/
    
    function setUserMiniProfileListFunc(cardItemData,idNumb,containerDom){
        if(containerDom)
            $(containerDom).append('<div class="card-user-profile-area" id="card-user-profile-id-'+idNumb+'"></div>');
        else 
            $('#content-container').append('<div class="card-user-profile-area" id="card-user-profile-id-'+idNumb+'"></div>');
        var areatiltleTpl = '', 
            $areaBox = containerDom ? $(containerDom).find('#card-user-profile-id-'+idNumb) : $('#card-user-profile-id-'+idNumb).last();
        if(cardItemData.title){
            areatiltleTpl = '<div class="card-user-profile-title">'+
                                '<i class="user-profile-icon"><img src="'+cardItemData.icon+'"></i>'+
                                '<span class="user-profile-text">'+cardItemData.title+'</span>'+
                                '<i class="user-profile-icon"><img src="'+cardItemData.icon+'"></i>'+
                            '</div>';
        }
        $areaBox.append(areatiltleTpl);

        var profileList = cardItemData.material;
        parseUserMiniProfileFunc(profileList,idNumb,$areaBox);
    }

    
    function parseUserMiniProfileFunc(profileList,idNumb,boxDom){
        var $areaBox = boxDom, miniUserTpl = '', miniProfileTpl = '';
        if(profileList && profileList.length > 0){
            for (var i = profileList.length - 1; i >= 0; i--) {
                $areaBox.append('<ul class="card-user-profile-list" id="user-profile-list-id-'+idNumb+'-'+i+'"></ul>');
                $ulBox = $areaBox.find('#user-profile-list-id-'+idNumb+'-'+i).last();
                var profileItem = profileList[i];
                var isVip = profileItem.user.mclub && profileItem.user.mclub.icon;
                miniUserTpl = '<div class="card-user-profile-info">'+
                                    '<a class="user-info-box url-scheme" data-uid="'+profileItem.user.uid+'" href="'+profileItem.user.link+'">'+
                                        '<span class="user-head lazy-load" data-background="true" data-url="'+profileItem.user.avatar+'"></span>'+
                                        '<div class="user-intro-box">'+
                                            '<span class="user-nick"><span class="nick-text">'+profileItem.user.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+profileItem.user.mclub.icon+'"></i>' : '')+'</span>'+
                                            (profileItem.user.desc && profileItem.user.desc.trim() ? '<span class="user-desc">'+profileItem.user.desc+'</span>' : '')+
                                        '</div>'+
                                    '</a>'+
                                    '<span class="follow-user-btn '+(profileItem.user.following ? 'following':'')+'" data-uid="'+profileItem.user.uid+'">'+(profileItem.user.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                                '</div>';
                var noteItemTpl = '';
                var noteList = profileItem.note_list;
                for (var j = 0; j < noteList.length; j++) {
                    noteItemTpl += '<a class="note-item url-scheme lazy-load" data-note-id="'+noteList[j].note_id+'" href="'+noteList[j].image.link+'" data-background=true" data-url="'+noteList[j].image.url+'"></a>';
                };
                
                miniProfileTpl = '<div class="user-profile-scroll-view">'+
                                    '<div class="card-user-profile-notes" id="profile-scroll-box-id-'+idNumb+'-'+i+'">'+
                                        noteItemTpl+
                                    '</div>'+
                                '</div>';
                $ulBox.append('<li class="user-profile-item">'+miniUserTpl+miniProfileTpl+'</li>');

                //如果个数小于三个，不横滑
                if(profileList.length >= 3){
                    var dom = $areaBox.find('.card-user-profile-notes').last();
                    //console.log($areaBox.find('.card-user-profile-notes').last().length+'---'+id)
                    newScrollXFunc(dom);
                }
            }
        }


        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        addFollowUserEventFunc('card-user-profile-area');


        $areaBox.find('#card-user-profile-id-'+idNumb).on('click','.note-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            //ga统计
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        })
        $areaBox.find('#card-user-profile-id-'+idNumb).on('click','.user-info-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            //ga统计
            F.addEventGa(_category,'goto','userCenter');
            location.href = finalLink;
        })
    }



    /*************  call_feed_recommend  *************/

    function callFeedRecommendFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-recommend-note-area" id="card-recommend-note-id-'+idNumb+'"></div>');
        var $recommendBox = $('#card-recommend-note-id-'+idNumb);
        var titleTpl = '';
        if(cardItemData.title){
            titleTpl = '<div class="card-recommend-note-title">'+
                            '<span class="recommend-note-title-txt">'+
                                (cardItemData.icon ? '<i class="recommend-note-icon"><img src="'+cardItemData.icon+'"></i>' : '')+
                                '<span class="recommend-title-txt">'+cardItemData.title+'</span>'+
                                (cardItemData.icon ? '<i class="recommend-note-icon"><img src="'+cardItemData.icon+'"></i>' : '')+
                            '</span>'+
                        '</div>';
            $recommendBox.append(titleTpl);
        }
        ajaxCallFeedRecommend(cardItemData.material.url,cardItemData.material.params,idNumb,$recommendBox);

    }
    function ajaxCallFeedRecommend(url,params,idNumb,boxDom,successCallback,errorCallback){
        var path = '' ,paramsString = '';
        //兼容rd的api
        if(url.match(/\.rd\.taooo/)){
            path = url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            path = url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var page = params.page;
        var lastItemId = params.last_item_id;
        if(lastItemId && lastItemId != 0){
            paramsString = '{"last_item_id":"'+lastItemId+'"}';
        }else{
            paramsString = '{"page":"'+page+'"}';
        }
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            data: { path : path ,params : paramsString},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    parseRecommendNoteDataFunc(data.result,idNumb,boxDom);
                }else{
                    alert(data.message.text);
                }
                if(successCallback){
                    successCallback(data);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback){
                    errorCallback.call(this,data);
                }
                F.hideLoading();
            }
        })
    }
    function parseRecommendNoteDataFunc(json,idNumb,boxDom){
        var $recommendBox = $(boxDom);
        $recommendBox.append('<div class="card-recommend-note-list"></div>');
        var $noteListBox = $recommendBox.find('.card-recommend-note-list').last();
        var noteList = json.item_list,noteItemTpl = '';
        if(noteList && noteList.length > 0){
            for (var i = 0; i < noteList.length; i++) {
                var feedContent = noteList[i].feed_content;
                var feedType = noteList[i].feed_type;
                if(feedType == 'note'){
                    var noteId = noteList[i].feed_id;
                    var isVip = feedContent.user.mclub.icon;
                    noteItemTpl = '<div class="recommend-note-item">'+
                                        '<div class="note-info url-scheme" href="'+noteList[i].feed_link+'">'+
                                            '<div class="note-img lazy-load" data-background="true" data-url="'+feedContent.image_list[0].url+'"></div>'+
                                            '<div class="note-des">'+feedContent.content+'</div>'+
                                        '</div>'+
                                        '<div class="user-info-box">'+
                                            '<a class="user-link url-scheme" href="'+feedContent.user.link+'">'+
                                                '<span class="user-head lazy-load" data-background="true" data-url="'+feedContent.user.avatar+'"></span>'+
                                                '<span class="user-nick"><span class="nick-text">'+feedContent.user.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+feedContent.user.mclub.icon+'"></i>' : '')+'</span>'+
                                            '</a>'+
                                            '<span class="like-count">'+feedContent.count_summary.favorite.count+'</span>'+
                                        '</div>'+
                                    '</div>';
                    $noteListBox.append(noteItemTpl);
                }
                
            }

            $('#card-recommend-note-id-'+idNumb).find('.card-recommend-note-title').show();
        }
        $('.card-recommend-note-list .note-des').subStr(65);

        $('#card-recommend-note-id-'+idNumb).on('click','.note-info',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        });
        $('#card-recommend-note-id-'+idNumb).on('click','.user-info-box .user-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','userCenter');
            location.href = finalLink;
        });

        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
    }




    /*************  set_scroll_image  *************/

    function setScrollImageFunc(cardItemData,idNumb,containerDom){
        if(containerDom)
            $('#content-container').append('<div class="card-scroll-img-area"></div>');
        else
            $('#content-container').append('<div class="card-scroll-img-area"></div>');
        var $scrollImgBox = $('.card-scroll-img-area').last();
        if(cardItemData.title){
            $scrollImgBox.append('<div class="card-scroll-img-title">'+cardItemData.title+'</div>');
        }
        $scrollImgBox.append('<div class="card-scroll-img-view" id="scroll-img-view-id-'+idNumb+'"></div>');
        var material = cardItemData.material;
        parseScrollImgItemFunc(material,idNumb);
    }
    function parseScrollImgItemFunc(material,idNumb){
        var $listBox = $('#scroll-img-view-id-'+idNumb);
        var imgWidth = parseInt(_windowW * material.image_width_scale);
        var imgHeight = parseInt(imgWidth / material.image_scale);
        var imgList = material.image_list;
        for (var i = 0; i < imgList.length; i++) {
            var imgItemTpl = '<a class="card-scroll-img-item url-scheme lazy-load" data-id="'+imgList[i].id+'" style="width:'+imgWidth+'px;height: '+imgHeight+'px;" href="'+imgList[i].link+'">'+
                                '<img src="'+imgList[i].url+'">'+
                            '</a>';
            $listBox.append(imgItemTpl);
        };
        newScrollXFunc($('#scroll-img-view-id-'+idNumb));

        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();

        $('#scroll-img-view-id-'+idNumb).on('click','.card-scroll-img-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            var id = $(this).attr('data-id');
            F.addEventGa(_category,'goto','set_scroll_image_'+id);
            location.href = finalLink;
        })
    }


    /*************  call_feed_user  *************/

    function callFeedUserFunc(cardItemData,idNumb,containerDom){
        if(containerDom)
            $(containerDom).append('<div class="card-user-note-list-area" id="card-user-note-list-id-'+idNumb+'"></div>');
        else
            $('#content-container').append('<div class="card-user-note-list-area" id="card-user-note-list-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var $noteListBox = containerDom ? $(containerDom).find('#card-user-note-list-id-'+idNumb) : $('#card-user-note-list-id-'+idNumb).last();
        ajaxCallUserFeedFunc(path,1,idNumb,$noteListBox);
    }
    function ajaxCallUserFeedFunc(path,pagenumb,idNumb,boxDom,successCallback,errorCallback){
        var params = '{"page":"'+pagenumb+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    var listArray = data.result.item_list;
                    if(listArray.length > 0){
                        handleUserFeedListFunc(listArray,pagenumb,idNumb,boxDom);
                        //每次初始化程序，只初始化当前加入的tag，提高执行效率
                        _handleTags.parseTagsFunc('need-init-tag-'+data.result.page);
                        //初始化加载第一张图片
                        F.widget.refreshUrlSchme(_country);
                        F.widget.lazyload.refresh();
                    }
                    F.hideLoading();
                }
                else{
                    alert(data.message.text);
                    F.hideLoading();
                }
                if(successCallback)
                    successCallback(data);
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
                if(errorCallback)
                    errorCallback.call(this);
            }
        })
    }
    /** 
     ** 处理feed列表
     **/
    function handleUserFeedListFunc(json,page,idNumb,boxDom){
        F.showLoading();
        for (var i = 0; i < json.length; i++) {
            var noteContent = json[i].feed_content;
            if(json[i].feed_type == 'note'){
                parseFeedNoteItemFunc(json[i],page,idNumb,boxDom);
            }else if(json[i].feed_type == 'user'){
                parseFeedUserItemFunc(json);
            }
        }
        F.hideLoading();
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        _handleTags.parseTagsFunc('need-init-tag-'+idNumb+'-'+page);
        //绑定事件
        addFavoriteEventFunc('.need-init-tag-'+idNumb+'-'+page);
        addCheckFullContentEventFunc('need-init-tag-'+idNumb+'-'+page);
        addCheckTransitionBtnFunc('need-init-tag-'+idNumb+'-'+page);
        addFollowUserEventFunc('need-init-tag-'+idNumb+'-'+page);

        $('#card-user-note-list-id-'+idNumb).on('click','.card-note-pics-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        })
        $('#card-user-note-list-id-'+idNumb).on('click','.add-comment-btn',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.comment-count',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.category-tag-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','category_tags');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.on-img-tag-box a',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','tags');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.source-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.user-info-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','userCenter');
            location.href = finalLink;
        });
        $('#card-user-note-list-id-'+idNumb).on('click','.card-note-relate-product',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','noteDetail');
            location.href = finalLink;
        });


        //笔记内容中的@标签
        $('#card-user-note-list-id-'+idNumb+' .note-original-desc-text a').urlScheme({
            country: _country,
        });
        $('#card-user-note-list-id-'+idNumb+' .note-trans-desc a').urlScheme({
            country: _country,
        });
    }
    /** 
     ** 解析笔记列表卡片
     **/
    function  parseFeedNoteItemFunc(json,page,idNumb,boxDom){
        var feedContent = json.feed_content;
        var source = json.feed_source, userInfo = feedContent.user, tagList = feedContent.tag_list, commentInfo = feedContent.comment_info;
        var sourceTpl = '', userInfoTpl = '', imgTagsTpl = '', categoryTagTpl = '', commentInfoTpl = '', contentTpl = '', relateProductTpl = '';
        var tags = feedContent.image_list[0].tags,tagsTpl = '',tagBrandTpl = '',tagCategoryTpl = '', transTpl = '';
        var noteId = json.feed_link.match(/note_id=(\d+)&/) && json.feed_link.match(/note_id=(\d+)&/)[1];
        /** 笔记来源 **/
        if(source){
            sourceTpl = '<div class="card-note-source">'+
                            '<a class="source-link url-scheme" href="'+source.link+'">'+
                                '<i class="source-icon"><img src="'+source.icon+'"></i>'+source.txt+
                            '</a>'+
                        '</div>';
        }
        /** 用户信息 **/
        if(userInfo){
            var isVip = userInfo.mclub.icon;
            userInfoTpl = '<div class="card-note-user-info">'+
                                '<a class="user-info-box url-scheme" href="'+userInfo.link+'">'+
                                    '<span class="user-head lazy-load" data-background="true" data-url="'+userInfo.avatar+'"></span>'+
                                    '<span class="user-nick">'+
                                        '<span class="nick-text">'+userInfo.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+userInfo.mclub.icon+'"></i>' : '')+
                                        (userInfo.desc ? '<span class="user-desc">'+userInfo.desc+'</span>' : '')+
                                    '</span>'+
                                '</a>'+
                                '<span class="follow-user-btn '+(userInfo.following ? 'following':'')+'" href="" data-uid="'+userInfo.uid+'">'+(userInfo.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                            '</div>';
        }
        /** 图片上的tags **/
        imgTagsTpl = _handleTags.initCardNoteImgsFunc(feedContent.image_list, json.feed_link);
        /** 标签列表 **/
        if(tagList){
            var txtTagTpl = '';
            for (var i = 0; i < tagList.length; i++) {
                txtTagTpl += '<a class="category-tag-item url-scheme '+(tagList[i].style.style_label ? "" : "style-none")+'" href="'+tagList[i].link+'">'+tagList[i].txt+
                                    '<span class="category-tag-style '+(tagList[i].style.style_label ? tagList[i].style.style_label : "")+'">'+(tagList[i].style.txt? tagList[i].style.txt: "")+'</span>'+
                            '</a>';
            }
            categoryTagTpl = '<div class="category-tag-list">'+txtTagTpl+'</div>';
        }
        /** 评论列表 **/
        if(commentInfo){
            var commentList = commentInfo.item_list, commentListTpl = '', len = commentList.length;
            for (var i = 0; i < len; i++) {
                commentListTpl += '<li class="comment-item" data-commentid="'+commentList[i].comment_id+'">'+
                                    '<span class="comment-user-nick">'+commentList[i].user.nick+'：</span>'+
                                    '<span class="comment-text">'+commentList[i].comment_content+'</span>'+
                                '</li>';
            };
            /** 评论总数 **/
            var commentCount =  feedContent.count_summary.comment && feedContent.count_summary.comment.count;
            var addCommentUrl = '/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country;
            if(_platform == 'appIos'){
                addCommentUrl = 'taoo://page/comment_list?note_id='+noteId+'&show_type=push'
            }
            commentInfoTpl = '<div class="card-note-comment-box">'+
                                (commentCount > 3 ? '<a class="comment-count" href="'+addCommentUrl+'">所有'+commentCount+'条评论</a>' : '')+
                                '<ul class="comment-list">'+
                                   commentListTpl+
                                '</ul>'+
                                '<a class="add-comment-btn" href="'+addCommentUrl+'">'+F.textsList.addComment+'</a>'+
                            '</div>';
        }
        /** 翻译 **/
        transFuncTpl = feedContent.show_translation != undefined ? (feedContent.show_translation ? '<span class="card-note-translate-btn" data-type="translation" data-nid="'+noteId+'" data-ajax="false"><i class="translate-icon"></i>翻译</span>' : '<span class="card-note-translate-btn has-not-trans"><i class="translate-icon"></i>暂无翻译</span>') : '';
        /** 内容 **/
        if(feedContent.content){
            contentTpl = '<div class="card-note-desc note-original-desc">'+
                            '<div class="note-original-desc-text">'+feedContent.content+'</div>'+
                            (feedContent.show_full_text ? '<span class="get-full-content-btn" data-nid="'+noteId+'" data-type="original" data-ajax="false">'+F.textsList.checkAll+'</span>' : '')+
                        '</div>';
        }
        /** 相关商品信息 **/
        if(feedContent.related_products){
            relateProductTpl = '<a class="card-note-relate-product url-scheme" href="'+feedContent.related_products.link+'"><i class="relate-icon"></i>'+feedContent.related_products.item_count+'件相关商品</a>';
        }
        var noteItem = '<div class="card-note-item need-init-tag-'+idNumb+'-'+page+'">'+
                            sourceTpl+
                            userInfoTpl+
                            '<div class="card-note-detaill">'+
                                imgTagsTpl+
                                '<div class="card-note-relate-box">'+
                                    '<span class="card-note-like-count '+(feedContent.be_favorite ? 'has-check' : '')+'" data-nid="'+noteId+'"><span class="favorite-numb">'+feedContent.count_summary.favorite.count+'</span>'+F.textsList.favorite+'</span>'+
                                    transFuncTpl+
                                    relateProductTpl+
                                '</div>'+
                                contentTpl+
                                categoryTagTpl+
                                commentInfoTpl+
                            '</div>'+
                        '</div>';
        $(boxDom).append(noteItem);
        
        
    }

    function parseFeedUserItemFunc(json){

    }





    /*********** set_note_image ************/

    function setNoteImageFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-images-area" id="card-note-images-id-'+idNumb+'"></div>');
        
        var noteImagesTpl = _handleTags.initCardNoteImgsFunc(cardItemData.material);
        $('#card-note-images-id-'+idNumb).append(noteImagesTpl);
        _handleTags.parseTagsFunc();
        //初始化加载第一张图片
        F.widget.lazyload.refresh();
    }




    /*************  call_note_content  *************/

    function callNoteContentFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-content-area" id="card-note-content-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var noteId = cardItemData.material.params.note_id;
        var noteContentBox = $('#card-note-content-id-'+idNumb); 
        ajaxCallNoteContentFunc(path,noteId,1,'',idNumb,noteContentBox);
    }
    function ajaxCallNoteContentFunc(path,noteId,pagenumb,contentType,idNumb,boxDom){
        var _contentType = contentType? contentType : '';
        var _pagenumb = pagenumb;
        var params = '{"page":"'+_pagenumb+'","note_id":"'+noteId+'","content_type":"'+_contentType+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){

                if(data.code == 0){
                    if(data.result.page < data.result.page_count){
                        ++_pagenumb;
                        ajaxCallNoteContentFunc(path,noteId,_pagenumb,contentType,idNumb);
                    }
                    if(data.result.content.trim()){
                        $(boxDom).append(data.result.content.replace(/[\n]/g,'<br>'));
                    }else{
                        $(boxDom).hide();
                    }

                    //笔记内容中的@标签
                    $('#card-note-content-id-'+idNumb+' a').urlScheme({
                        country: _country,
                    })
                }
                else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
            }
        })
    }


    /*************  set_note_content  *************/
    function setNoteContentFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-content-area" id="card-note-content-id-'+idNumb+'"></div>');
        if(cardItemData.material.content.trim()){
            var content =  decodeURIComponent(cardItemData.material.content.replace(/[\n]/g,'<br>'))
            $('#card-note-content-id-'+idNumb).append(content);
        }else{
            $('#card-note-content-id-'+idNumb).hide();
        }

        //笔记内容中的@标签
        $('#card-note-content-id-'+idNumb+' a').urlScheme({
            country: _country,
        })
        
    }

    /*************  call_note_content_translation  *************/

    function callNoteContentTranslationFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-trans-content-area" id="card-note-trans-content-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var transContentTpl = '<div class="card-note-trans-content-title">'+
                                    '<span class="content-title-txt">翻译</span>'+
                                    '<span class="triangle-down"></span>'+
                                    '<span class="content-title-gap-line"></span>'+
                                '</div>';
        $('#card-note-trans-content-id-'+idNumb).append(transContentTpl);
        var noteId = cardItemData.material.params.note_id;
        var noteTransContentBox = $('#card-note-trans-content-id-'+idNumb); 
        ajaxCallNoteContentTranslationFunc(path,noteId,1,'translation',idNumb,noteTransContentBox);
    }
    function ajaxCallNoteContentTranslationFunc(path,noteId,pagenumb,contentType,idNumb,boxDom){
        $(boxDom).append('<div class="card-note-trans-content-box"></div>');
        var _contentType = contentType? contentType : '';
        var _pagenumb = pagenumb;
        var params = '{"page":"'+_pagenumb+'","note_id":"'+noteId+'","content_type":"'+_contentType+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    if(data.result.page < data.result.page_count){
                        ++_pagenumb;
                        ajaxCallNoteContentTranslationFunc(path,noteId,_pagenumb,contentType,idNumb);
                    }
                    if(data.result.content.trim()){
                        $(boxDom).find('.card-note-trans-content-box').append(data.result.content.replace(/[\n]/g,'<br>')).show();
                    }

                    //笔记内容中的@标签
                    $('#card-note-trans-content-id-'+idNumb+' a').urlScheme({
                        country: _country,
                    })
                }
                else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
            }
        })
    }


    /*************  set_note_content_translation  *************/

    function setNoteContentTranslationFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-trans-content-area" id="card-note-trans-content-id-'+idNumb+'"></div>');
        var transContentTpl = '<div class="card-note-trans-content-title">'+
                                    '<span class="content-title-txt">翻译</span>'+
                                    '<span class="triangle-down"></span>'+
                                    '<span class="content-title-gap-line"></span>'+
                                '</div>';
        $('#card-note-trans-content-id-'+idNumb).append(transContentTpl);
        if(cardItemData.material.content.trim()){
             $('#card-note-trans-content-id-'+idNumb).append('<div class="card-note-trans-content-box"></div>')
            var content =  decodeURIComponent(cardItemData.material.content.replace(/[\n]/g,'<br>'))
            $('#card-note-trans-content-id-'+idNumb).find('.card-note-trans-content-box').append(content);
        }else{
            $('#card-note-trans-content-id-'+idNumb).hide();
        }
        
    }

    /*************  set_note_tag_info  *************/

    function setNoteTagInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-tag-info-area" id="card-tag-info-id-'+idNumb+'"></div>');

        var tagItemTpl = '';
        var tagList = cardItemData.material.tag_list;
        if(tagList && tagList.length > 0){
            for (var i = 0; i < tagList.length; i++) {
                tagItemTpl = '<a class="card-tag-item url-scheme '+(tagList[i].style.style_label ? "" : "style-none")+'" href="'+tagList[i].link+'">'+tagList[i].txt+
                                '<span class="card-tag-style '+(tagList[i].style.style_label ? tagList[i].style.style_label : "")+'">'+(tagList[i].style.txt ? tagList[i].style.txt : "")+'</span>'+
                        '</a>';
            
                $('#card-tag-info-id-'+idNumb).append(tagItemTpl);
            }
        }
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();

        $('#card-tag-info-id-'+idNumb).on('click','.card-tag-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','searchList');
            location.href = finalLink;
        })
    }



    /*************  set_user_mini_profile  *************/

    function setUserMiniProfileFunc(cardItemData,idNumb){
        var userData = cardItemData.material.user;
        var isVip = userData.mclub.icon;
        var miniProfileTpl = '<div class="card-user-mini-profile-area" id="card-user-mini-profile-id-'+idNumb+'">'+
                                '<a class="user-link url-scheme" href="'+userData.link+'">'+
                                    '<div class="user-head" style="background-image: url('+userData.avatar+')"></div>'+
                                    '<div class="user-intro">'+
                                        '<span class="user-nick"><span class="nick-text">'+userData.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+userData.mclub.icon+'"></i>' : '')+'</span>'+
                                        (userData.desc ? '<span class="user-desc">'+userData.desc+'</span>' : '')+
                                    '</div>'+
                                '</a>'+
                                '<span class="follow-user-btn '+(userData.following ? 'following':'')+'" href="" data-uid="'+userData.uid+'">'+(userData.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                            '</div>';
        $('#content-container').append(miniProfileTpl);
        
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        addFollowUserEventFunc();
    }




    /*************  set_favorite_user  *************/

    function setFavoriteUserFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-favorite-user-area" id="card-favorite-user-id-'+idNumb+'"></div>');
        var $favoriteBox = $('#card-favorite-user-id-'+idNumb);
        var itemList = cardItemData.material.item_list, praiseUserItemTpl = '', len = 0;
        if(itemList && itemList.length > 0){
            len = itemList.length > 6 ? 6 : itemList.length;
            for (var i = 0; i < len; i++) {
                praiseUserItemTpl += '<a class="favorite-user-item url-scheme lazy-load" data-background="true" href="'+itemList[i].link+'" data-url="'+itemList[i].avatar+'"></a>'
            };
            $favoriteBox.append('<div class="card-favorite-user-list">'+praiseUserItemTpl+'</div>');
        }
        $favoriteBox.append('<span class="favorite-user-count">'+cardItemData.material.item_count+F.textsList.favorite+'</span>');
        $favoriteBox.append('<a class="favorite-user-more-icon url-scheme '+(len >= 6 ? "show" : "")+'" href="'+cardItemData.more+'"></a>');

        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh(); 
    }




    /*************  set_note_comment_info  *************/

    function setNoteCommentInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-comment-info-area" id="card-comment-info-id-'+idNumb+'"></div>');
        var $commentBox = $('#card-comment-info-id-'+idNumb);
        $commentBox.append('<div class="card-comment-info-title"><span class="comment-count">'+F.textsList.comment+'('+cardItemData.material.total+')</span></div>');
        var commentItemTpl = '', noteId = cardItemData.material.note_id;
        var commentList = cardItemData.material.latest_comment;
        if(commentList && commentList.length > 0){
            for (var i = 0; i < commentList.length; i++) {
                var user = commentList[i].user;
                commentItemTpl += '<div class="card-comment-item">'+
                                    '<a class="comment-user-head lazy-load url-scheme" data-background="true" data-url="'+user.avatar+'" href="'+user.link+'"></a>'+
                                    '<div class="comment-info">'+
                                        '<a class="user-nick url-scheme" href="'+user.link+'">'+user.nick+'</a>'+
                                        '<span class="comment-text">'+commentList[i].comment_content+'</span>'+
                                    '</div>'+
                                '</div>';
            };
            $commentBox.append('<div class="card-comment-list">'+commentItemTpl+'</div>');
        }
        var addCommentTpl = '';//'<a class="add-comment-btn" href="/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country+'">添加评论</a>';
        $commentBox.append(addCommentTpl);
        if(cardItemData.material.total >3){
            $commentBox.append('<div class="check-all-comment-btn"><a class="url-scheme" href="/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country+'">'+F.textsList.checkAll+'</a></div>');
        }


        F.widget.refreshUrlSchme();
        $('.card-comment-info-area').on('click','.check-all-comment-btn a',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','commensList_'+noteId);
            location.href = finalLink;
        });
        $('.card-comment-info-area').on('click','.comment-user-head',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','userCenter');
            location.href = finalLink;
        });

        //评论中的@标签
        $('#card-comment-info-id-'+idNumb+' .comment-text a').urlScheme({
            country: _country,
        })
    }


    /*************  set_note_model_info  *************/

    function setNoteModelInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-model-area" id="card-note-model-id-'+idNumb+'"><span class="model-info">'+cardItemData.material.model_info.show_text+'</span></div>');
    }





    /*************  set_magazine_info  *************/

    function setMagazineInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-magazine-info-area" id="card-magazine-info-id-'+idNumb+'"></div>');
        var magazineInfo = cardItemData.material;
        var magazineInfoTpl = '<div class="card-magazine-info-box">'+
                                    '<div class="card-magazine-cover-img lazy-load" data-background="true" data-url="'+magazineInfo.cover_img+'"></div>'+
                                    '<div class="card-magazine-name">'+
                                        '<i class="card-magazine-icon"></i>'+
                                        '<div class="card-magazine-title">'+magazineInfo.title+'</div>'+
                                    '</div>'+
                                    '<div class="card-magazine-intro">'+
                                        '<div class="magazine-creator-nick">主编<span class="name-txt">'+magazineInfo.user.nick+'</span></div>'+
                                        '<div class="magazine-count">'+
                                            '<span class="notes-num">'+magazineInfo.count_summary.notes.count+'&nbsp;'+F.textsList.note+'</span>'+
                                            '<span class="fans-num">'+magazineInfo.count_summary.fans.count+'&nbsp;'+F.textsList.follower+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                    (magazineInfo.desc ? 
                                    '<div class="card-magazine-des">'+
                                        '<i class="arrow-icon"></i>'+
                                        magazineInfo.desc+
                                    '</div>' : '')+
                                    '<div class="card-magazine-follow">'+
                                        '<a class="follow-magazine-btn url-scheme '+(magazineInfo.following?'following':'')+'" data-mid="'+magazineInfo.magazine_id+'" href="">'+(magazineInfo.following ? F.textsList.following : F.textsList.followMagazine)+'</a>'+
                                    '</div>'+
                                '</div>';
        $('#card-magazine-info-id-'+idNumb).append(magazineInfoTpl);
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();

        addFollowMagazineEventFunc();
    }




    /*************  call_feed_magazine  *************/

    function callFeedMagazineFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-magazine-note-list-area" id="card-magazine-note-list-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var $magazineListBox = $('#card-magazine-note-list-id-'+idNumb);
        var magazineId = cardItemData.material.params.magazine_id;
        ajaxCallMagazineFeedFunc(path,magazineId,1,idNumb,$magazineListBox);
    }
    function ajaxCallMagazineFeedFunc(path,magazineId,pagenumb,idNumb,boxDom,successCallback,errorCallback){
        var params = '{"page":"'+pagenumb+'","magazine_id":"'+magazineId+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    var listArray = data.result.item_list;
                    if(listArray.length > 0){
                        handleMagazineFeedListFunc(listArray,pagenumb,idNumb,boxDom);
                        //每次初始化程序，只初始化当前加入的tag，提高执行效率
                        _handleTags.parseTagsFunc('need-init-tag-'+data.result.page);
                        //初始化加载第一张图片
                        F.widget.refreshUrlSchme(_country);
                        F.widget.lazyload.refresh();
                    }
                    
                }
                else{
                    alert(data.message.text);
                }
                if(successCallback){
                    successCallback(data);
                }
                F.hideLoading();
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
                if(errorCallback)
                    errorCallback.call(this);
            }
        })
    }
    /** 
     ** 处理feed列表
     **/
    function handleMagazineFeedListFunc(json,page,idNumb,boxDom){
        F.showLoading();
        for (var i = 0; i < json.length; i++) {
            var noteContent = json[i].feed_content;
            if(json[i].feed_type == 'note'){
                parseMagazineFeedNoteItemFunc(json[i],page,idNumb,boxDom);
            }else if(json[i].feed_type == 'user'){
                parseMagazineFeedUserItemFunc(json);
            }
        }
        F.hideLoading();
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        _handleTags.parseTagsFunc('need-init-tag-'+idNumb+'-'+page);

        //绑定事件
        addFavoriteEventFunc('.need-init-tag-'+idNumb+'-'+page);
        addCheckFullContentEventFunc('need-init-tag-'+idNumb+'-'+page);
        addCheckTransitionBtnFunc('need-init-tag-'+idNumb+'-'+page);
        addFollowUserEventFunc('need-init-tag-'+idNumb+'-'+page);
        $('#card-magazine-note-list-id-'+idNumb).on('click','.card-note-pics-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.add-comment-btn',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.comment-count',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.category-tag-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','category_tags');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.source-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.user-info-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#card-magazine-note-list-id-'+idNumb).on('click','.card-note-relate-product',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','noteDetail');
            location.href = finalLink;
        });

        //笔记内容中的@标签
        $('#card-magazine-note-list-id-'+idNumb+' .note-original-desc-text a').urlScheme({
            country: _country,
        });
        $('#card-magazine-note-list-id-'+idNumb+' .note-trans-desc a').urlScheme({
            country: _country,
        });

        
    }
    /** 
     ** 解析笔记列表卡片
     **/
    function  parseMagazineFeedNoteItemFunc(json,page,idNumb,boxDom){
        var feedContent = json.feed_content;
        var source = json.feed_source, userInfo = feedContent.user, tagList = feedContent.tag_list, commentInfo = feedContent.comment_info;
        var sourceTpl = '', userInfoTpl = '', imgTagsTpl = '', categoryTagTpl = '', commentInfoTpl = '', contentTpl = '', relateProductTpl = '';
        var tags = feedContent.image_list[0].tags,tagsTpl = '',tagBrandTpl = '',tagCategoryTpl = '', transFuncTpl= '';
        var noteId = json.feed_link.match(/note_id=(\d+)&/) && json.feed_link.match(/note_id=(\d+)&/)[1];
        /** 笔记来源 **/
        if(source){
            sourceTpl = '<div class="card-note-source">'+
                            '<a class="source-link url-scheme" href="'+source.link+'">'+
                                '<i class="source-icon"><img src="'+source.icon+'"></i>'+source.txt+
                            '</a>'+
                        '</div>';
        }
        /** 用户信息 **/
        if(userInfo){
            var isVip = userInfo.mclub.icon;
            userInfoTpl = '<div class="card-note-user-info">'+
                                '<a class="user-info-box url-scheme" href="'+userInfo.link+'">'+
                                    '<span class="user-head lazy-load" data-background="true" data-url="'+userInfo.avatar+'"></span>'+
                                    '<span class="user-nick"><span class="nick-text">'+userInfo.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+userInfo.mclub.icon+'"></i>' : '')+'</span>'+
                                '</a>'+
                                '<span class="follow-user-btn '+(userInfo.following ? 'following':'')+'" data-uid="'+userInfo.uid+'">'+(userInfo.following ? F.textsList.following :'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                            '</div>';
        }
        /** 图片上的tags **/
        
        imgTagsTpl = _handleTags.initCardNoteImgsFunc(feedContent.image_list, json.feed_link);
        /** 标签列表 **/
        if(tagList){
            var txtTagTpl = '';
            for (var i = 0; i < tagList.length; i++) {
                txtTagTpl += '<a class="category-tag-item url-scheme '+(tagList[i].style.style_label ? "" : "style-none")+'" href="'+tagList[i].link+'">'+tagList[i].txt+
                                    '<span class="category-tag-style '+(tagList[i].style.style_label ? tagList[i].style.style_label : "")+'">'+(tagList[i].style.txt? tagList[i].style.txt: "")+'</span>'+
                            '</a>';
            }
            categoryTagTpl = '<div class="category-tag-list">'+txtTagTpl+'</div>';
        }
        /** 评论列表 **/
        if(commentInfo){
            var commentList = commentInfo.item_list, commentListTpl = '', len = commentList.length;
            for (var i = 0; i < len; i++) {
                commentListTpl += '<li class="comment-item" data-commentid="'+commentList[i].comment_id+'">'+
                                    '<span class="comment-user-nick">'+commentList[i].user.nick+'：</span>'+
                                    '<span class="comment-text">'+commentList[i].comment_content+'</span>'+
                                '</li>';
            };
            /** 评论总数 **/
            var commentCount =  feedContent.count_summary.comment && feedContent.count_summary.comment.count;
            var addCommentUrl = '/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country;
            if(_platform == 'appIos'){
                addCommentUrl = 'taoo://page/comment_list?note_id='+noteId+'&show_type=push'
            }
            commentInfoTpl = '<div class="card-note-comment-box">'+
                                (commentCount > 3 ? '<a class="comment-count" href="'+addCommentUrl+'">所有'+commentCount+'条评论</a>' : '')+
                                '<ul class="comment-list">'+
                                   commentListTpl+
                                '</ul>'+
                                '<a class="add-comment-btn" href="'+addCommentUrl+'">'+F.textsList.addComment+'</a>'+
                            '</div>';
        }
        /** 翻译 **/
        transFuncTpl = feedContent.show_translation != undefined ? (feedContent.show_translation ? '<span class="card-note-translate-btn" data-type="translation" data-nid="'+noteId+'" data-ajax="false"><i class="translate-icon"></i>翻译</span>' : '<span class="card-note-translate-btn has-not-trans"><i class="translate-icon"></i>暂无翻译</span>') : '';

        /** 内容 **/
        if(feedContent.content){
            contentTpl = '<div class="card-note-desc note-original-desc">'+
                            '<div class="note-original-desc-text">'+feedContent.content+'</div>'+
                            (feedContent.show_full_text ? '<span class="get-full-content-btn" data-nid="'+noteId+'" data-type="original" data-ajax="false">'+F.textsList.checkAll+'</span>' : '')+
                        '</div>';
        }
        /** 相关商品信息 **/
        if(feedContent.related_products){
            relateProductTpl = '<a class="card-note-relate-product url-scheme" href="'+feedContent.related_products.link+'"><i class="relate-icon"></i>'+feedContent.related_products.item_count+'件相关商品</a>';
        }
        var noteItem = '<div class="card-note-item need-init-tag-'+idNumb+'-'+page+'">'+
                            sourceTpl+
                            userInfoTpl+
                            '<div class="card-note-detaill">'+
                                imgTagsTpl+
                                '<div class="card-note-relate-box">'+
                                    '<span class="card-note-like-count '+(feedContent.be_favorite ? 'has-check' : '')+'" data-nid="'+noteId+'"><span class="favorite-numb">'+feedContent.count_summary.favorite.count+'</span>'+F.textsList.favorite+'</span>'+
                                    transFuncTpl+
                                    relateProductTpl+
                                '</div>'+
                                contentTpl+
                                categoryTagTpl+
                                commentInfoTpl+
                            '</div>'+
                        '</div>';
        $(boxDom).append(noteItem); 
        

    }

    function parseMagazineFeedUserItemFunc(){

    }



    /*********** set_note_related_products_info ************/

    function setNoteRelatedProductsInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-related-products-info-area" id="card-note-related-products-info-id-'+idNumb+'"></div>');
        var itemList = cardItemData.material.tag_list, $relatedProductsBox = $('#card-note-related-products-info-id-'+idNumb), itemRelatedProductTpl = '';
        if(itemList && itemList.length > 0){
            var relatedProductsTitleTpl = '<div class="card-note-related-products-title">'+
                                                '<span class="related-products-icon"></span>'+
                                                '<span class="related-products-count">'+itemList.length+'</span>件相关商品'+
                                            '</div>';
            $relatedProductsBox.append(relatedProductsTitleTpl);
            for (var i = 0; i < itemList.length; i++) {
                itemRelatedProductTpl += '<li>'+
                                            '<a href="'+itemList[i].link+'">'+
                                                '<div class="relate-product-img">'+
                                                    '<img src="'+itemList[i].images[0].url+'">'+
                                                '</div>'+
                                                '<div class="relate-product-intro">'+
                                                    '<span class="relate-product-desc">'+itemList[i].title+'</span>'+
                                                    '<span class="relate-product-price">'+itemList[i].price+'</span>'+
                                                '</div>'+
                                            '</a>'+
                                        '</li>';
            };
            $relatedProductsBox.append('<ul class="card-note-related-products-list">'+itemRelatedProductTpl+'</ul>');
        }
    }




    /*********** set_collection_info ************/

    function setCollectionInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-collection-info-area" id="card-collection-info-id-'+idNumb+'"></div>');
        var infoData = cardItemData.material;
        var infoBoxTpl =    '<div class="card-collection-cover-img" >'+
                                '<img class="" src="'+infoData.cover_img.url+'">'+
                            '</div>'+
                            '<div class="card-collection-count">'+
                                '<span class="fans-num">'+infoData.count_summary.fans.count+'&nbsp;'+infoData.count_summary.fans.title+'</span>'+
                                '<span class="notes-num">'+infoData.count_summary.note.count+'&nbsp;'+F.textsList.note+'</span>'+
                            '</div>'+
                            '<div class="card-collection-follow-box">'+
                                '<a class="follow-collection-btn url-scheme '+(infoData.following ? 'following' : '')+'" data-cid="'+infoData.collection_id+'" href="">'+(infoData.following ? F.textsList.following : F.textsList.followCollection)+'</a>'+
                            '</div>'+
                            '<div class="card-collection-desc-box">'+
                                infoData.desc+
                            '</div>';
        F.widget.setTitle(infoData.title);
        $('#card-collection-info-id-'+idNumb).append(infoBoxTpl);

        addFollowCollectionEventFunc();
    }



    /*********** call_feed_collection ************/
    function callFeedCollectionFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-collection-note-list-area" id="note-collection-list-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var $collectionListBox = $('#note-collection-list-id-'+idNumb);
        var collectionId = cardItemData.material.params.collection_id;
        ajaxCallCollectionFeedFunc(path,collectionId,1,idNumb,$collectionListBox);
    }
    function ajaxCallCollectionFeedFunc(path,collectionId,pagenumb,idNumb,boxDom,successCallback,errorCallback){
        var params = '{"page":"'+pagenumb+'","collection_id":"'+collectionId+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    var listArray = data.result.item_list;
                    if(listArray.length > 0){
                        handleCollectionFeedListFunc(listArray,pagenumb,idNumb,boxDom);
                        //每次初始化程序，只初始化当前加入的tag，提高执行效率
                        _handleTags.parseTagsFunc('need-init-tag-'+data.result.page);
                        //初始化加载第一张图片
                        F.widget.refreshUrlSchme(_country);
                        F.widget.lazyload.refresh();
                    }
                    
                }
                else{
                    alert(data.message.text);
                }
                if(successCallback){
                    successCallback(data);
                }
                F.hideLoading();
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
                if(errorCallback)
                    errorCallback.call(this);
            }
        })
    }
    /** 
     ** 处理feed列表
     **/
    function handleCollectionFeedListFunc(json,page,idNumb,boxDom){
        F.showLoading();
        for (var i = 0; i < json.length; i++) {
            var noteContent = json[i].feed_content;
            if(json[i].feed_type == 'note'){
                parseCollectionFeedNoteItemFunc(json[i],page,idNumb,boxDom);
            }else if(json[i].feed_type == 'user'){
                parseCollectionFeedUserItemFunc(json);
            }
        }
        F.hideLoading();
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        _handleTags.parseTagsFunc('need-init-tag-'+idNumb+'-'+page);
        //绑定事件
        addFavoriteEventFunc('.need-init-tag-'+idNumb+'-'+page);
        addCheckFullContentEventFunc('need-init-tag-'+idNumb+'-'+page);
        addCheckTransitionBtnFunc('need-init-tag-'+idNumb+'-'+page);
        addFollowUserEventFunc('need-init-tag-'+idNumb+'-'+page);

        $('#note-collection-list-id-'+idNumb).on('click','.card-note-pics-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.add-comment-btn',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-collection-list-id-'+idNumb).on('click','.comment-count',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.category-tag-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','category_tags');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.on-img-tag-box a',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','tags');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.source-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.user-info-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#note-collection-list-id-'+idNumb).on('click','.card-note-relate-product',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','noteDetail');
            location.href = finalLink;
        });


        //笔记内容中的@标签
        $('#note-collection-list-id-'+idNumb+' .note-original-desc-text a').urlScheme({
            country: _country,
        });
        $('#note-collection-list-id-'+idNumb+' .note-trans-desc a').urlScheme({
            country: _country,
        });

    }
    /** 
     ** 解析笔记列表卡片
     **/
    function  parseCollectionFeedNoteItemFunc(json,page,idNumb,boxDom){
        var feedContent = json.feed_content;
        var source = json.feed_source, userInfo = feedContent.user, tagList = feedContent.tag_list, commentInfo = feedContent.comment_info;
        var sourceTpl = '', userInfoTpl = '', imgTagsTpl = '', categoryTagTpl = '', commentInfoTpl = '',relateProductTpl = '';
        var tags = feedContent.image_list[0].tags,tagsTpl = '',tagBrandTpl = '',tagCategoryTpl = '', transFuncTpl = '',contentTpl = '';
        var noteId = json.feed_id;
        /** 笔记来源 **/
        if(source){
            sourceTpl = '<div class="card-note-source">'+
                            '<a class="source-link url-scheme" href="'+source.link+'">'+
                                '<i class="source-icon"><img src="'+source.icon+'"></i>'+source.txt+
                            '</a>'+
                        '</div>';
        }
        /** 用户信息 **/
        if(userInfo){
            var isVip = userInfo.mclub.icon;
            userInfoTpl = '<div class="card-note-user-info">'+
                                '<a class="user-info-box url-scheme" href="'+userInfo.link+'">'+
                                    '<span class="user-head lazy-load" data-background="true" data-url="'+userInfo.avatar+'"></span>'+
                                    '<span class="user-nick"><span class="nick-text">'+userInfo.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+userInfo.mclub.icon+'"></i>' : '')+'</span>'+
                                '</a>'+
                                '<span class="follow-user-btn '+(userInfo.following ? 'following':'')+'" data-uid="'+userInfo.uid+'">'+(userInfo.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                            '</div>';
        }
        /** 图片上的tags **/
        
        imgTagsTpl = _handleTags.initCardNoteImgsFunc(feedContent.image_list, json.feed_link);
        /** 标签列表 **/
        if(tagList){
            var txtTagTpl = '';
            for (var i = 0; i < tagList.length; i++) {
                txtTagTpl += '<a class="category-tag-item url-scheme '+(tagList[i].style.style_label ? "" : "style-none")+'" href="'+tagList[i].link+'">'+tagList[i].txt+
                                    '<span class="category-tag-style '+(tagList[i].style.style_label ? tagList[i].style.style_label : "")+'">'+(tagList[i].style.txt? tagList[i].style.txt: "")+'</span>'+
                            '</a>';
            }
            categoryTagTpl = '<div class="category-tag-list">'+txtTagTpl+'</div>';
        }
        /** 评论列表 **/
        if(commentInfo){
            var commentList = commentInfo.item_list, commentListTpl = '', len = commentList.length;
            for (var i = 0; i < len; i++) {
                commentListTpl += '<li class="comment-item" data-commentid="'+commentList[i].comment_id+'">'+
                                    '<span class="comment-user-nick">'+commentList[i].user.nick+'：</span>'+
                                    '<span class="comment-text">'+commentList[i].comment_content+'</span>'+
                                '</li>';
            };
            /** 评论总数 **/
            var commentCount =  feedContent.count_summary.comment && feedContent.count_summary.comment.count;
            var addCommentUrl = '/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country;
            if(_platform == 'appIos'){
                addCommentUrl = 'taoo://page/comment_list?note_id='+noteId+'&show_type=push'
            }
            commentInfoTpl = '<div class="card-note-comment-box">'+
                                (commentCount > 3 ? '<a class="comment-count" href="'+addCommentUrl+'">所有'+commentCount+'条评论</a>' : '')+
                                '<ul class="comment-list">'+
                                   commentListTpl+
                                '</ul>'+
                                '<a class="add-comment-btn" href="'+addCommentUrl+'">'+F.textsList.addComment+'</a>'+
                            '</div>';
        }
        /** 翻译 **/
        transFuncTpl = feedContent.show_translation != undefined ? (feedContent.show_translation ? '<span class="card-note-translate-btn" data-type="translation" data-nid="'+noteId+'" data-ajax="false"><i class="translate-icon"></i>翻译</span>' : '<span class="card-note-translate-btn has-not-trans"><i class="translate-icon"></i>暂无翻译</span>') : '';

        /** 内容 **/
        if(feedContent.content){
            contentTpl = '<div class="card-note-desc note-original-desc">'+
                            '<div class="note-original-desc-text">'+feedContent.content+'</div>'+
                            (feedContent.show_full_text ? '<span class="get-full-content-btn" data-nid="'+noteId+'" data-type="original" data-ajax="false">'+F.textsList.checkAll+'</span>' : '')+
                        '</div>';
        }
        /** 相关商品信息 **/
        if(feedContent.related_products){
            relateProductTpl = '<a class="card-note-relate-product url-scheme" href="'+feedContent.related_products.link+'"><i class="relate-icon"></i>'+feedContent.related_products.item_count+'件相关商品</a>';
        }
        var noteItem = '<div class="card-note-item need-init-tag-'+idNumb+'-'+page+'">'+
                            sourceTpl+
                            userInfoTpl+
                            '<div class="card-note-detaill">'+
                                imgTagsTpl+
                                '<div class="card-note-relate-box">'+
                                    '<span class="card-note-like-count '+(feedContent.be_favorite ? 'has-check' : '')+'" data-nid="'+noteId+'"><span class="favorite-numb">'+feedContent.count_summary.favorite.count+'</span>'+F.textsList.favorite+'</span>'+
                                    transFuncTpl+
                                    relateProductTpl+
                                '</div>'+
                                contentTpl+
                                categoryTagTpl+
                                commentInfoTpl+
                            '</div>'+
                        '</div>';
        $(boxDom).append(noteItem); 
        $('#content-container').on('click','.card-note-pics-box',function(){
            location.href = $(this).attr('href'); 
        })  

        
    }

    function parseCollectionFeedUserItemFunc(){

    }



    /*********** call_note_list ************/

    // function callNoteListFunc(cardItemData,idNumb){
    //     $('#content-container').append('<div class="card-collection-note-all-area" id="card-collection-note-all-id-'+idNumb+'"></div>');
    //     //兼容rd的api
    //     if(cardItemData.material.url.match(/\.rd\.taooo/)){
    //         var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
    //     }else{
    //         var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
    //     }
    //     var $collectionNoteAllBox = $('#card-collection-note-all-id-'+idNumb);
    //     var collectionId = cardItemData.material.params.collection_id;
    //     ajaxCallNoteListFunc(path,collectionId,1,$collectionNoteAllBox);
    // }
    // function ajaxCallNoteListFunc(path,collectionId,pagenumb,boxDom,successCallback,errorCallback){
    //     var params = '{"page":"'+pagenumb+'","collection_id":"'+collectionId+'"}';
    //     F.showLoading();
    //     $.ajax({
    //         url: '/api',
    //         type: 'GET',
    //         data: { path : path ,params : params},
    //         dataType: 'jsonp',
    //         success: function(data){
    //             if(data.code == 0){
    //                 var listArray = data.result.item_list;
    //                 if(listArray.length > 0){
    //                     handleCollectionNoteAllListFunc(listArray,pagenumb,boxDom);
    //                     //每次初始化程序，只初始化当前加入的tag，提高执行效率
    //                     F.widget.parseTagsFunc('need-init-tag-'+data.result.page);
    //                     //初始化加载第一张图片
    //                     F.widget.refreshUrlSchme(_country);
    //                     F.widget.lazyload.refresh();
    //                 }
                    
    //             }
    //             else{
    //                 alert(data.message.text);
    //             }
    //             if(successCallback){
    //                 successCallback(data);
    //             }
    //             F.hideLoading();
    //         },
    //         error: function(){
    //             alert('网络似乎有问题，请刷新重试～');
    //             F.hideLoading();
    //             if(errorCallback)
    //                 errorCallback.call(this);
    //         }
    //     })
    // }
    

    /*********** call_note_list ************/
    function callNoteListFunc(cardItemData,idNumb,thumbnail){
        $('#content-container').append('<div class="card-note-list-area" id="card-note-list-id-'+idNumb+'"></div>');
        //兼容rd的api
        if(cardItemData.material.url.match(/\.rd\.taooo/)){
            var path = cardItemData.material.url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            var path = cardItemData.material.url.replace(/http:\/\/api.molandapp.com/,'');
        }
        var $areaBox = $('#card-note-list-id-'+idNumb);
        if(cardItemData.title){
            var titleTpl = '<div class="card-note-list-title"><span class="title-text">'+cardItemData.title+'</span></div>'
            $areaBox.append(titleTpl);
        }
        $areaBox.append('<div class="card-note-list-box"></div>');
        $noteListBox = $areaBox.find('.card-note-list-box');
        var params = cardItemData.material.params,idType = '', id = '';
        //解析params
        for(var key in params){
            if(key.match(/id$/)){
                idType = key;
                id = params[key];
                break;
            }
        }
        var blankText = cardItemData.blank_text ? cardItemData.blank_text : '';
        ajaxCallNoteListFunc(path,idType,id,1,idNumb,$noteListBox,blankText,thumbnail);
    }
    function ajaxCallNoteListFunc(path,idtype,id,pagenumb,idNumb,boxDom,blankText,thumbnail,successCallback,errorCallback){
        var params = '{"page":"'+pagenumb+'","'+idtype+'":"'+id+'"}';
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'GET',
            data: { path : path ,params : params},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    var listArray = data.result.item_list;
                    if(listArray.length > 0){
                        if(thumbnail) //缩略图模式
                            handleNoteListThumbnailFunc(listArray,pagenumb,idNumb,boxDom,blankText);
                        else
                            handleNoteListFunc(listArray,pagenumb,idNumb,boxDom,blankText);
                        //每次初始化程序，只初始化当前加入的tag，提高执行效率
                        _handleTags.parseTagsFunc('need-init-tag-'+data.result.page);
                        //初始化加载第一张图片
                        F.widget.refreshUrlSchme(_country);
                        F.widget.lazyload.refresh();
                    }else{
                        //空白提示
                        if(pagenumb == 1)
                            $(boxDom).append('<div class="blank-text-tips">'+blankText+'</div>');
                    }
                    
                }
                else{
                    alert(data.message.text);
                }
                if(successCallback){
                    successCallback(data);
                }
                F.hideLoading();
            },
            error: function(){
                //alert('网络似乎有问题，请刷新重试～');
                F.hideLoading();
                if(errorCallback)
                    errorCallback.call(this);
            }
        })
    }
    /** 
     ** 处理feed列表
     **/
    function handleNoteListFunc(json,page,idNumb,boxDom,blankText){
        F.showLoading();
        for (var i = 0; i < json.length; i++) {
            var noteContent = json[i].feed_content;
            if(json[i].feed_type == 'note'){
                parseNoteListItemFunc(json[i],page,idNumb,boxDom);
            }else if(json[i].feed_type == 'user'){
                parseNoteListUserItemFunc(json);
            }
        }
        F.hideLoading();
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        _handleTags.parseTagsFunc('need-init-tag-'+idNumb+'-'+page);
        //绑定事件
        addFavoriteEventFunc('.need-init-tag-'+idNumb+'-'+page);
        addCheckFullContentEventFunc('need-init-tag-'+idNumb+'-'+page);
        addCheckTransitionBtnFunc('need-init-tag-'+idNumb+'-'+page);
        addFollowUserEventFunc('need-init-tag-'+idNumb+'-'+page);

        $('#card-note-list-id-'+idNumb).on('click','.card-note-pics-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        })
        $('#card-note-list-id-'+idNumb).on('click','.add-comment-btn',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-note-list-id-'+idNumb).on('click','.comment-count',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','comments_list');
            location.href = finalLink;
        });
        $('#card-note-list-id-'+idNumb).on('click','.category-tag-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','category_tags');
            location.href = finalLink;
        });
        $('#card-note-list-id-'+idNumb).on('click','.source-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#card-note-list-id-'+idNumb).on('click','.user-info-box',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','source_link');
            location.href = finalLink;
        });
        $('#card-note-list-id-'+idNumb).on('click','.card-note-relate-product',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','noteDetail');
            location.href = finalLink;
        });

        
        //笔记内容中的@标签
        $('#card-note-list-id-'+idNumb+' .note-original-desc-text a').urlScheme({
            country: _country,
        });
        $('#card-note-list-id-'+idNumb+' .note-trans-desc a').urlScheme({
            country: _country,
        });
    }
    /** 
     ** 缩略图模式
     **/
    function handleNoteListThumbnailFunc(json,page,idNumb,boxDom,blankText){
        for (var i = 0; i < json.length; i++) {
            if(json[i].feed_type == 'note'){
                var noteId = json[i].feed_id,
                    imgUrl = json[i].feed_content.image_list[0].url_thumbnail,
                    noteItemtpl = '';
                if(imgUrl){
                    noteItemtpl = '<a class="card-collection-note-all-item lazy-load url-scheme" href="'+json[i].feed_link+'"  data-background="true" data-url="'+imgUrl+'"></a>';
                    $(boxDom).append(noteItemtpl)
                }

            }
        }
        
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();

        $('#card-note-list-id-'+idNumb).on('click','.card-collection-note-all-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','note_detail');
            location.href = finalLink;
        });

    }
    /** 
     ** 解析笔记列表卡片
     **/
    function  parseNoteListItemFunc(json,page,idNumb,boxDom){
        var feedContent = json.feed_content;
        var source = json.feed_source, userInfo = feedContent.user, tagList = feedContent.tag_list, commentInfo = feedContent.comment_info;
        var sourceTpl = '', userInfoTpl = '', imgTagsTpl = '', categoryTagTpl = '', commentInfoTpl = '', transFuncTpl = '', contentTpl = '', relateProductTpl = '';
        var tags = feedContent.image_list[0].tags,tagsTpl = '',tagBrandTpl = '',tagCategoryTpl = '';
        var noteId = json.feed_link.match(/note_id=(\d+)&/) && json.feed_link.match(/note_id=(\d+)&/)[1];
        /** 笔记来源 **/
        if(source){
            sourceTpl = '<div class="card-note-source">'+
                            '<a class="source-link url-scheme" href="'+source.link+'">'+
                                '<i class="source-icon"><img src="'+source.icon+'"></i>'+source.txt+
                            '</a>'+
                        '</div>';
        }
        /** 用户信息 **/
        if(userInfo){
            var isVip = userInfo.mclub.icon;
            userInfoTpl = '<div class="card-note-user-info">'+
                                '<a class="user-info-box url-scheme" href="'+userInfo.link+'">'+
                                    '<span class="user-head lazy-load" data-background="true" data-url="'+userInfo.avatar+'"></span>'+
                                    '<span class="user-nick"><span class="nick-text">'+userInfo.nick+'</span>'+(isVip ? '<i class="club-icon"><img src="'+userInfo.mclub.icon+'"></i>' : '')+'</span>'+
                                '</a>'+
                                (userInfo.uid != _cookieUid ? ('<span class="follow-user-btn '+(userInfo.following ? 'following':'')+'" href="" data-uid="'+userInfo.uid+'">'+(userInfo.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>') : '')+
                            '</div>';
        }
        /** 图片上的tags **/
        
        imgTagsTpl = _handleTags.initCardNoteImgsFunc(feedContent.image_list, json.feed_link);
        /** 标签列表 **/
        if(tagList){
            var txtTagTpl = '';
            for (var i = 0; i < tagList.length; i++) {
                txtTagTpl += '<a class="category-tag-item url-scheme '+(tagList[i].style.style_label ? "" : "style-none")+'" href="'+tagList[i].link+'">'+tagList[i].txt+
                                    '<span class="category-tag-style '+(tagList[i].style.style_label ? tagList[i].style.style_label : "")+'">'+(tagList[i].style.txt? tagList[i].style.txt: "")+'</span>'+
                            '</a>';
            }
            categoryTagTpl = '<div class="category-tag-list">'+txtTagTpl+'</div>';
        }
        /** 评论列表 **/
        if(commentInfo){
            var commentList = commentInfo.item_list, commentListTpl = '', len = commentList.length;
            for (var i = 0; i < len; i++) {
                commentListTpl += '<li class="comment-item" data-commentid="'+commentList[i].comment_id+'">'+
                                    '<span class="comment-user-nick">'+commentList[i].user.nick+'：</span>'+
                                    '<span class="comment-text">'+commentList[i].comment_content+'</span>'+
                                '</li>';
            };
            /** 评论总数 **/
            var commentCount =  feedContent.count_summary.comment && feedContent.count_summary.comment.count;
            var addCommentUrl = '/mobile/touch/comments_list?note_id='+noteId+'&__c='+_country;
            if(_platform == 'appIos'){
                addCommentUrl = 'taoo://page/comment_list?note_id='+noteId+'&show_type=push'
            }
            commentInfoTpl = '<div class="card-note-comment-box">'+
                                (commentCount > 3 ? '<a class="comment-count" href="'+addCommentUrl+'">所有'+commentCount+'条评论</a>' : '')+
                                '<ul class="comment-list">'+
                                   commentListTpl+
                                '</ul>'+
                                '<a class="add-comment-btn" href="'+addCommentUrl+'">'+F.textsList.addComment+'</a>'+
                            '</div>';
        }
        /** 翻译 **/
        transFuncTpl = feedContent.show_translation != undefined ? (feedContent.show_translation ? '<span class="card-note-translate-btn" data-type="translation" data-nid="'+noteId+'" data-ajax="false"><i class="translate-icon"></i>翻译</span>' : '<span class="card-note-translate-btn has-not-trans"><i class="translate-icon"></i>暂无翻译</span>') : '';

        /** 内容 **/
        if(feedContent.content){
            contentTpl = '<div class="card-note-desc note-original-desc">'+
                            '<div class="note-original-desc-text">'+feedContent.content+'</div>'+
                            (feedContent.show_full_text ? '<span class="get-full-content-btn" data-nid="'+noteId+'" data-type="original" data-ajax="false">'+F.textsList.checkAll+'</span>' : '')+
                        '</div>';
        }
        /** 相关商品信息 **/
        if(feedContent.related_products){
            relateProductTpl = '<a class="card-note-relate-product url-scheme" href="'+feedContent.related_products.link+'"><i class="relate-icon"></i>'+feedContent.related_products.item_count+'件相关商品</a>';
        }
        var noteItem = '<div class="card-note-item need-init-tag-'+idNumb+'-'+page+'">'+
                            sourceTpl+
                            userInfoTpl+
                            '<div class="card-note-detaill">'+
                                imgTagsTpl+
                                '<div class="card-note-relate-box">'+
                                    '<span class="card-note-like-count '+(feedContent.be_favorite ? 'has-check' : '')+'" data-nid="'+noteId+'"><span class="favorite-numb">'+feedContent.count_summary.favorite.count+'</span>'+F.textsList.favorite+'</span>'+
                                    transFuncTpl+
                                    relateProductTpl+
                                '</div>'+
                                contentTpl+
                                categoryTagTpl+
                                commentInfoTpl+
                            '</div>'+
                        '</div>';
        $(boxDom).append(noteItem); 
        
    }

    function parseNoteListUserItemFunc(){

    }

    /*********** set_user_info ************/

    function setUserInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-user-info-area" id="card-user-info-id-'+idNumb+'"></div>');
        var  userInfo = cardItemData.material, userInfoTpl = '', followTpl = '';
        //判断是否是自己的个人中心,必须是登录状态
        var curUid = _cookieUid;
        var tk = $.getCookie('tk');
        var account = $.getCookie('account');
        if(account && tk){
            if(curUid != userInfo.uid){
                followTpl = '<span class="follow-user-btn '+(userInfo.following ? 'following':'')+'"  data-uid="'+userInfo.uid+'">'+(userInfo.following ? '已关注':'<i class="add-icon"></i>关注')+'</span>';
            }
        }
        userInfoTpl = '<div class="card-user-info-area-box">'+
                            '<div class="card-user-profile-bg-box">'+
                                (userInfo.profile_bg ? '<img src="'+userInfo.profile_bg+'">' : '')+
                            '</div>'+
                            '<div class="card-user-info-intro">'+
                                '<a class="user-link url-scheme" href="'+(userInfo.uid == _cookieUid ? 'javascript:void();' : userInfo.link)+'">'+
                                    '<div class="user-head" style="background-image:url('+userInfo.avatar+')"></div>'+
                                    '<div class="user-nick-box">'+
                                        '<span class="user-nick">'+userInfo.nick+'</span>'+
                                        '<span class="sex-icon '+( userInfo.sex == 'male' ? 'sex-male' : '')+'"></span>'+
                                        (userInfo.nationality.name ? '<span class="national-icon">'+userInfo.nationality.name+'</span>' : '')+
                                    '</div>'+
                                '</a>'+
                                '<div class="card-user-info-mclub">'+
                                    '<a class="mclub-link" href="'+userInfo.mclub.link+'">'+
                                        '<span class="mlclub-icon">'+
                                            '<img  src="'+userInfo.mclub.icon+'">'+
                                        '</span>'+
                                        '<span class="mlclub-title">'+userInfo.mclub.desc+'</span>'+
                                    '</a>'+
                                '</div>'+
                                '<div class="card-user-info-desc">'+
                                    userInfo.desc+
                                '</div>'+
                                followTpl+
                            '</div>'+
                        '</div>'+
                        '<div class="card-user-follows-count-box">'+
                            '<a class="follows-count url-scheme" data-uid="'+userInfo.uid+'" href="'+userInfo.count_summary.follow.link+'"><span class="follows-numb">'+userInfo.count_summary.follow.count+'</span>'+userInfo.count_summary.follow.title+'</a>'+
                            '<a class="fans-count url-scheme" data-uid="'+userInfo.uid+'" href="'+userInfo.count_summary.fans.link+'"><span class="fans-numb">'+userInfo.count_summary.fans.count+'</span>'+userInfo.count_summary.fans.title+'</a>'+
                        '</div>';
        $('#card-user-info-id-'+idNumb).append(userInfoTpl);

        $('.card-user-info-area .card-user-info-desc').subStr(150);

        F.widget.setTitle(userInfo.nick);
        F.widget.refreshUrlSchme();
        //添加关注事件
        addFollowUserEventFunc();

        $('#card-user-info-id-'+idNumb).on('click','.card-user-follows-count-box a',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','users_list');
            location.href = finalLink;
        });

        $('#card-user-info-id-'+idNumb).on('click','.mclub-link',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            //ga统计
            var bannerId = $(this).attr('data-bannerid');
            F.addEventGa(_category,'goto','mclub');
            location.href = finalLink;
        })

    }



    /*********** set_magazine_banner ************/
    function setMagazineBannerFunc(cardItemData,idNumb){
        if(cardItemData.material.item_list && cardItemData.material.item_list.length > 0){
            $('#content-container').append('<div class="card-magazine-banner-area" id="card-magazine-banner-id-'+idNumb+'"></div>');
            var $magazineBannerBox = $('#card-magazine-banner-id-'+idNumb), magzaineBannerTitleTpl = '';
            if(cardItemData.title){
                magzaineBannerTitleTpl = '<div class="card-magazine-banner-title">'+
                                            '<span class="title-text">'+cardItemData.title+'</span>'+
                                            (cardItemData.more ? '<a class="check-more" href="/mobile/touch/user_m_list?uid='+111+'&__c='+_country+'">'+F.textsList.more+'</a>' : '')+
                                        '</div>';
                $magazineBannerBox.append(magzaineBannerTitleTpl);
            }
            $magazineBannerBox.append('<div class="card-magazines-banner-box"><div class="card-magazines-banner-list" id="card-magazine-banner-list-id-'+idNumb+'"></div></div>')
            handleMagazineListFunc(cardItemData.material.item_list,idNumb,$('#card-magazine-banner-list-id-'+idNumb));
        }
    }
    function handleMagazineListFunc(itemList,idNumb,boxDom){
        var magazineList = itemList, magazineListTpl = '', imgUrl = '';
        if(magazineList){
            for (var i = 0; i < magazineList.length; i++) {
                var picsListTpl = '';
                for (var j = 0; j < 4; j++) {
                    if(magazineList[i].note_image_list&&magazineList[i].note_image_list[j]){
                        imgUrl = magazineList[i].note_image_list[j].image.url;
                        if(!imgUrl)
                            picsListTpl += '<div class="pics-box"></div>';
                        else
                            picsListTpl += '<div class="pics-box"><img src="'+imgUrl+'"></div>';
                    }
                    else{
                        picsListTpl += '<div class="pics-box"></div>';
                    }
                }
                
                magazineListTpl = '<a class="card-magazine-banner-item url-scheme" href="'+magazineList[i].link+'">'+
                                        '<div class="magazine-item-pics clearfloat">'+
                                            picsListTpl+
                                        '</div>'+
                                        '<span class="user-head" style="background-image:url('+magazineList[i].user.avatar+')"></span>'+
                                        '<span class="magazine-title">'+magazineList[i].title+'</span>'+
                                        '<span class="magazine-user">'+F.textsList.editor+magazineList[i].user.nick+'</span>'+
                                        '<span class="notes-num">'+magazineList[i].count_summary.note.count+F.textsList.piece+'</span>'+
                                    '</a>';
                $(boxDom).append(magazineListTpl);
            }

            F.widget.refreshUrlSchme();
        }
        
        //初始化横滑
        newScrollXFunc($('#card-magazine-banner-list-id-'+idNumb));

        $('#card-magazine-banner-list-id-'+idNumb).on('click','.card-magazine-banner-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','magazine_detail');
            location.href = finalLink;
        });
    }


    /*********** 用户列表 ************/

    function setUsersListFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-users-list-area" id="card-users-list-id-'+idNumb+'"></div>');
        var $userListBox = $('#card-users-list-id-'+idNumb);
        var userList = cardItemData.result.item_list;
        if(userList.length == 0){
            $('.clean-area').show();
            return false;
        }else{
            $userListBox.append('<div class="card-users-list-box"></div>')
        }
        parseUsersListFunc(userList,idNumb,$('#card-users-list-id-'+idNumb+' .card-users-list-box'));
    }
    function parseUsersListFunc(data,idNumb,boxDom){
        var userItemTpl = '';
        
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
                userItemTpl = '<div class="card-users-list-item card-users-list-item-'+idNumb+'">'+
                        '<a class="user-head url-scheme" href="'+item.link+'" style="background-image: url('+item.avatar+');"></a>'+
                        '<div class="user-intro">'+
                            '<span class="user-nick">'+item.nick+'</span>'+
                            '<span class="user-desc">'+item.desc+'</span>'+
                        '</div>'+
                        '<span class="follow-user-btn '+(item.following ? 'following':'')+'" data-uid="'+item.uid+'">'+(item.following ? F.textsList.following:'<i class="add-icon"></i>'+F.textsList.follow)+'</span>'+
                    '</div>'
            $(boxDom).append(userItemTpl);
        };
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();
        addFollowUserEventFunc('card-users-list-item-'+idNumb);
    }



    /*********** 杂志列表 ************/

    function setMagazinesListFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-magazines-list-area" id="card-magazines-list-id-'+idNumb+'"></div>');
        var $magazineListBox = $('#card-magazines-list-id-'+idNumb);
        var magazinesList = cardItemData.result.item_list;
        if(magazinesList.length == 0){
            $('.clean-area').show();
            return false;
        }else{
            $magazineListBox.append('<div class="card-magazines-list-box"></div>')
        }
        parseMagazinesListFunc(magazinesList,idNumb,$('#card-magazines-list-id-'+idNumb+' .card-magazines-list-box'));
    }
    function parseMagazinesListFunc(data,idNumb,boxDom){
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var picBoxsTpl = '';
            for (var j = 0; j < 4; j++) {
                var imgUrl = item.note_image_list[j] && item.note_image_list[j].image.url;
                picBoxsTpl += '<div class="pics-box">'+(imgUrl ? '<img src="'+imgUrl+'">' : '')+'</div>'
            };
            var tpl = '<a class="card-magazines-list-item url-scheme" href="'+item.link+'">'+
                            '<div class="magazine-item-pics clearfloat">'+picBoxsTpl+'</div>'+
                            '<span class="user-head" style="background-image: url('+item.user.avatar+')"></span>'+
                            '<span class="magazine-name">'+item.title+'</span>'+
                            '<span class="magazine-author">'+F.textsList.editor+item.user.nick+'</span>'+
                            '<span class="total-num">'+item.count_summary.note.count+F.textsList.piece+'</span>'+
                        '</a>';
            $(boxDom).append(tpl);
        };
        F.widget.refreshUrlSchme();
        F.widget.lazyload.refresh();

        $('#card-magazines-list-id-'+idNumb).on('click','.card-magazines-list-item',function(e){
            e.preventDefault();
            e.stopPropagation();
            var href = $(this).attr('href');
            var finalLink = getResponseHrefFunc(href);
            F.addEventGa(_category,'goto','magazine_detail');
            location.href = finalLink;
        });
    }


    /***********  hidden_note_info ************/

    function hideNoteInfoFunc(cardItemData,idNumb){
        $('#content-container').append('<div class="card-note-add-func-box" id="card-note-add-func-box-id-'+idNumb+'"></div>');
        var addFavoriteTpl = '';
        addFavoriteTpl = '<div class="btn-container"><span class="card-note-like-count '+(cardItemData.material.be_favorite ? 'has-check' : '')+'" data-nid="'+cardItemData.material.note_id+'">'+F.textsList.favorite+'</span></div>';
        var addCommentTpl = '<div class="btn-container"><a class="add-comment-btn" href="/mobile/touch/comments_list?note_id='+cardItemData.material.note_id+'&__c='+_country+'">'+F.textsList.comment+'</a></div>';
        $('#card-note-add-func-box-id-'+idNumb).append(addFavoriteTpl+addCommentTpl);

        addFavoriteEventFunc('#card-note-add-func-box-id-'+idNumb);
    }


    /***********  set_search_bar ************/

    function setSearchBarFunc(cardItemData,idNumb){
       $('#content-container').append('<div class="card-search-bar-area" id="card-search-bar-id-'+idNumb+'"></div>');
       var placeHolder = cardItemData.material.default_placeholder ? cardItemData.material.default_placeholder : F.textsList.searchUsers;
       var searchBarTpl = '<div class="card-search-bar-box"><a class="card-search-bar-btn" href="/mobile/touch/search"><i class="search-icon"></i><span class="search-placeholder">'+placeHolder+'</span></a></div>';
       $('#card-search-bar-id-'+idNumb).append(searchBarTpl);
       $('#card-search-bar-id-'+idNumb).on('click','.card-search-bar-btn',function(e){
           e.preventDefault();
           e.stopPropagation();
           var href = $(this).attr('href');
           var finalLink = getResponseHrefFunc(href);
           F.addEventGa(_category,'goto','search');
           location.href = finalLink;
       });
    }


    /***********  set_brand_info ************/

    function setBrandInfoFunc(cardItemData,idNumb){
        var brandInfo = cardItemData.material;
        if(brandInfo){
        $('#content-container').append('<div class="card-brand-info-area" id="card-brand-info-id-'+idNumb+'"></div>');
            var brandInfoTpl = '<div class="card-brand-info-box">'+
                                    '<div class="brand-logo" style="background-image: url('+brandInfo.logo+')"></div>'+
                                    '<div class="brand-intro">'+
                                        '<span class="brand-name">'+brandInfo.name+'</span>'+
                                        '<span class="brand-desc">'+brandInfo.desc+'</span>'+
                                    '</div>'+
                                '</div>';
            $('#card-brand-info-id-'+idNumb).append(brandInfoTpl);
        }       
    }

    /***********  call_card_list ************/
    function callCardListFunc(cardItemData,idNumb,extra){
        var materialData = cardItemData.material;
        var path = '', url = materialData.url, params = materialData.params;
        //兼容rd的api
        if(url.match(/\.rd\.taooo/)){
            path = url.replace(/http:\/\/api.rd.taooo.cc/,'');
        }else{
            path = url.replace(/http:\/\/api.molandapp.com/,'');
        }

        ajaxCallCardListFunc(path,params);
    }

    function ajaxCallCardListFunc(path,params,successCallback,errorCallback){
        F.showLoading();
        var paramsStringArray = [];
        for(var key in params){
            paramsStringArray.push('"'+key+'":"'+params[key]+'"'); 
        }
        $.ajax({
            url: '/api',
            type: 'get',
            data: { path : path ,params : '{'+paramsStringArray.join(',')+'}'},
            dataType: 'jsonp',
            success: function(data){
                if(data.code == 0){
                    var data = data.result.item_list;
                    handleFeedResultFunc(data);
                }else{
                    alert(data.message.text);
                }
                if(successCallback){
                    successCallback(data);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback){
                    errorCallback.call(this,data);
                }
                F.hideLoading();
            }
        })
    }

    /*********** hidden_share_info ************/

    function hiddenShareInfoFunc(cardItemData,idNumb){
        var materialData = cardItemData.material;
        var session = materialData.wechat_session ? materialData.wechat_session : {};
        var timeline = materialData.wechat_timeline ? materialData.wechat_timeline : {};

        var wxShareObject = require('widget/wxShare');
        var share = new wxShareObject({
            //分享给朋友
            shareAppMessageTitle: session.title,
            shareAppMessageDesc:  session.text,
            shareAppMessageLink:  session.link,
            shareAppMessageImgUrl: session.image,
            shareAppMessageSuccessCallback: function(){
                //alert('分享成功～');
            },
            shareAppMessageCancelCallback: function(){},
            // 分享到朋友圈
            shareTimelineTitle: timeline.title,
            shareTimelineLink:  timeline.link,
            shareTimelineImgUrl: timeline.image,
            shareTimelineSuccessCallback: function(){
                //alert('分享成功～');
            },
            shareTimelineCancelCallback: function(){},
        })
    }


    /*********** 初始绑定事件 ************/

    /**
     ** 查看全文
     **/
    function addCheckFullContentEventFunc(parentClass){
        $('.content-container .'+parentClass).find('.get-full-content-btn').off('click').on('click',function(e){
            var _parent = $(this).parents('.note-original-desc').find('.note-original-desc-text'),_this = this;
            e.preventDefault();
            e.stopPropagation();
            var data = $(this).data();
            var noteId = $(this).attr('data-nid');  //不能使用 data.nid，因为超过js所支持的最长整型
            if(noteId){
                if($(_this).hasClass('has-check')){  //收起
                    $(_this).html(F.textsList.checkAll);
                    $(_parent).css('height',$(_parent).data('minHeight')+'px');
                    $(_parent).text($(this).data('minContent'));
                }else{
                    /** 只有第一次请求接口 **/
                    if(!data.ajax){
                        $(_this).data('minContent',$(_parent).text());
                        $(_this).text(F.textsList.loadingAllContent);
                        $(_this).data('minHeight',$(_parent).height());
                        ajaxNoteContentFunc(data.type,noteId,1,function(data){
                            $(_this).text(F.textsList.collect);
                            $(_this).data('ajax',true);
                            $(_parent).html(data.result.content);
                            $(_this).data('maxContent',data.result.content);
                            $(_parent).css('height','auto');
                        },function(e){
                            $(_this).text('正在加载，点击重试～');
                        })
                    }else{
                        $(_this).html(F.textsList.collect);
                        $(_parent).css('height','auto');
                        $(_parent).text($(this).data('maxContent'));
                    }
                }
            }
            $(_this).toggleClass('has-check');
            
        });

    }
    function ajaxNoteContentFunc(contentType,noteId,page,successCallback,errorCallback){
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/note/get_content', params : '{"content_type" : "'+contentType+'","note_id": "'+noteId+'","page":"'+page+'" }'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    /**
     ** 查看翻译
     **/

    function addCheckTransitionBtnFunc(parentClass){
        $('.content-container .'+parentClass).find('.card-note-translate-btn').off('click').on('click',function(e){
            if($(this).hasClass('has-not-trans')){ //没有翻译
                return false;
            }
            var $originalContentBox = $(this).parents('.card-note-detaill').find('.note-original-desc'),_this = this;
            var _parent = $(this).parents('.card-note-detaill');
            e.preventDefault();
            e.stopPropagation();
            var data = $(_this).data();
            var noteId = $(_this).attr('data-nid');  //不能使用 data.nid，因为超过js所支持的最长整型
            if(noteId){
                if($(_this).hasClass('has-check')){  //回到原文
                    $originalContentBox.show();
                    $(_parent).find('.note-trans-desc').hide();
                }else{
                    /** 只有第一次请求接口 **/
                    if(!data.ajax){
                        F.showLoading();
                        ajaxNoteContentFunc(data.type,noteId,1,function(data){
                            $originalContentBox.hide();
                            $(_this).data('ajax',true);
                            $('<div class="card-note-desc note-trans-desc">'+data.result.content+'</div>').insertAfter($originalContentBox);
                        })
                    }else{
                        $(_parent).find('.note-trans-desc').show();
                        $originalContentBox.hide();
                    }
                }
            }
            $(_this).toggleClass('has-check');
            
        });
    }

    /**
     ** 点赞
     **/

    function addFavoriteEventFunc(parentSelector){
        $('.content-container '+parentSelector).find('.card-note-like-count').off('click').on('click',function(e){
            var noteId = $(this).attr('data-nid');
            var _this = this;
            if(noteId){
                if(!$(this).hasClass('has-check')){
                    ajaxAddFavoriteEventFunc(noteId,function(data){
                        $(_this).addClass('has-check');
                        var curFavoriteNumb = parseInt($(_this).find('.favorite-numb').text());
                        $(_this).find('.favorite-numb').text(curFavoriteNumb+1);
                    });
                }else{
                    
                    ajaxRemoveFavoriteFunc(noteId,function(data){
                        $(_this).removeClass('has-check');
                        var curFavoriteNumb = parseInt($(_this).find('.favorite-numb').text());
                        $(_this).find('.favorite-numb').text(curFavoriteNumb-1);
                    });
                }
            }
        })
    }

    function ajaxAddFavoriteEventFunc(noteId,successCallback,errorCallback){
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/note/add_favorite', params : '{"note_id": "'+noteId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    function ajaxRemoveFavoriteFunc(noteId,successCallback,errorCallback){
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/note/remove_favorite', params : '{"note_id": "'+noteId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        //window.location.href = data.result.redirect_url;
                        successLoginCallback();
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }



    /**
     ** 关注用户
     **/
    function addFollowUserEventFunc(parentClass){
        $('.content-container '+(parentClass ? '.'+parentClass : '')).find('.follow-user-btn').off('click').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            var uId = $(this).attr('data-uid'),_this = this;
            if(uId){
                if($(this).hasClass('following')){  //取消关注
                    ajaxRemoveUserFollowFunc(uId,function(data){
                        $(_this).removeClass('following');
                        $(_this).html('').append('<i class="add-icon"></i>'+F.textsList.follow);
                    })
                }else{  //关注
                    ajaxAddUserFollowFunc(uId,function(data){
                        $(_this).addClass('following');
                        $(_this).html('').append(F.textsList.following);
                    })
                }
            }
        })

    }

    function ajaxAddUserFollowFunc(uId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/user/add_follow', params : '{"follow_uid": "'+uId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        window.location.href = data.result.redirect_url;
                        successLoginCallback();
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    function ajaxRemoveUserFollowFunc(uId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/user/remove_follow', params : '{"follow_uid": "'+uId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback.call(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                        //window.location.href = data.result.redirect_url;
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }


    /**
     ** 关注专题
     **/
    function addFollowCollectionEventFunc(){
        $('.content-container').find('.follow-collection-btn').off('click').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            var collectionId = $(this).attr('data-cid'),_this = this;
            if(collectionId){
                if($(this).hasClass('following')){  //取消关注
                    ajaxRemoveCollectionFollowFunc(collectionId,function(data){
                        $(_this).removeClass('following');
                        $(_this).html('').append(F.textsList.followCollection);
                    })
                }else{  //关注
                    ajaxAddCollectionFollowFunc(collectionId,function(data){
                        $(_this).addClass('following');
                        $(_this).html('').append(F.textsList.following);
                    })
                }
            }
        })
        
    }

    function ajaxAddCollectionFollowFunc(collectionId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/collection/add_follow', params : '{"collection_id": "'+collectionId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                        //window.location.href = data.result.redirect_url;
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    function ajaxRemoveCollectionFollowFunc(collectionId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/collection/remove_follow', params : '{"collection_id": "'+collectionId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                        //window.location.href = data.result.redirect_url;
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    /**
     ** 关注杂志
     **/
    function addFollowMagazineEventFunc(){
        $('.content-container').find('.follow-magazine-btn').off('click').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            var magazineId = $(this).attr('data-mid'),_this = this;
            if(magazineId){
                if($(this).hasClass('following')){  //取消关注
                    ajaxRemoveMagazineFollowFunc(magazineId,function(data){
                        $(_this).removeClass('following');
                        $(_this).html('').append(F.textsList.followMagazine);
                    })
                }else{  //关注
                    ajaxAddMagazineFollowFunc(magazineId,function(data){
                        $(_this).addClass('following');
                        $(_this).html('').append(F.textsList.following);
                    })
                }
            }
        })
        
    }

    function ajaxAddMagazineFollowFunc(magazineId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/magazine/add_follow', params : '{"magazine_id": "'+magazineId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                        //window.location.href = data.result.redirect_url;
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }

    function ajaxRemoveMagazineFollowFunc(magazineId,successCallback,errorCallback){
        F.showLoading();
        $.ajax({
            url: '/api',
            type: 'get',
            dataType: 'jsonp',
            data: { path : '/v1/magazine/remove_follow', params : '{"magazine_id": "'+magazineId+'"}'},
            success: function(data){
                if(data.code == 0){
                    if(successCallback)
                        successCallback(data);
                }else if(data.code == 40000){  //未登录
                    setTimeout(function(){
                        successLoginCallback();
                        //window.location.href = data.result.redirect_url;
                    },10);
                }else{
                    alert(data.message.text);
                }
                F.hideLoading();
            },
            error: function(e){
                //alert(e.responseText);
                if(errorCallback)
                    errorCallback.call(this,data);
                F.hideLoading();
            }
        })
    }



    /**
     ** Ga统计，页面链接对应的category对照表
     **/
    
    function gaLinkToCategoryFunc(){
        var category = 'page',pathname = location.pathname;
        switch(pathname){
            case '/mobile/touch/recommend_feed':
                category = 'home_Recommend_'+_platform;
                break;
            case '/mobile/touch/follow_feed':
                category = 'home_Followed_'+_platform;
                break;
            case '/mobile/touch/discovery':
                category = 'discovery_'+_platform;
                break;
            case '/mobile/touch/user_center':
                category = 'userCenter_'+_platform;
                break;
            case '/mobile/touch/note_detail':
                category = 'noteDetail_'+_platform;
                break;
            case '/mobile/touch/magazine_detail':
                category = 'magazineDetail_'+_platform;
                break;
            case '/mobile/touch/collection_detail':
                category = 'collectionDetail_'+_platform;
                break;
            case '/mobile/touch/bloggers_feed':
                category = 'bloggersFeed_'+_platform;
                break;
            case '/mobile/touch/bloggers_list':
                category = 'bloggersList_'+_platform;
                break;
        }
        return category;
    }

    /**
     ** 获取适合不同环境下的href，是否需要让客户端新窗口打开
     **/
    
    function getResponseHrefFunc(href){
        //过滤登录的taoo
        if(href.match(/^taoo(web)?:/)){
            return href;
        }
        if(!href.match(/^http(s)?:\/\//) && !href.match(/^taooweb:\/\//)){
            href = location.origin+href;
        }
        var curLink = location.href,finalLink = '';
        //安卓中的，推荐页、关注页、发现页新打开webview
        if(_platform == 'appAndroid' && curLink.match(/mobile\/touch\/(recommend_feed|follow_feed|discovery|user_center)/)){
            if(curLink.match(/mobile\/touch\/user_center/)){
                var uId = curLink.match(/u_id=(\d+)/) ? curLink.match(/u_id=(\d+)/)[1] : '';
                if(uId  == _cookieUid){
                    finalLink = 'taooweb://page/web?url='+encodeURIComponent(href);
                }else{
                    finalLink = href;
                }
            }else{
                finalLink = 'taooweb://page/web?url='+encodeURIComponent(href);
            }
        }   
        else
            finalLink = href;

        return finalLink;
    }


    /**
     ** 吊起安卓客户端登录成功的回调里，需要js设置对应域名下的cookie，来解决ajax请求带不上登录状态的问题
     ** callback函数里面不能有注释，否则安卓客户端无法执行。
     **/

    function successLoginCallback(){
        var callback = function(flag){
            if(flag == 'success'){
                var curDomain = location.hostname.match(/(\..+)/);
                var  cookieExpires = $.getCookie('expires');
                if((new Date(cookieExpires)) != 'Invalid Date'){
                    var expiresDays = ((new Date(cookieExpires)).getTime() - (new Date()).getTime()) / (1000*60*60*24);
                }else{
                    var expiresDays = 30;
                }
                var tk = $.getCookie('tk');
                    account = $.getCookie('account'),
                    platform = $.getCookie('platform'),
                    uid = $.getCookie('uid'),
                    APPID = $.getCookie('APPID'),
                    PHPSESSID = $.getCookie('PHPSESSID'),
                    resolution = $.getCookie('resolution'),
                    client_v = $.getCookie('client_v'),
                    expires = expiresDays,
                    domain = $.getCookie('domain') ? $.getCookie('domain') : curDomain;

                tk && $.setCookie('tk',tk,expires,'/',domain);
                account && $.setCookie('account',encodeURIComponent(account),expires,'/',domain);
                platform && $.setCookie('platform',platform,expires,'/',domain);
                uid && $.setCookie('uid',uid,expires,'/',domain);
                PHPSESSID && $.setCookie('PHPSESSID',PHPSESSID,expires,'/',domain);
                APPID && $.setCookie('APPID',APPID,expires,'/',domain);
                resolution && $.setCookie('resolution',resolution,expires,'/',domain);
                client_v && $.setCookie('client_v',client_v,expires,'/',domain);
            }
            else{
                alert('登录失败～');
            }
        }
        TaooWebView.login.setLogin(callback);
    }

    return F.parseCard
});







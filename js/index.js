/**
 * Created by Administrator on 2017/4/13.
 */

$(function(){

    /*导航栏固定*/
    /*(function(){
        $(window).scroll(function(){
            var docScrollTop = $(document).scrollTop();
            if(docScrollTop >= $("#nav").height()){
                $("#nav").css({
                    "position":"fixed",
                    "top":0,

                });
                $("#search").css("margin-top",10);
            }else {
                $("#nav").css({
                    "position":"relative"
                });
                $("#search").css("margin-top",20);
            }
        })
    })();*/

    /*搜索切换*/
    (function(){
        var aLi = $('#search_menu li');
        var iNow = 0;
        var oText = $('#search_text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        oText.val(arrText[iNow]);
        aLi.each(function(index,ele){
            $(this).click(function(){
                aLi.removeClass('active');
                aLi.attr('class','gradient');
                $(this).attr('class','active');
                iNow = index;
                oText.val(arrText[iNow]);
            })
        });
        /*搜索框获取焦点事件*/
        oText.focus(function(){
            if(oText.val() == arrText[iNow]){
                $(this).val('');
            }
        });
        oText.blur(function(){
            if($(this).val() ==''){
                $(this).val(arrText[iNow]);
            }
        })
    })();

    /*update文字滚动*/
    (function(){
        var oUl = $('.search_update').find('.update_wrap ul');

        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'丹丹', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'娟娟', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'婷婷', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'丽丽', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'欢欢', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'美美', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
        ];

        var str = '';
        var oBtnUp = $('#updateUpBtn');
        var oBtnDown = $('#updateDownBtn');
        var  oDiv = $('.search_update');
        var iNow =0;
        var timer = null;
        for(var i =0;i<arrData.length;i++){
            str += '<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'</a></li>';
        }
        oUl.html(str);
        var iH = oUl.find('li').height();
        autoPlay();
        oBtnUp.click(function(){
            doMove(-1);
        });
        oBtnDown.click(function(){
            doMove(1);
        });
        function doMove(num){
            iNow +=num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow =0;
            }
            if(iNow > 0){
                iNow = -(arrData.length-1);
            }
            oUl.stop().animate({'top':iNow*iH},2000,'elasticOut');
        }

        oDiv.hover(function (){
            clearInterval( timer );
        }, autoPlay);
        function autoPlay(){
            timer = setInterval(function(){
                doMove(-1);
            },3000)
        }
    })();

    /*options选项卡切换*/
    (function(){
        fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
        fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
        fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
        fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );

        function fnTab( oNav, aCon, sEvent ) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function (index){

                $(this).on(sEvent, function (){
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class', 'triangle_down_gray');
                    $(this).find('a').attr('class', 'triangle_down_red');

                    aCon.hide().eq( index ).show();
                });

            });
        }
    })();

    /*图片替换*/
    (function(){
        var oDiv = $('#recommend_fade');
        var aUlLi = oDiv.find('ul li');
        var aOlLi = oDiv.find('ol li');
        var oP = oDiv.find('p');
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var iNow = 0;
        var timer = null;

        aOlLi.click(function(){
            iNow =$(this).index();
            fnFade();
        });
        fnFade();
        autoPlay();
        function fnFade(){
            aUlLi.each(function(i){
                if(iNow != i){
                    aUlLi.eq(i).fadeOut().css('z-index',1);
                    aOlLi.eq(i).removeClass('active');
                }else{
                    aUlLi.eq(i).fadeIn().css('z-index',2);
                    aOlLi.eq(i).addClass('active');
                }
                oP.text(arr[iNow]);
            })
        }
        function autoPlay(){
            timer = setInterval(function(){
                iNow++;
                iNow %= arr.length;
                fnFade();
            },3000)
        }

    })();

    /*BBS高亮显示*/
    (function (){
        $('.bbs ol li').mouseover(function (){
            $('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
        });
    })();

    /*日历提示*/
    (function(){
        var aSpan = $('.calendar h3 span');
        var aImg = $('.calendar .img');
        var oPrompt = $('.today_info');
        var oImg = oPrompt.find('img');
        var oStrong = oPrompt.find('strong');
        var oP = oPrompt.find('p');

        aImg.hover(function(){
            var iTop = $(this).parent().position().top-30;
            var iLeft = $(this).parent().position().left+55;
            var index = $(this).parent().index() % aSpan.length; //当前横排第几个
            oPrompt.show().css({
                'left':iLeft,
                'top':iTop
            });
            oP.text($(this).attr('info'));
            oImg.attr('src',$(this).attr('src'));
            oStrong.text(aSpan.eq(index).text());
        },function(){
            oPrompt.hide();
        })
    })();

    /*图片鼠标经过提示效果*/
    (function(){
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];
        $('.hot_area li').mouseover(function (){

            if ( $(this).index() == 0 ) return;

            $('.hot_area li p').remove();

            $(this).append('<p style="width:'+ ($(this).width()) +'px; height:'+ ($(this).height()) +'px;">'+ arr[$(this).index()] +'</p>');
        });
    })();
});
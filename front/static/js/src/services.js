kwaderno
    .service('nicescrollService', function() {
        var ns = {};
        ns.niceScroll = function(selector, color, cursorWidth) {
            $(selector).niceScroll({
                cursorcolor: color,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorwidth: cursorWidth,
                bouncescroll: true,
                mousescrollstep: 100,
                autohidemode: false
            });
        }
        return ns;
    })

    .service('growlService', function(){
        var gs = {};
        gs.growl = function(message, type) {
            if(document.getElementsByClassName('growl-animated').length != 0){
                document.getElementsByClassName('growl-animated')[0].remove();
            }
            $.growl({
                message: message
            },{
                z_index: 1080,
                type: type,
                allow_dismiss: true,
                mouse_over: "pause",
                label: 'Cancel',
                className: 'btn-xs btn-inverse',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                delay: 2500,
                spacing: 10,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                offset: {
                    x: 20,
                    y: 50
                }
            });
        }

        return gs;
    })

    .service('number',function(){
        var format  =   {};
            format.format   =   function(number, decimals, dec_point, thousands_sep){
                number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                var n = !isFinite(+number) ? 0 : +number,
                    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                    s = '',
                    toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + (Math.round(n * k) / k).toFixed(prec);
                    };
                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                if (s[0].length > 3) {
                    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                }
                if ((s[1] || '').length < prec) {
                    s[1] = s[1] || '';
                    s[1] += new Array(prec - s[1].length + 1).join('0');
                }
                return s.join(dec);
            }
            format.filesize =   function fileSizeFormat(bytes){
                if (bytes >= 1073741824){ bytes = number_format(bytes / 1073741824, 2) + ' GB'; }
                else if (bytes >= 1048576){ bytes = number_format(bytes / 1048576, 2) + ' MB'; }
                else if (bytes >= 1024){ bytes = number_format(bytes / 1024, 2) + ' KB'; }
                else if (bytes > 1){ bytes = bytes + ' bytes'; }
                else if (bytes == 1){ bytes = bytes + ' byte'; }
                else{ bytes = '0 bytes'; }
                return bytes;
            }
            format.ago      =   function(i){
                var d       =   new Date();
                var time    =   d.getTime().toString();
                var sub     =   parseInt(time.substr(0,10));
                var m       =   (sub - i);
                var o       =   "just now";
                var t       =   { "year":31556926, "month":2629744, "week":604800, "day":86400, "hour":3600, "min":60, "sec":1 };
                for(var i in t){
                    if(t[i] <= m){
                        var v = Math.floor(m/t[i]);
                            o = v+" "+i+(v == 1?"":"s")+" ago";
                        break;
                    }
                }
                return o;
            }
            return format;
    })

    .service('validate',function(){
        var em  =   {};
            em.email    =   function(email){
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
            em.website  =   function(webUrl){
                var url = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
                return url.test(webUrl);
            }
            em.password =   function(pass){
                var pd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                return pd.test(pass);
            }
          return em;
    })

    .service('sidebars',['$timeout',function($timeout){
        var fn          =   {};
            fn.show     =   function(){
                var h   =   window.innerHeight;
                var w   =   window.innerWidth;
                if(w < 1025){
                    if(angular.element('.ms-menu').is(':hidden')){
                        angular.element('.ms-menu').removeClass('hidden');
                        $('.ms-menu').animate({
                            'height':(h - 47) +'px',
                            'overflow':'auto',
                            'width':'250px',
                        }, 50,function(){
                            setTimeout(function(){
                                angular.element('.desc-name').removeClass('hidden');
                            }, 200);
                        });
                    }
                }
                if(w <= 767){
                    angular.element('.ms-menu').css({
                        'height':(h - 47) +'px',
                        'overflow':'auto',
                        'width':'250px'
                    });
                }
                if(w > 767){
                    angular.element('.list-navigator').css({
                        'height':(h - 47) +'px',
                        'overflow':'hidden',
                        'overflow-y': 'hidden',
                        'overflow-x': 'hidden'
                    });
                }
                angular.element('#hidden-right').addClass('hidden');
                angular.element('#hidden-left').removeClass('hidden');

                angular.element('.ms-menu').css({
                    'width':'250px'
                });
                angular.element('#hidden-class').removeClass('pull-left').addClass('pull-right');
                if(document.querySelectorAll('.ms-menu .nicescroll-rails').length != 0){
                    document.querySelectorAll('.ms-menu .nicescroll-rails')[0].classList.add('hidden');
                }
                $timeout(function(){
                    if(w >= 1025){angular.element('.desc-name').removeClass('hidden');}
                    angular.element('#profile-sidebar-caret,#tool-caret').removeClass('hidden');
                    angular.element('#profile-sidebar-menu,#tools-menu-dropdown').css('pointer-events','auto');
                },120);
            }
            fn.hide     =   function(){
                var w   =   window.innerWidth;
                if(document.querySelectorAll('.ms-menu .nicescroll-rails').length != 0){
                    document.querySelectorAll('.ms-menu .nicescroll-rails')[0].classList.add('hidden');
                }
                angular.element('.list-navigator').scrollTop
                angular.element('.main-menu').css('display','none');
                angular.element('#profile-sidebar-caret,#tool-caret').addClass('hidden');
                angular.element('#profile-sidebar-menu,#tools-menu-dropdown').css('pointer-events','none');
                angular.element('.list-navigator').removeAttr('style');
                angular.element('.ms-menu').removeAttr('style');
                angular.element('#hidden-right').removeClass('hidden');
                angular.element('#hidden-left').addClass('hidden');
                angular.element('.desc-name').addClass('hidden');
                angular.element('#hidden-class').removeClass('pull-right').addClass('pull-left');
                if(w < 1025){
                    angular.element('.ms-menu').css({'width':'0'},function(){});
                    var timer = setTimeout(function(){
                        angular.element('.ms-menu').addClass('hidden');
                        clearTimeout(timer);
                    },200)

                }
            }
        return fn;
    }])

    .service('sidebar',['$timeout',function($timeout){
        var fn          =   {};
            fn.show     =   function(){
                var h   =   window.innerHeight;
                var w   =   window.innerWidth;
                $('#ms-menu-parent').css({'width': '250','height':(h - 10) +'px','overflow-x': 'none !important'});
                if(w < 1025){
                    angular.element('.ms-menu').removeClass('hidden');
                    $('.ms-menu').animate({
                        'width':'250px'
                    }, 50,function(){
                        setTimeout(function(){
                            angular.element('.desc-name,.p-s-d-m').removeClass('hidden');
                        }, 200);
                    });
                }
                else{
                    angular.element('.ms-menu').removeClass('hidden');
                    angular.element('.ms-menu').css({
                        'width':'250px'
                    });
                }

                angular.element('#hidden-right').addClass('hidden');
                angular.element('#hidden-left').removeClass('hidden');


                angular.element('#hidden-class').removeClass('pull-left').addClass('pull-right');
                if(document.querySelectorAll('.ms-menu .nicescroll-rails').length != 0){
                    document.querySelectorAll('.ms-menu .nicescroll-rails')[0].classList.add('hidden');
                }
                $timeout(function(){
                    if(w >= 1025){angular.element('.desc-name,.p-s-d-m').removeClass('hidden');}
                    angular.element('#profile-sidebar-caret,#tool-caret').removeClass('hidden');
                    angular.element('#profile-sidebar-menu,#tools-menu-dropdown').css('pointer-events','auto');
                },120);
            }
            fn.hide     =   function(){
                var w   =   window.innerWidth;
                if(document.querySelectorAll('.ms-menu .nicescroll-rails').length != 0){
                    document.querySelectorAll('.ms-menu .nicescroll-rails')[0].classList.add('hidden');
                }
                /*angular.element('.list-navigator').scrollTop*/
                /*angular.element('.main-menu').css('display','none');*/
                angular.element('#profile-sidebar-caret,#tool-caret').addClass('hidden');
                /*angular.element('#profile-sidebar-menu,#tools-menu-dropdown').css('pointer-events','none');*/
                angular.element('.list-navigator').removeAttr('style');
                angular.element('.ms-menu').removeAttr('style');
                angular.element('#hidden-right').removeClass('hidden');
                angular.element('#hidden-left').addClass('hidden');
                angular.element('.desc-name,.p-s-d-m').addClass('hidden');
                angular.element('#hidden-class').removeClass('pull-right').addClass('pull-left');
                if(w < 1025){
                    $('.ms-menu').animate({'width': '0px'},50);
                    var timer = setTimeout(function(){
                        angular.element('.ms-menu').addClass('hidden');
                        clearTimeout(timer);
                    },200)

                }
                $('#ms-menu-parent').animate({
                    'width': '63px'
                },200);
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    var sidebarTimer = setTimeout(function(){
                        clearTimeout(sidebarTimer);
                        $('#ms-menu-parent').css('overflow','hidden');
                    },1000);
                }
            }
        return fn;
    }])

    .service('paginate',function(){
        var tr  =   {};
            tr.pager    =   function(data, pager, functionToCall){
                var pageHtml    =   '';
                var pmin        =   0;
                var pmax        =   0;
                var adjacents   =   1;
                pageHtml += '<li ng-if="winWidth >= 767"><span>Page '+data.currentPage+' of '+data.total+'</span></li>';
                /*pageHtml += '<li class="hidden-xs"><select style="padding: 3px 10px;cursor: pointer;border: 1px solid #ddd;height: 30px;min-width: 30px;width: auto;text-align: center" class="form-control" id="paginate-select" >';
                for(var k = 1; k < data.total + 1; k++){
                    if(data.currentPage == k){
                        pageHtml += '<option value="'+k+'" data-ng-model="pager.selectpage" selected="selected" data-ng-change="'+functionToCall+'('+k+',$event)">'+k+'</option>';
                    }
                    else{
                        pageHtml += '<option value="'+k+'" data-ng-model="pager.selectpage" data-ng-change="'+functionToCall+'('+k+',$event)">'+k+'</option>';
                    }
                }
                pageHtml += '</select></li>'; */
                if(data.currentPage == '1'){
                    pageHtml+='<li class="disabled"><a>&laquo;</a></li>';
                }
                else{
                    pageHtml+='<li><a style="cursor: pointer;" data-ng-click="'+functionToCall+'('+data.prevousPage+',$event)">&laquo;</a></li>';
                }
                if(pager > (adjacents + 1)) {
                    pageHtml+='<li><a style="cursor: pointer;" data-ng-click="'+functionToCall+'(1,$event)">1</a></li>';
                }
                if(pager>(adjacents)){
                    pageHtml+='<li class="hidden-xs"><span>...</span></li>';
                }
                pmin = (pager > adjacents) ? (pager-adjacents) : 1;
                pmax = (pager < (data.total - adjacents)) ? (pager + adjacents) : data.total
                for(var i = pmin; i <= pmax; i++) {
                    if(i == data.currentPage) {
                        pageHtml +='<li class="active"><a style="cursor: pointer;"><span>'+i+'</span></a></li>';
                    }
                    else if(i==1) {
                        pageHtml+='<li class="hidden-xs"><a style="cursor: pointer;" data-ng-click="'+functionToCall+'('+i+',$event)">'+i+'</a></li>';
                    }
                    else{
                        pageHtml+='<li class="hidden-xs"><a style="cursor: pointer;" data-ng-click="'+functionToCall+'('+i+',$event)">'+i+'</a></li>';
                    }
                }
                if(pager < ( (data.total - adjacents) - 1)) {
                    pageHtml+='<li class="hidden-xs"><span>...</span></li>';
                }
                if(pager < (data.total-adjacents)) {
                    pageHtml+='<li><a style="cursor: pointer;" data-ng-click="'+functionToCall+'('+data.total+',$event)">'+data.total+'</a></li>';
                }
                if(data.currentPage == data.noOfPage){
                    pageHtml+='<li class="disabled"><a>&raquo;</a></li>';
                }
                else{
                    pageHtml+='<li><a style="cursor: pointer;" data-ng-click="'+functionToCall+'('+data.nextPage+',$event)">&raquo;</a></li>';
                }
                return pageHtml;
            }
        return tr;
    })

    .service('helper',['validate',function(validate){
        var help            =   {};
            help.toHtml     =   function(str){
                return str
                  .replace(/&amp;/g, "&")
                  .replace(/&#38;/g, "&")
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/&quot;/g, '"')
                  .replace(/&#34;/g, '"')
                  .replace(/&#039;/g, "'")
                  .replace(/&#39;/g, "'");

            };
            help.escapeHtml =   function(str){
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                return str.replace(/[&<>"']/g, function(m) {
                    return map[m];
                });
            }
            help.nl2br      =   function(str, is_xhtml){
                var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
                return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
            }
            help.hide       =   function(el){
                if(typeof el === 'object'){
                    el.forEach(function(e,i){
                        angular.element(e).addClass('hidden');
                    })
                }
                else{
                    angular.element(el).addClass('hidden');
                }
            }
            help.show       =   function(el){
                if(typeof el === 'object'){
                    el.forEach(function(e,i){
                        angular.element(e).removeClass('hidden');
                    });
                }
                else{
                    angular.element(el).removeClass('hidden');
                }
            }
            help.empty      =   function(el){
                if(typeof el === 'object'){
                    el.forEach(function(e,i){
                        angular.element(e).val('');
                    });
                }
                else{
                    angular.element(el).val('');
                }
            }
            help.print      =   function(ev,el){
                var toHide  =   ['.content-page','.block-header','#block-header'];
                help.hide(toHide);
                angular.element(el).removeClass('hidden');
                window.print();
                help.show(toHide);
            }
            help.filter     =   function(input, type, el){
                if(type == 'alnum'){
                    return input.replace(/[`~!@#$%^&*|+\=?;:,<>\{\}\[\]\\\/]/gi,'');
                }
                else if(type == 'phone'){
                    return input.replace(/[`~!@#$%^&*_|\=?;:'",a-zA-Z<>\{\}\[\]\\]/gi,'');
                }
                else if(type == 'address'){
                    return input.replace(/[`~!$%^*_|\=?;:'"<>\{\}\[\]\\\/]/gi,'');
                }
                else if(type == 'number'){
                    return input.replace(/[^0-9]+/g, "");
                }
                else if(type == 'accountNo'){
                    return input.replace(/[^0-9_-]+/g, "");
                }
                else if(type == 'srp'){
                    return input.replace(/[^0-9.]+/g, "");
                }
                else if(type == 'amount'){
                    return input.replace(/[^0-9.,]+/g, "");
                }
                else{
                    return input.replace(/[`~!@#$%^&*|+\=?;:,<>\{\}\[\]\\\/]/gi,'');
                }

            }
            help.makeLink   =   function(input){
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                var extendText  =   help.makeIcon(input);
                return extendText.replace(exp,"<a href='$1'>$1</a>");
            }
            help.makeIcon   =   function(text){
                var newText =   help.toHtml(text);
                var rep =   newText
                            /*>:/*/
                            .replace(/\>\:\//ig,'<i class="emoticon-big icon-bring-it" title="Bring It '+help.escapeHtml('>:/')+'" data-value="'+help.escapeHtml('>:/')+'"></i>')
                            /*:d/*/
                            .replace(/\:D\//ig,'<i class="emoticon-big icon-dancing" title="Dancing"></i>')
                            /*:)>-*/
                            .replace(/\:\)\>\-/ig,'<i class="emoticon-big icon-peace" title="Peace"></i>')
                            /*=:)*/
                            .replace(/\=\:\)/ig,'<i class="emoticon icon-bug" title="Bug"></i>')
                            /* *-:) */
                            .replace(/\*\-\:\)/ig,'<i class="emoticon-big icon-idea" title="Idea"></i>')
                            /*:)*/
                            .replace(/\:\)/ig,'<i class="emoticon icon-smile" title="Smile"></i>')
                            /*:-)*/
                            .replace(/\:\-\)/ig,'<i class="emoticon icon-smile" title="Smile"></i>')
                            /*(y)*/
                            .replace(/\(y\)/ig,'<i class="uk-icon-thumbs-up" style="color:#1E8A9B; font-size: 20px;" title="Thumbs Up"></i>')
                            /*(n)*/
                            .replace(/\(n\)/ig,'<i class="uk-icon-thumbs-down" style="color:#1E8A9B; font-size: 20px;" title="Thumbs Down"></i>')
                            /*:(*/
                            .replace(/\:\(/ig,'<i class="emoticon icon-sad"  title="Sad"></i>')
                            /*;)*/
                            .replace(/\;\)/ig,'<i class="emoticon icon-wink" title="Wink"></i>')
                            /*:d*/
                            .replace(/\:D/ig,'<i class="emoticon icon-big-smile" title="Big Smile"></i>')
                            /*:/d*/
                            .replace(/\:\/D/ig,'<i class="emoticon-big icon-big-hug" title="Big Hug"></i>')
                            /*:-/*/
                            .replace(/\:\-\//ig,'<i class="emoticon icon-confused" title="Confused"></i>')
                            /*:x*/
                            .replace(/\:x/ig,'<i class="emoticon icon-love-struck" title="Love Struck"></i>')
                            /*:p*/
                            .replace(/\:p/ig,'<i class="emoticon icon-tongue" title="Tongue"></i>')
                            /* :-* */
                            .replace(/\:\-\*/ig,'<i class="emoticon icon-kiss" title="Kiss"></i>')
                            /*=((*/
                            .replace(/\=\(\(/ig,'<i class="emoticon icon-broken" title="Broken Hearted"></i>')
                            /* :-o */
                            .replace(/\:\-O/ig,'<i class="emoticon icon-surprise" title="Surprise"></i>')
                            /*x(*/
                            .replace(/\x\(/ig,'<i class="emoticon-big icon-angry" title="Angry"></i>')
                            /*:>*/
                            .replace(/\:\>/ig,'<i class="emoticon icon-smug" title="Smug"></i>')
                            /*b-)*/
                            .replace(/B\-\)/ig,'<i class="emoticon icon-coll" title="Cool"></i>')
                            /*:-r*/
                            .replace(/\:\-r/ig,'<i class="emoticon icon-worried" title="Worried"></i>')
                            /*>:*/
                            .replace(/\>\:/ig,'<i class="emoticon icon-devil" title="Devil"></i>')
                            /*:<(*/
                            .replace(/\:\<\(/ig,'<i class="emoticon-big icon-cry" title="Cry"></i>')
                            /*:->*/
                            .replace(/\:\-\>\)/ig,'<i class="emoticon icon-laughing" title="Laughing"></i>')
                            /*:|*/
                            .replace(/\:\|/ig,'<i class="emoticon icon-straight-face" title="Straight Face"></i>')
                            /*:/>*/
                            .replace(/\:\/\>/ig,'<i class="emoticon icon-eyebrow" title="Eyebrow"></i>')
                            /*=))*/
                            .replace(/\=\)\)/ig,'<i class="emoticon-big icon-roll" title="Rolling"></i>')
                            /*:o-*/
                            .replace(/\:\O-\)/ig,'<i class="emoticon-big icon-angel" title="Angel"></i>')
                            /*:-b*/
                            .replace(/\:\-B/ig,'<i class="emoticon icon-nerd" title="Nerd"></i>')
                            /*:;*/
                            .replace(/\:\;/ig,'<i class="emoticon icon-wait" title="Waiting"></i>')
                            /*i-)*/
                            .replace(/I\-\)/ig,'<i class="emoticon icon-sleepy" title="Sleepy"></i>')
                            /* 8-|*/
                            .replace(/8\-\|/ig,'<i class="emoticon icon-rolling-eyes" title="Rolling Eyes"></i>')
                            /*l-)*/
                            .replace(/L\-\)/ig,'<i class="emoticon-big icon-loser" title="Loser"></i>')
                            /*:-&*/
                            .replace(/\:\-\&/ig,'<i class="emoticon icon-sick" title="Sick"></i>')
                            /*:-$*/
                            .replace(/\:\-\$/ig,'<i class="emoticon icon-don" title="Don"></i>')
                            /*[-(*/
                            .replace(/\[\-\(/ig,'<i class="emoticon icon-not-talking" title="Not Talking"></i>')
                            /*:o)*/
                            .replace(/\:\O\)/ig,'<i class="emoticon icon-clown" title="clown"></i>')
                            /* 8-}*/
                            .replace(/\8\-\}/ig,'<i class="emoticon icon-silly" title="Silly"></i>')
                            /*<:-p*/
                            .replace(/\<\:\-P/ig,'<i class="emoticon-big icon-party" title="Party"></i>')
                            /*(|:*/
                            .replace(/\(\|\:/ig,'<i class="emoticon icon-yawn" title="Yawn"></i>')
                            /*=P~*/
                            .replace(/\=P\~/ig,'<i class="emoticon icon-drawling" title="Drawling"></i>')
                            /*:-?*/
                            .replace(/\:\-\?/ig,'<i class="emoticon icon-thinking" title="Thinking"></i>')
                            /*#-o*/
                            .replace(/\#\-\o/ig,'<i class="emoticon icon-unknown" title=""></i>')
                            /*=d>*/
                            .replace(/\=D\>/ig,'<i class="emoticon icon-applause" title="Applause"></i>')
                            /*:-SS*/
                            .replace(/\:\-SS/ig,'<i class="emoticon-big icon-nail-biting" title="Nail Biting"></i>')
                            /*@-)*/
                            .replace(/\@\-\)/ig,'<i class="emoticon icon-hypnotized" title="Hypnotized"></i>')
                            /*:^o*/
                            .replace(/\:\^\o/ig,'<i class="emoticon icon-liar" title="Liar"></i>')
                            /*:-w*/
                            .replace(/\:\-w/ig,'<i class="emoticon icon-waiting" title="Waiting"></i>')
                            /*:-<*/
                            .replace(/\:\-\</ig,'<i class="emoticon icon-sigh" title="Sigh"></i>')
                            /*<)*/
                            .replace(/\<\)/ig,'<i class="emoticon icon-cowboy" title="Cowboy"></i>')
                            /*:@)*/
                            .replace(/\:\@\)/ig,'<i class="emoticon icon-pig" title="Pig"></i>')
                            /*3:-#*/
                            .replace(/3\:\-\#/ig,'<i class="emoticon icon-cow" title="Cow"></i>')
                            /*|:*/
                            .replace(/\|\:/ig,'<i class="emoticon icon-monkey" title="Monkey"></i>')
                            /*:~>*/
                            .replace(/\:~\>/ig,'<i class="emoticon icon-chiken" title="Chiken"></i>')
                            /*@};-*/
                            .replace(/\@\}\;\-/ig,'<i class="emoticon icon-rose" title="Rose"></i>')
                            /*%%-*/
                            .replace(/\%\%\-/ig,'<i class="emoticon icon-good-luck" title="Good Luck"></i>')
                            /*(~~)*/
                            .replace(/\(\~\~\)/ig,'<i class="emoticon icon-pumpkin" title="Pumpkin"></i>')
                            /*~o)*/
                            .replace(/\~\O\)/ig,'<i class="emoticon icon-coffee" title="Coffee"></i>')
                            /*8-x*/
                            .replace(/\8\-\X/ig,'<i class="emoticon icon-skull" title="Skull"></i>')
                            /*>-)*/
                            .replace(/\>\-\)/ig,'<i class="emoticon icon-alien" title="Alien"></i>')
                            /*:-l*/
                            .replace(/\:\-\L/ig,'<i class="emoticon icon-frustrated" title="Frustrated"></i>')
                            /*$-)*/
                            .replace(/\$\-\)/ig,'<i class="emoticon icon-money" title="Money"></i>')
                            /*:-"*/
                            .replace(/\:\-\'/ig,'<i class="emoticon icon-whistling" title="Whistling"></i>')
                            /*b-(*/
                            .replace(/b\-\(/ig,'<i class="emoticon icon-beat-up" title="Beat Up"></i>')
                            /*[-x*/
                            .replace(/\[\-\X/ig,'<i class="emoticon-big icon-shame" title="Shame"></i>');
                return rep;

            }
            help.isNumeric  =   function(number){
                return !isNaN(parseFloat(number)) && isFinite(number);
            }
            help.validate   =   function(){
                angular.element('input,textarea,select').on('blur change',function(ev){
                    var type    =   ev.target.type;
                    var isRequired  =   ev.target.attributes['required'];
                    if(typeof isRequired != 'undefined'){
                        var parent  =   ev.target.parentNode;
                        if(parent.parentNode.children.length > 1){
                            if(parent.parentNode.children[1] != 'undefined' && parent.parentNode.children[1].classList.contains('error-label-message')){
                                if(parent.parentNode.children[1].nodeName == 'LABEL'){
                                    parent.parentNode.removeChild(parent.parentNode.children[1]);
                                }
                            }
                        }
                        if(ev.target.value.length == 0){
                            parent.classList.add('has-error');
                            if(type === 'select-one'){
                                if(ev.target.classList.contains('selectized')){
                                    ev.target.nextSibling.firstChild.classList.add('has-selectize-error');
                                }
                            }
                            var append  =   parent.parentNode.appendChild(document.createElement('label'));
                                append.innerHTML    =   'This field is required.';
                                append.style.color  =   '#f44336';
                                append.classList    =   'error-label-message';

                        }
                        else{
                            if(type == 'email'){
                                if(!validate.email(ev.target.value)){
                                    parent.classList.add('has-error');
                                    var append  =   parent.parentNode.appendChild(document.createElement('label'));
                                        append.innerHTML    =   'Please enter a valid email.';
                                        append.style.color  =   '#f44336';
                                        append.classList    =   'error-label-message';
                                }
                                else{
                                    parent.classList.remove('has-error');
                                }
                            }
                            else if(type == 'select-one'){
                                if(ev.target.classList.contains('selectized')){
                                    ev.target.nextSibling.firstChild.classList.remove('has-selectize-error');
                                }
                            }
                            else{
                                parent.classList.remove('has-error');
                            }
                        }
                    }
                });
            }
            help.removeValidate =   function(el){
                angular.element(el).find('.has-error').removeClass('has-error');
                angular.element(el).find('.error-label-message').remove();
                angular.element(el).find('.has-selectize-error').removeClass('has-selectize-error');
            }
            help.getParent      =   function(parentNode, childeNode, type){
                var obj =   childeNode.parentNode;
                if(type == 'tag' || type == null){
                    while(obj.tagName != parentNode){
                        obj =   obj.parentNode;
                    }
                }
                else if(type == 'id'){
                    while(obj.id != parentNode){
                        obj =   obj.parentNode;
                    }
                }
                else if(type == 'class'){
                    while(obj.classList.contains(parentNode) === false){
                        obj =   obj.parentNode;
                    }
                }
                return obj;
            }
            help.in_array       =   function(needle, haystack) {
                //needle is the one to be search
                //haystack is the array
                for(var i in haystack) {
                    if(haystack[i] == needle) return true;
                }
                return false;
            }
            help.validExtension =   function(ext){
                var listExt =   array = [
                    /* Vid Allowed Extensions */
                    'wmv',
                    'avi',
                    'mp4',
                    'mpg',
                    'mov',
                    'flv',
                    '3gp',
                    /* Image Allowed Extensions */
                    'tif',
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    /* Documents Files */
                    'accdb',
                    'accdt',
                    'doc',
                    'docm',
                    'docx',
                    'dot',
                    'dotm',
                    'dotx',
                    'mdb',
                    'mpd',
                    'mpp',
                    'mpt',
                    'oft',
                    'one',
                    'onepkg',
                    'pot',
                    'potx',
                    'pps',
                    'ppsx',
                    'ppt',
                    'pptm',
                    'pptx',
                    'pst',
                    'pub',
                    'snp',
                    'thmx',
                    'vsd',
                    'vsdx',
                    'xls',
                    'xlsm',
                    'xlsx',
                    /* Extended Documents*/
                    'ps',
                    'pages',
                    'pdf',
                    'csv',
                    'txt',
                    /* Compress and belong to this will belong to documents files*/
                    'jar',
                    'zip',
                    'tar',
                    'rar',
                    'gz',
                    'gzip',
                    'tgz'
                ];
                if(help.in_array(ext, listExt)){ return true; }
                else{ return false; }
            }
        return help;
    }])

    .service('storage',function(){
        var store           =   {};
            store.add       =   function(data,name){
                if(store.isExist(name)){ store.remove(name); }
                localStorage.setItem(name,JSON.stringify(data));
            }
            store.get       =   function(name){
                try{
                    return JSON.parse(localStorage.getItem(name));
                }
                catch(e){
                    return '';
                }

            }
            store.remove    =   function(name){
                if(store.isExist(name)){ localStorage.removeItem(name); }
            }
            store.isExist   =   function(name){
                var item    =   localStorage.getItem(name);
                if(item !== null){ return true; }
                else{ return false; }
            }
        return store;
    })

    .service('cookie',function(){
        var co = {};
            co.get  =   function(name){
                var re = new RegExp(name + "=([^;]+)");
                var value = re.exec(document.cookie);
                return (value != null) ? unescape(value[1]) : null;
            }
            co.set  =   function(name, value, days){
                var expires;
                if (days > 0 && days !== null){
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else { expires = ""; }
                document.cookie = name + "=" + value + expires + "; path=/";
            }
            co.remove   =   function(name){
                document.cookie = encodeURIComponent(name) + "=deleted; expires=" + new Date(0).toUTCString();
            }
        return co;
    })

    .service("httpRequest",['$http', '$q',function( $http, $q ) {
        var request =  {};
        request.search  =   function(url,params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: url,
                params:params,
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }
        return request;
    }])

    //============================================
    // Create modal
    //============================================
    .service('createModal',function($uibModal,$log){

        var open = false;

        var md  =   {};

        md.isOpen = function () {
            return open;
        }

        md.modalInstances   =   function(animation, size, backdrop, keyboard,content,templateUrl, scope){
            var modalInstance   =   $uibModal.open({
                animation   :   animation,
                templateUrl :   templateUrl,
                controller  :   'ModalInstanceCtrl',
                size        :   size,
                scope       :   scope,
                backdrop    :   backdrop,
                keyboard    :   keyboard,
                resolve     :   {
                    content :   function () {
                        return content;
                    }
                }
            });

            //Set open
            open = true;

            //Modal is closed/resolved/dismissed
            modalInstance.result.finally(function () {
                open = false;
            });

            return md;
        }
        return md;
    })

    //============================================
    // Swal prompt
    //============================================
    .service('prompt',function(){
        this.success = function(message){
           swal('Success',message,'success');
        }
        this.warning = function(message){
           swal('Oops',message,'warning');
        }
        this.error = function(message){
           swal('Error',message,'error');
        }
    })

    //============================================
    // search, delete array object
    //============================================
    .service('arrayFunc', function(){
        this.deleteByAttr = function(arr, attr, value){
          var i = arr.length;
          while(i--){
             if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value ) ){
                 arr.splice(i,1);
             }
          }
          return arr;
        }


        this.deleteByAttr2 = function(arr, attr, value){
          var i = arr.length;
          while(i--){
              if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)){
                  //content for logCompanyId
              }
              else if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === "0")){
                  //global admin content
              }
              else{
                  arr.splice(i,1);
              }

          }
          return arr;
        }

        this.searchByAttr = function(arr, attr, value){
          var i = arr.length;
          while(i--){
             if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value )){
                  return true;
             }
          }
          return false;
        }

        this.searchByAttrReturnIndex = function(arr, attr, value){
          var i = arr.length;
          while(i--){
             if( arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value )){
                  return i;
             }
          }
          return -1;
        }
    })

    //==========================================================================
    // Check input if null, empty or 0 supports text, mask and select input
    //==========================================================================
    .service('inputChecker', function(){
        this.textInput = function(fields){
            if(fields != undefined){
                var i   =   fields.length;
                var res =   false;
                while(i--){
                    var thisInput = angular.element("#"+fields[i]).val();

                    if(thisInput.trim().length == 0){
                        angular.element("#"+fields[i]+"Container").addClass('has-error');
                        res = true;
                    }
                    else{
                        angular.element("#"+fields[i]+"Container").removeClass('has-error');
                    }
                }
                return res;
            }
        }
        this.selectInput = function(fields){
            if(fields != undefined){
                var i =   fields.length;
                var res =   false;
                while(i--){
                    var thisInput = angular.element("#"+fields[i]).val();

                    if(thisInput == "" || thisInput == null || thisInput == "? string:undefined ?" || thisInput == "?" || thisInput == "? string:null ?"){
                        angular.element("#"+fields[i]+"Container").addClass('has-error');
                        res = true;
                    }
                    else{
                        angular.element("#"+fields[i]+"Container").removeClass('has-error');
                    }
                }
                return res;
            }
        }
        this.maskInput = function(fields){
            if(fields != undefined){
                var i =   fields.length;
                var res =   false;
                while(i--){
                    if(!$("#"+fields[i]).inputmask("isComplete") || $("#"+fields[i]).val() == ""){
                        angular.element("#"+fields[i]+"Container").addClass('has-error');
                        res = true;
                    }
                    else{
                        angular.element("#"+fields[i]+"Container").removeClass('has-error');
                    }
                }
                return res;
            }
        }
        this.emailInput = function(fields){
            if(fields != undefined){
                var i           =   fields.length;
                var res         =   false;
                while(i--){
                    var thisInput = angular.element("#"+fields[i]).val();

                    //email validation condition
                    var checkmail =   testMail(thisInput);
                    if(thisInput.trim().length == 0 || checkmail == false){
                        angular.element("#"+fields[i]+"Container").addClass('has-error');
                        res = true;
                    }
                    else{
                        angular.element("#"+fields[i]+"Container").removeClass('has-error');
                    }
                }
                return res;
            }
        }
        function testMail(email){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    })

    //==========================================================================
    // Check user session if exist or expired
    //==========================================================================
    .service('userSession', function($rootScope,$http,$state,webStorage,growlService,createModal){
        this.check = function(){
            var logout = function(){
                // Remove session data from the browser local storage
                if(webStorage.local.has('user-identity'))
                webStorage.local.remove('user-identity');

                // Redirect to login page
                $state.go('login');
            };

            var user_session = webStorage.local.get('user-identity');

            $http({
                method  :   'GET',
                url     :   apps_config.api_url +'/user/check-session-user',
                headers : {
                    'Content-Type'  :   'text/plain; charset=UTF-8',
                    'Authorization' :   this.getBearerToken(),
                },
                params  :   {
                    query	:	{
                        id              :   user_session.user_info.id,
                        crypt           :   user_session.user_info.crypt,
                        token           :   user_session.token.value,
                        is_refresh      :   user_session.token.refresh,
                        refresh_token   :   user_session.token.refreshvalue,
                    }
                }
            }).then(function successCallback(response){
                user_session.token  = response.data.data.token;
                webStorage.local.set('user-identity',user_session);
                return true;
            },function errorCallback(response){
                if(!createModal.isOpen()){
                    growlService.growl("Session expired.",'error');
                    createModal.modalInstances(true, 'm', 'static', false, $rootScope.modalContent, 'modalLogin', $rootScope);
                }
            });

            return false;
        }

        this.get = function(){
            return webStorage.local.get('user-identity');
        }

        this.getBearerToken = function(){
            return "Bearer " + webStorage.local.get('user-identity').token.value;
        }

        this.getUserId = function(){
            return webStorage.local.get('user-identity').user_info.id;
        }

        this.getUserCrypt = function(){
            return webStorage.local.get('user-identity').user_info.crypt;
        }

        this.getBranch = function(){
            return webStorage.local.get('user-identity').branch.id;
        }

        this.getBranchName = function(){
            return webStorage.local.get('user-identity').branch.name;
        }

        this.getBranchUrl = function(){
            return webStorage.local.get('user-identity').branch.url;
        }

        this.getBranchCode = function(){
            return webStorage.local.get('user-identity').user_info.branch_code;
        }

        this.getBranchAddress = function(){
            return webStorage.local.get('user-identity').user_info.branch_address;
        }
    })

    .service('webCamCapture', function(){
        this.capture = function(){

            var streaming = false,
                video = document.querySelector('#video'),
                canvas = document.querySelector('#canvas'),
                buttoncontent = document.querySelector('#buttoncontent'),
                photo = document.querySelector('#photo'),
                startbutton = document.querySelector('#startbutton'),
                width = 320,
                height = 0;

            navigator.getMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

            navigator.getMedia({
                    video: true,
                    audio: false
                },
                function(stream) {
                    if (navigator.mozGetUserMedia) {
                        video.mozSrcObject = stream;
                    }
                    else {
                        var vendorURL = window.URL || window.webkitURL;
                        video.src = vendorURL.createObjectURL(stream);
                    }
                    video.play();
                },
                function(err) {
                    console.log("An error occured! " + err);
                }
            );

            video.addEventListener('canplay', function(ev) {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);
                    video.setAttribute('width', width);
                    video.setAttribute('height', height);
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    streaming = true;
                }
            }, false);

            function takepicture() {
                video.style.display = "none";
                canvas.style.display = "block";
                startbutton.innerText= "RETAKE";
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(video, 0, 0, width, height);
                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
            }

            startbutton.addEventListener('click', function(ev) {
                if(startbutton.innerText==="CAPTURE"){
                    takepicture();
                }
                else{
                    video.style.display = "block";
                    canvas.style.display = "none";
                    startbutton.innerText= "CAPTURE";
                }
                ev.preventDefault();
            }, false);
        };
    })

    .service("getLookup",['$http', '$q', 'userSession',function( $http, $q ,userSession) {
        var request =  {};
        request.branch  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-branch-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{},
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.products  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/lookup/get-maintenance-product-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{},
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.medium  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/lookup/get-medium-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{},
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.loanRates  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/loan/get-product-rates-by-product',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{
                    query	:	{
                        product_id  :   params.product_id
                    }
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.loanRateDeduction  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/loan/get-product-rate-deduction-by-product-rate',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{
                    query	:	{
                        rate_id  :   params.rate_id
                    }
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.loanDocument  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/loan/get-product-document-by-product',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{
                    query	:	{
                        product_id  :   params.product_id
                    }
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.loanCompany  =   function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/loan/get-company-by-product',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{
                    query	:	{
                        product_id  :   params.product_id
                    }
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ) );
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.client_bank  =   function(params, method){

            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url +'/loan/get-client-bank-information',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                params:{
                    query	:	{
                        client_id  :   params.id,
                        client_type:   params.client_type,
                    }
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.payment_mode = function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-payment-mode-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.cash_account = function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-cash-account-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.refund_mode  = function(params,method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-refund-via-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.bank_list    = function(params,method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-bank-lookup',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        request.commission_class = function(params, method){
            var deferredAbort = $q.defer();
            // Initiate the AJAX request.
            var request = $http({
                method: method == null ? "GET" : method,
                url: apps_config.api_url + '/lookup/get-commission-class-list',
                headers :   {
                    'Content-Type'  :   'application/x-www-form-urlencoded; charset=UTF-8',
                    'Authorization' :   userSession.getBearerToken(),
                },
                timeout: deferredAbort.promise,
                ignoreLoadingBar: true
            });
            var promise = request.then(
                function( response ) {
                    return( response.data );
                },
                function( response ) {
                    return( $q.reject( "Something went wrong" ));
                }
            );
            promise.abort = function() {
                deferredAbort.resolve();
            };
            promise.finally(
                function() {
                    promise.abort = angular.noop;
                    deferredAbort = request = promise = null;
                }
            );
            return( promise );
        }

        return request;
    }])

    .service('filterData', function() {
        this.accountStatus = function(value) {
            if (value == 'A') {
                return "ACTIVE";
            }
            if (value == 'V') {
                return "PROVISION";
            }
            if (value == 'F') {
                return "FULLY PAID";
            }
            if (value == 'W') {
                return "WRITE-OFF";
            }
            if (value == 'O') {
                return "OVERDUE";
            }
            if (value == 'P') {
                return "PRETERMINATION";
            }
            if (value == 'R') {
                return "ROLL-OVER";
            }
        }
        this.loanStatus = function(value) {
            if (value == 'A') {
                return "APPROVED";
            }
            if (value == 'R') {
                return "FOR APPROVAL";
            }
            if (value == 'X') {
                return "CANCELLED";
            }
            if (value == 'P') {
                return "PENDING";
            }
        }
    })

    .filter('loan_type',function(){
       return function(value){
           if (value == '1') {
               return "13TH MONTH";
           }
           if (value == 'A') {
               return "ADDITIONAL";
           }
           if (value == 'B') {
                return "BUY OUT";
           }
           if (value == 'C') {
               return "ROLL-OVER";
           }
           if (value == 'E') {
               return "EXTENSION";
           }
           if (value == 'N') {
               return "NEW";
           }
           if (value == 'R') {
               return "RELOAN";
           }
           if (value == 'S') {
               return "SOON TO PENSION";
           }
           if (value == 'T') {
               return "ADDITIONAL EXTENSION";
           }
           if (value == 'W') {
               return "ROLL-OVER NEW"
           }
           if (value == 'X') {
               return "ROLL-OVER SSS/GSI";
           }
           if (value == 'Y') {
               return "RELOAN SSS/GSI";
           }
           if (value == 'Z') {
               return "RELOAN NEW";
           }
        }
    })

    .filter('loan_status', function() {
        return function(value) {
            if (value == 'A') {
                return "APPROVED";
            }
            if (value == 'R') {
                return "FOR APPROVAL";
            }
            if (value == 'X') {
                return "CANCELLED";
            }
            if (value == 'P') {
                return "PENDING";
            }
        }
    })

    .filter('account_status', function() {
        return function(value) {
            if (value == 'A') {
                return "ACTIVE";
            }
            if (value == 'V') {
                return "PROVISION";
            }
            if (value == 'F') {
                return "FULLY PAID";
            }
            if (value == 'W') {
                return "WRITE-OFF";
            }
            if (value == 'O') {
                return "OVERDUE";
            }
            if (value == 'P') {
                return "PRETERMINATION";
            }
            if (value == 'R') {
                return "ROLL-OVER";
            }
        }
    })

    .service('popup', ['$compile',function($compile){
        var popup   =   {};
            /**
            * @param    string      message required
            * @param    int         width   required
            * @param    scope       scope   required
            * @param    controller  ctrl    optional
            *
            * @returns  void
            */
            popup.show  =   function(message, width, scope, ctrl){

                var w   =   window.innerWidth, finalWidth;
                if(w > 767){ finalWidth = 500; }
                else { finalWidth = 310; }
                if(width != null && $.isNumeric(width)){ finalWidth = width; }
                var date = new Date();
                var time = date.getTime();
                var html = '';
                    html += '<div id="'+time+'-crm-alert" class="crm-alert crm-dialog">';
                        html += '<div style="width: '+finalWidth+'px; height: auto;background-color:#FFFFFF !important;" class="crm-dialog-container showSweetAlert">';
                            html += '<div class="crm-dialog-text-container">';
                                html += message;
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';
                $('body').append($($compile(html)(scope)).fadeIn("fast"));
                document.body.style.overflow = 'hidden';
            }
            popup.hide  =   function(){
                document.querySelector('.crm-dialog > div:first-child').classList.add('hideSweetAlert');
                setTimeout(function(){
                    document.querySelector('.crm-dialog').remove();
                    document.body.style.overflow = 'auto';
                },100);
            }
        return popup;
    }])

    .service('numberToEnglish',function(){
        this.convert = function(n, custom_join_character){
            var string = n.toString(),
            units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

            var and = custom_join_character || ' ';

            /* Is number zero? */
            if (parseInt(string) === 0) {
            return 'zero';
            }

            /* Array of units as words */
            units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

            /* Array of tens as words */
            tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

            /* Array of scales as words */
            scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

            /* Split user arguemnt into 3 digit chunks from right to left */
            start = string.length;
            chunks = [];
            while (start > 0) {
            end = start;
            chunks.push(string.slice((start = Math.max(0, start - 3)), end));
            }

            /* Check if function has enough scale words to be able to stringify the user argument */
            chunksLen = chunks.length;
            if (chunksLen > scales.length) {
            return '';
            }

            /* Stringify each integer in each chunk */
            words = [];
            for (i = 0; i < chunksLen; i++) {

            chunk = parseInt(chunks[i]);

            if (chunk) {

                /* Split chunk into array of individual integers */
                ints = chunks[i].split('').reverse().map(parseFloat);

                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if (ints[1] === 1) {
                    ints[0] += 10;
                }

                /* Add scale word if chunk is not zero and array item exists */
                if ((word = scales[i])) {
                    words.push(word);
                }

                /* Add unit word if array item exists */
                if ((word = units[ints[0]])) {
                    words.push(word);
                }

                /* Add tens word if array item exists */
                if ((word = tens[ints[1]])) {
                    words.push(word);
                }

                /* Add 'and' string after units or tens integer if: */
                if (ints[0] || ints[1]) {

                    /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                    if (ints[2] || !i && chunksLen) {
                        words.push(and);
                    }

                }

                /* Add hundreds word if array item exists */
                if ((word = units[ints[2]])) {
                    words.push(word + ' hundred');
                }

            }

            }

            return words.reverse().join(' ');
        }

    })

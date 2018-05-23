kwaderno

    .directive('html', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'E',
            link: function(scope, element) {

                if (!element.hasClass('ismobile')) {
                    if (!$('.login-content')[0]) {
                        nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                    }
                }
            }
        }
    }])

    .directive('tableResponsive', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])

    .directive('chosenResults', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])

    .directive('tabNav', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('ismobile')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '3px');
                }
            }
        }
    }])

    .directive('ncScroll', ['nicescrollService', function(nicescrollService){
        return {
            restrict: 'C',
            link: function(scope, element) {

                if (!$('html').hasClass('nc-scroll')) {
                    nicescrollService.niceScroll(element, 'rgba(0,0,0,0.3)', '5px');
                }
            }
        }
    }])

    .directive('sparklineBar', function(){

        return {
            restrict: 'A',
            link: function(scope, element) {
                function sparkLineBar(selector, values, height, barWidth, barColor, barSpacing) {
                $(selector).sparkline(values, {
                        type: 'bar',
                        height: height,
                        barWidth: barWidth,
                        barColor: barColor,
                        barSpacing: barSpacing
                });
                }

                sparkLineBar('.stats-bar', [30,12,22,8,6,10,4,5,4,5,7,26], '45px', 3, '#fff', 5);
            }
        }
    })

    .directive('sparklineLine', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {
                function sparkLineLine(selector, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
                    $(selector).sparkline(values, {
                        type: 'line',
                        width: width,
                        height: height,
                        lineColor: lineColor,
                        fillColor: fillColor,
                        lineWidth: lineWidth,
                        maxSpotColor: maxSpotColor,
                        minSpotColor: minSpotColor,
                        spotColor: spotColor,
                        spotRadius: spotRadius,
                        highlightSpotColor: hSpotColor,
                        highlightLineColor: hLineColor
                    });
                }
            sparkLineLine('.stats-total-amount', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');

            }
        }
    })

    // =========================================================================
    // MAINMENU COLLAPSE
    // =========================================================================

    .directive('toggleSidebar', function(){

        return {
            restrict: 'A',
            scope: {
                modelLeft: '=',
                modelRight: '='
            },

            link: function(scope, element, attr) {
                element.on('click', function(){

                    if (element.data('target') === 'mainmenu') {
                        if (scope.modelLeft === false) {
                            scope.$apply(function(){
                                scope.modelLeft = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelLeft = false;
                            })
                        }
                    }

                    if (element.data('target') === 'chat') {
                        if (scope.modelRight === false) {
                            scope.$apply(function(){
                                scope.modelRight = true;
                            })
                        }
                        else {
                            scope.$apply(function(){
                                scope.modelRight = false;
                            })
                        }

                    }
                })
            }
        }

    })

    // =========================================================================
    // SUBMENU TOGGLE
    // =========================================================================

    .directive('toggleSubmenu', function(){

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).on('click',function(){
                    element.parent().toggleClass('toggled');
                    slideToggle(element[0].parentNode.querySelector('UL'))
                })
                function slideToggle(el){
                    var el_max_height = 0;

                    if(el.getAttribute('data-max-height')) {
                        if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
                            el.style.maxHeight = el.getAttribute('data-max-height');
                        }
                        else {
                            el.style.maxHeight = '0';
                        }
                    }
                    else {
                        el_max_height                  = getHeight(el) + 'px';
                        el.style['transition']         = 'max-height 0.3s ease-in-out';
                        el.style.overflowY             = 'hidden';
                        el.style.maxHeight             = '0';
                        el.setAttribute('data-max-height', el_max_height);
                        el.style.display               = 'block';
                        setTimeout(function() {
                            el.style.maxHeight = el_max_height;
                        }, 10);
                    }
                }
                function getHeight(el){
                    var el_style      =    window.getComputedStyle(el),
                        el_display    =     el_style.display,
                        el_position   =     el_style.position,
                        el_visibility =     el_style.visibility,
                        el_max_height =     el_style.maxHeight.replace('px', '').replace('%', ''),
                        wanted_height = 0;

                    if(el_display !== 'none' && el_max_height !== '0') { return el.offsetHeight; }

                    el.style.position   = 'absolute';
                    el.style.visibility = 'hidden';
                    el.style.display    = 'block';

                    wanted_height     = el.offsetHeight;

                    el.style.display    = el_display;
                    el.style.position   = el_position;
                    el.style.visibility = el_visibility;

                    return wanted_height;
                }
            }
        }
    })

    // =========================================================================
    // STOP PROPAGATION
    // =========================================================================

    .directive('stopPropagate', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.stopPropagation();
                });
            }
        }
    })

    .directive('aPrevent', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                element.on('click', function(event){
                    event.preventDefault();
                });
            }
        }
    })

    // =========================================================================
    // PRINT
    // =========================================================================

    .directive('print', function(){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.click(function(){
                    window.print();
                })
            }
        }
    })

    .directive('btn', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if(element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                    Waves.attach(element, ['waves-circle']);
                }

                else if(element.hasClass('btn-light')) {
                    Waves.attach(element, ['waves-light']);
                }

                else {
                    Waves.attach(element);
                }

                Waves.init();
            }
        }
    })


    // =========================================================================
    // INPUT FEILDS MODIFICATION
    // =========================================================================

    .directive('fgLine', function(){
        return {
            restrict: 'C',
            link: function(scope, element) {
                if($('.fg-line')[0]) {
                    $('body').on('focus', '.form-control', function(){
                        $(this).closest('.fg-line').addClass('fg-toggled');
                        $(this).closest('.fg-line').removeClass('fg-toggle-off');
                    })

                    $('body').on('blur', '.form-control', function(){
                        var p = $(this).closest('.form-group');
                        var i = p.find('.form-control').val();

                        if (p.hasClass('fg-float')) {
                            if (i.length == 0) {
                                $(this).closest('.fg-line').removeClass('fg-toggled');
                            }
                        }
                        else {
                            $(this).closest('.fg-line').removeClass('fg-toggled');
                        }
                        ;
                        if ($(this).closest('.fg-line').hasClass('fg-toggled')) {
                            $(this).closest('.fg-line').addClass('fg-toggle-off');
                        }
                    });
                }
            }
        }
    })


    // =========================================================================
    // INPUT FLOAT CONTENT
    // =========================================================================

    .directive('floatContent', function($timeout){
        return {
            restrict: 'A',
            priority: -1,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngModel,function(value){
                    $timeout(function () {
                        if(value){
                            element.parent('.fg-line').addClass('fg-toggled').addClass('fg-toggle-off');
                        }
                        else if(element.attr('placeholder') === undefined) {
                            if(!element.is(":focus"))
                            element.trigger("blur");
                        }
                    });
                });
            }
        };
    })

    // =========================================================================
    // RESET FGLINE TO DEFAULT
    // =========================================================================

    .directive('fglineDefault', function (){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, ngModelCtrl, $event) {
                ngModelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == null || inputValue == ''){
                        var x = element[0].id;
                        angular.element("#"+x+"Container").removeClass('has-success');
                        angular.element("#"+x+"Container").removeClass('has-error');
                    }
                    else{
                        element[0].focus();
                    }
                    return inputValue;
                });
            }
        }
    })

    // =========================================================================
    // TEXT INPUT ENTER FUNCTION CALL
    // =========================================================================

    .directive('myEnter', function (){
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event){
                if(event.which === 13) {
                    scope.$apply(function (){
                      scope.$eval(attrs.myEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })

    .directive('acceptValidName', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == null)
                    return ''

                    cleanInputValue = inputValue.replace(/[^\u00F1\u00D1A-Za-z.-\s]/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
    })

    .directive('nameOnly', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {;
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == null)
                    return ''

                    cleanInputValue = inputValue.replace(/[^\u00F1\u00D1a-zA-Z,.-\s]+/g,'');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
    })

    .directive('noSpecialChar', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == null)
                    return ''

                    cleanInputValue = inputValue.replace(/[^\w\s\u00F1\u00D1]/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
    })

    .directive('noUnderScore', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == null)
                return ''
                cleanInputValue = inputValue.replace(/_/g, "");
                if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
                }
                return cleanInputValue;
            });
            }
        }
    })

    .directive('numberOnly', function() {
        return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
            if (inputValue == null)
                return ''
            cleanInputValue = inputValue.replace(/[^0-9]/g, '');
            if (cleanInputValue != inputValue) {
                modelCtrl.$setViewValue(cleanInputValue);
                modelCtrl.$render();
            }
            return cleanInputValue;
            });
        }
        }
    })

    .directive('autofocus', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link : function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
            }
        }
    }])

    .directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function(ev) {

                });
                element.bind('error', function(){
                    /*element[0].src = baseUrl + '/media/icon/noimage.png'*/
                    if(attrs.imgType == 'b'){
                        $(element[0]).replaceWith('<div class="no-image no-image-big-h"><div class="no-image-text no-image-big">'+(attrs.imgTxt ? attrs.imgTxt : '')+'</div></div>');
                    }
                    else if(attrs.imgType == 's'){
                        $(element[0]).replaceWith('<div class="no-image no-image-small-h"><div class="no-image-text no-image-small">'+(attrs.imgTxt ? attrs.imgTxt : '')+'</div></div>');
                    }
                    else{
                        element[0].src = baseUrl + '/media/icon/noimage.png';
                    }
                });
            }
        };
    })

    .directive('noimage', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if(attrs.imgType == 'b'){
                    $(element[0]).replaceWith('<div class="no-image no-image-big-h"><div class="no-image-text no-image-big">'+(attrs.imgTxt ? attrs.imgTxt : '')+'</div></div>');
                }
                else{
                    $(element[0]).replaceWith('<div class="no-image no-image-small-h"><div class="no-image-text no-image-small">'+(attrs.imgTxt ? attrs.imgTxt : '')+'</div></div>');
                }
            }
        };
    })

    .directive('doFilter', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                $(element).on('keypress',function(ev){
                    element[0].selectionStart = element[0].selectionStart;
                });
                var type    =   attrs.doFilter;
                function doScape(method, val){
                    if(method == 'alnum'){ return val.replace(/[`~!@#$%^&*|+\=?;:,<>\{\}\[\]\\\/]/gi,''); }
                    else if(method == 'phone'){ return val.replace(/[`~!@#$%^&*_|\=?;:'",a-zA-Z<>\{\}\[\]\\]/gi,''); }
                    else if(method == 'address'){ return val.replace(/[`~!$%^*_|\=?;:'"<>\{\}\[\]\\\/]/gi,''); }
                    else if(method == 'number'){ return val.replace(/[^0-9]+/g,''); }
                    else if(method == 'accountNo'){ return val.replace(/[^0-9_-]+/g,''); }
                    else if(method == 'srp'){ return val.replace(/[^0-9.]+/g,''); }
                    else if(method == 'amount'){
                        return val.replace(/[^0-9.,-]+/g,'');
                    }
                    else{
                        return val.replace(/[`~!@#$%^&*|+\=?;:,<>\{\}\[\]\\\/]/gi,'');
                    }
                }
                modelCtrl.$parsers.push(function(inputValue) {
                    var lasPos  =   element[0].selectionStart;
                    if (inputValue == null){ return ''; }
                    cleanInputValue =   doScape(type, inputValue);
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                        element[0].selectionEnd = lasPos - 1;
                    }
                    return cleanInputValue;
                });
            }
        }
    })

    .directive('updateTitle', ['$rootScope', '$timeout',function($rootScope, $timeout) {
        return {
            link: function(scope, element) {
                var listener = function(event, toState) {
                    var toStateName         = (toState.name).split('.');
                    var title = '';
                    if (toState.title) title = toState.title;
                        $timeout(function() {
                            element.text(toStateName[0].toUpperCase()+' :: Macondray Finance');
                        }, 0, false);
                    };
                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ])

    // =========================================================================
    // INPUT EMAIL FORMAT
    // =========================================================================

    .directive('emailOnly', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function(inputValue) {
                    if (inputValue == null){
                        return '';
                    }

                    cleanInputValue = inputValue.replace(/[\s]/gi,'');

                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
              });
            }
        }
    })

    // =========================================================================
    // INPUT DECIMAL FORMAT
    // =========================================================================

    .directive('decimalOnly', function(){
        //add attribute set-default = true to set 0.00 on input initialization
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl){
                var origClean = "";
                attrs.maxlength = attrs.maxlength + 3;
                ngModelCtrl.$parsers.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString().replace(/[^0-9\.]/g, '');
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,2);
                        clean           =   decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    origClean = clean;

                    if (ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                ngModelCtrl.$formatters.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString().replace(/[^0-9\.]/g, '');
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,2);
                        if(decimalCheck[1].length == 1){
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1] + "0";
                        }
                        else{
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1];
                        }
                    }
                    else{
                        clean = clean + ".00";
                    }

                    origClean = clean;

                    if(ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event){
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });

                element.bind('blur', function(event){
                    if(origClean != ""){
                        var decimalCheck = origClean.split('.');
                        if(angular.isUndefined(decimalCheck[1])){
                            newClean = origClean + ".00";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1] == ""){
                            newClean = origClean + "00";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1].length == 1){
                            newClean = origClean + "0";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                    }
                    else{
                        if(attrs.setDefault){
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue("0.00");
                                ngModelCtrl.$render();
                            });
                        }
                    }
                });
              }
        }}
    )

    .directive('fiveDecimal', function(){
        //add attribute set-default = true to set 0.00 on input initialization
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl){
                var origClean = "";
                ngModelCtrl.$parsers.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString().replace(/[^0-9\.]/g, '');
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,5);
                        clean           =   decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    origClean = clean;

                    if (ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                ngModelCtrl.$formatters.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString().replace(/[^0-9\.]/g, '');
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,5);
                        if(decimalCheck[1].length == 1){
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1] + "0";
                        }
                        else{
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1];
                        }
                    }
                    else{
                        var len = clean.length;
                        var maxlen = attrs.maxlength;
                        var dec = maxlen - len - 1;
                        if(dec >= 1){
                            clean = clean + ".";

                            for(var x = 0 ; x < dec ; x++){

                                clean = clean + "0";
                            }
                        }

                        // clean = clean + ".00000";
                    }

                    origClean = clean;

                    if(ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event){
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });

                element.bind('blur', function(event){

                    if(origClean != ""){
                        var decimalCheck = origClean.split('.');
                        if(angular.isUndefined(decimalCheck[1])){
                            var len = origClean.length;
                            var maxlen = attrs.maxlength;
                            var dec = maxlen - len - 1;

                            if(dec >= 1){
                                newClean = origClean + ".";

                                for(var x = 0 ; x < dec ; x++){

                                    newClean = newClean + "0";
                                }
                            }
                            else{
                                newClean = origClean;
                            }
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1] == ""){
                            var len = origClean.length;
                            var maxlen = attrs.maxlength;
                            var dec = maxlen - len - 1;
                            if(dec >= 1){
                                newClean = origClean + ".";

                                for(var x = 0 ; x < dec ; x++){

                                    newClean = newClean + "0";
                                }
                            }
                            else{
                                newClean = origClean;
                            }

                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1].length == 1){
                            newClean = origClean + "0";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                    }
                    else{
                        if(attrs.setDefault){
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue("0.00000");
                                ngModelCtrl.$render();
                            });
                        }
                    }
                });
              }
        }}
    )

    .directive('decimalFormat', function(){
        //add attribute set-default = true to set 0.00 on input initialization
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl){
                var origClean = "";
                var origLength = attrs.maxlength;
                attrs.maxlength += 3;

                ngModelCtrl.$parsers.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString()
                      .replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,2);
                        clean           =   decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    origClean = clean;

                    if (ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                ngModelCtrl.$formatters.push(function(val){
                    if(ngModelCtrl.$isEmpty(val)){
                        return val;
                    }

                    var clean           =   val.toString().replace(/[^0-9\.]/g, '');
                    var decimalCheck    =   clean.split('.');

                    if(!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] =   decimalCheck[1].slice(0,2);
                        if(decimalCheck[1].length == 1){
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1] + "0";
                        }
                        else{
                            clean   =   decimalCheck[0] + '.' + decimalCheck[1];
                        }
                    }
                    else{
                        clean = clean + ".00";
                    }

                    origClean = clean;

                    if(ngModelCtrl.viewValue !== clean){
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function(event){
                    if(event.keyCode === 32) {
                        event.preventDefault();
                    }
                });

                element.bind('blur', function(event){
                    if(origClean != ""){
                        var decimalCheck = origClean.split('.');
                        if(angular.isUndefined(decimalCheck[1])){
                            newClean = origClean + ".00";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1] == ""){
                            newClean = origClean + "00";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                        else if(decimalCheck[1].length == 1){
                            newClean = origClean + "0";
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue(newClean);
                                ngModelCtrl.$render();
                            });
                        }
                    }
                    else{
                        if(attrs.setDefault){
                            scope.$apply(function(){
                                ngModelCtrl.$setViewValue("0.00");
                                ngModelCtrl.$render();
                            });
                        }
                    }
                });
                // attrs.maxlength = origLength;
              }
        }}
    )
    // =========================================================================
    // INPUT UPPER CASE FORMAT
    // =========================================================================

    .directive('uppercaseOnly', [ function(){
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs, ctrl) {
            element.on('keypress', function(e) {
              var char = e.char || String.fromCharCode(e.charCode);
            });

            function parser(value) {
              if (ctrl.$isEmpty(value)) {
                return value;
              }
              var formatedValue = value.toUpperCase();
              if (ctrl.$viewValue !== formatedValue) {
                ctrl.$setViewValue(formatedValue);
                ctrl.$render();
              }
              return formatedValue;
            }

            function formatter(value) {
              if (ctrl.$isEmpty(value)) {
                return value;
              }
              return value.toUpperCase();
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.push(parser);
          }
        };
    }])

    // currency format
    .directive('format', ['$filter', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue, '')
                });

                elem.bind('blur', function(event) {
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.format)(plainNumber), '');
                });
            }
        };
    }])

    // currency format can be combine with decimalOnly directive
    .directive('currencyFormat', function (){
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var numberFormat = function(number) {
                    var decimals = 2;
                    var number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
                    var n = !isFinite(+number) ? 0 : +number,
                        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                        s = '',
                        toFixedFix = function(n, prec) {
                            var k = Math.pow(10, prec);
                            return '' + (Math.round(n * k) / k)
                                .toFixed(prec);
                        };

                    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                        .split('.');
                    if (s[0].length > 3) {
                        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                    }
                    if ((s[1] || '')
                        .length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1)
                            .join('0');
                    }
                    return s.join(dec);
                };

                if (!ctrl) return;



                ctrl.$formatters.unshift(function(){
                    if(!ctrl.$modelValue){
                        return null;
                    }
                    else{
                        return numberFormat(ctrl.$modelValue);

                    }

                });

                elem.bind('blur', function(event){
                    var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');

                    if(plainNumber != ""){
                        elem.val(numberFormat(plainNumber));
                    }
                    else{
                        elem.val(plainNumber);
                    }
                });
            }
        };
    })

    // Dynamically removes other attributes
    .directive('removeAttribute', function($compile){
        return {
            require: 'ngModel',
            priority: 1000,
            link: function(scope, element, attrs){

                var attributes = scope.$eval(attrs.removeAttribute);

                scope.$watch(attrs.removeAttribute, function(value){
                    if (value.cond == true) {
                        element.attr(value.atr1, '');
                        element.removeAttr(value.atr2, '');
                    } else {
                        element.removeAttr(value.atr1, '');
                        element.attr(value.atr2, '');
                    }

                });
            }
        };
    })

    // =========================================================================
    // INPUT TELEPHONE FORMAT MASK
    // =========================================================================

    // 2 area code
    .directive('telephoneInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "(999) 999 - 9999",
                            showMaskOnHover: false,
                        });
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    // 3 area code
    .directive('telephone2Input', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "(999) 999 9999",
                            showMaskOnHover: false,
                        });
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    // =========================================================================
    // INPUT MOBILE FORMAT MASK
    // =========================================================================

    .directive('mobileInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "+(63) 999 999 9999",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })


    // =========================================================================
    // COVERTS NUMBER TO STRING FORMAT
    // =========================================================================
    .directive('numberToString', function(){
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value){
                    return value + '';
                });
                ngModel.$formatters.push(function(value){
                    return value + '';
                });
            }
        }
    })

    // =========================================================================
    // COVERTS STRING TO NUMBER FORMAT
    // =========================================================================
    .directive('stringToNumber', function(){
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value){
                    return parseInt(value);
                });
                ngModel.$formatters.push(function(value){
                    return parseInt(value);
                });
            }
        }
    })

    // =========================================================================
    // INPUT DATE FORMAT MASK
    // =========================================================================

    .directive('dateInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            alias: 'yyyy-mm-dd',
                            placeholder: "YYYY-MM-DD",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    // =========================================================================
    // INPUT DATE FORMAT MASK
    // =========================================================================

    .directive('updateToBol', function($parse){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs){
                var ngModelGet = $parse(attrs.ngModel);

                scope.$watch(attrs.ngModel, function(){
                    var model = $parse(attrs.ngModel);

                    if(ngModelGet(scope) == null || ngModelGet(scope) == '0' || ngModelGet(scope) == false){
                        model.assign(scope, false);
                    }
                    else if((ngModelGet(scope) != null && ngModelGet(scope) == '1' || ngModelGet(scope) == true)){
                        model.assign(scope, true);
                    }
                    else{
                        model.assign(scope, false);
                        console.log("Invalid value to update to boolean.")
                    }
                });
            }
        }
    })

    .directive('triggerChosen', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 100,
            link: function(scope, element, attr,ngModel){
                scope.$watch(attr.ngModel,function(value){
                    if(!element.hasClass('is-chosen')){
                        setTimeout(function(){
                            var chosen = $(element).chosen().data('chosen');
                            element.addClass('is-chosen');

                            // if attribute disable-enter
                            if(!attr.disableEnter || attr.disableEnter == null){
                                chosen.container.unbind('keyup').bind('keyup', function (event){
                                    if(event.which == 13 && chosen.results_showing){
                                        cleanInputValue = chosen.search_field.val().replace(/[^\w\s]/gi, '');
                                        if (cleanInputValue.trim().length != chosen.search_field.val().length) {
                                            chosen.search_field.val(cleanInputValue);
                                            return false;
                                        }
                                        else{
                                            var tmp;
                                            tmp = '<option class="capitalize-per-word" value="'+ chosen.search_field.val() +'">'+ chosen.search_field.val() +'</option>';
                                            chosen.form_field_jq.append(tmp);
                                            chosen.form_field_jq.trigger('chosen:updated');
                                            chosen.result_highlight = chosen.search_results.find('li.active-result').last();
                                            return chosen.result_select(event);
                                        }
                                    }
                                });
                            }
                        },50)
                    }

                });
            }
        };
    })

    // =========================================================================
    // FILE UPLOAD
    // =========================================================================
    .directive('appFilereader', function($q){
        var slice = Array.prototype.slice;

        return {
          restrict: 'A',
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
              if (!ngModel) return;

              ngModel.$render = function() {};
              element.bind('change', function(e) {
                  var element = e.target;

                  $q.all(slice.call(element.files, 0).map(readFile))
                      .then(function(values) {
                          if (element.multiple) ngModel.$setViewValue(values);
                          else ngModel.$setViewValue(values.length ? values[0] : null);
                      });

                  function readFile(file) {
                      var deferred = $q.defer();

                      var reader = new FileReader();
                      reader.onload = function(e) {
                          deferred.resolve(e.target.result);
                      };
                      reader.onerror = function(e) {
                          deferred.reject(e);
                      };
                      reader.readAsDataURL(file);

                      return deferred.promise;
                  }

              });
          }
        };
    })

    // =========================================================================
    // CAPITALIZE FIRST LETTER OF WORD
    // =========================================================================

    .directive('capitalizeFirst', function (uppercaseFilter, $parse) {
        return {
          require: 'ngModel',
          scope: {
              ngModel: "="
          },
          link: function (scope, element, attrs, modelCtrl) {

              scope.$watch("ngModel", function () {
                  if(scope.ngModel != null){
                      scope.ngModel = scope.ngModel.replace(/^(.)|\s(.)/g, function(v){ return v.toUpperCase( ); });
                  }
              });
          }
        };
    })

    .directive('capitalizeAll', function (uppercaseFilter, $parse) {
        return {
          require: 'ngModel',
          scope: {
              ngModel: "="
          },
          link: function (scope, element, attrs, modelCtrl) {

              scope.$watch("ngModel", function () {
                  if(scope.ngModel != null){
                      scope.ngModel = scope.ngModel.toUpperCase();
                  }
              });
          }
        };
    })

    .directive('sssInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "99 - 9999999 - 9",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive('hdmfInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "9999 - 9999 - 99",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive('philhealthInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "99 - 999999999 - 9",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive('tinInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "999 - 999 - 999",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive('subaccountInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "999-99-99-999-99-99",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive('accountInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: "999-999-999",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

    .directive("limitToMax", function() {
        return {
            link: function(scope, element, attributes) {
            var oldVal = null;
            element.on("keydown keyup", function(e) {
            if (Number(element.val()) > Number(attributes.max) &&
                e.keyCode != 46 // delete
                &&
                e.keyCode != 8 // backspace
                ) {
                e.preventDefault();
                element.val(oldVal);
                } else {
                oldVal = Number(element.val());
                }
            });
            }
        };
    })

    .directive('maintenanceModuleFilter', function() {
        return {
            restrict: 'E',
            template: '<div id="searchModuleContainer" class="form-group fg-float">'+
                        '<div class="fg-line">'+
                            '<select id="searchModule" class="form-control" ng-model="search_module.selected" ng-change="search.form = {}" float-content fgline-default>'+
                                '<option class="hidden"></option>'+
                                '<option value="User">User</option>'+
                                '<option value="User Role">User Role</option>'+
                                '<option value="Product">Product</option>'+
                                '<option value="Company">Company</option>'+
                                '<option value="Agent">Agent</option>'+
                                '<option value="Document">Document</option>'+
                                '<option value="Rate">Rate</option>'+
                                '<option value="Deduction">Deduction</option>'+
                                '<option value="Insurance Company">Insurance Company</option>'+
                                '<option value="Terms">Insurance Premium</option>'+
                                '<option value="Branch">Branch</option>'+
                                '<option value="Marketing Medium">Marketing Medium</option>'+
                                '<option value="Business Nature">Business Nature</option>'+
                            '</select>'+
                            '<label class="fg-label">Module <span class="c-red">*</span></label>'+
                        '</div>'+
                    '</div>',
        };
    })

    .directive('lendingModuleFilter', function() {
        return {
            restrict: 'E',
            template: '<div id="searchModuleContainer" class="form-group fg-float">'+
                        '<div class="fg-line">'+
                            '<select id="searchModule" class="form-control" ng-model="search_module.selected" ng-change="search.form = {}" float-content fgline-default>'+
                                '<option class="hidden"></option>'+
                                '<option value="Customer">Customer</option>'+
                                '<option value="Client">Client</option>'+
                                '<option value="Loan">Loan</option>'+
                                '<option value="Check Preparation">Check Preparation</option>'+
                                '<option value="Check Release">Check Release</option>'+
                            '</select>'+
                            '<label class="fg-label">Module <span class="c-red">*</span></label>'+
                        '</div>'+
                    '</div>',
        };
    })

    .directive('triggerChosenSearch', function($http,userSession){
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: 100,
            link: function(scope, element, attr, ngModel){

                scope.$watch(attr.ngModel,function(value,old,event){
                    if(!element.hasClass('is-chosen')){
                        setTimeout(function(){
                            var chosen = $(element).chosen().data('chosen');
                            element.addClass('is-chosen');

                            // Delay function
                            var delay = (function(){
                                var timer = 0;
                                return function(callback){
                                    clearTimeout (timer);
                                    timer = setTimeout(callback, 1000);
                                };
                            })();

                            chosen.container.unbind('keyup').bind('keyup', function (event){
                                // if key event is enter do not initialize query search
                                if(event.keyCode == 13 || event.keyCode == 40 || event.keyCode == 38){
                                    return false;
                                }

                                delay(function(){
                                    // chosen search
                                    cleanInputValue = chosen.search_field.val().replace(/[^\w\s]/gi, '');

                                    // check if chosen search is empty or white space
                                    if (cleanInputValue.trim().length != chosen.search_field.val().length) {
                                        chosen.search_field.val(cleanInputValue);
                                        return false;
                                    }
                                    else{
                                        var rows    =   [];
                                        var opt     =   chosen.form_field_jq[0];

                                        // clear select option
                                        angular.element("#"+opt.id).find('option').remove().end();

                                        // 1 more extra param
                                        if(attr.extra == "false"){
                                            var this_param = attr.extraExtra;
                                        }
                                        else{
                                            var this_param = cleanInputValue;
                                        }

                                        $http({
                                            method  :   'GET',
                                            url     :   apps_config.api_url + attr.searchUrl,
                                            headers : {
                                                'Content-Type'  : 'application/x-www-form-urlencoded; charset=UTF-8',
                                                'Authorization' :   userSession.getBearerToken(),
                                            },
                                            params  :   {
                                                query   :   {
                                                    page    :   1,
                                                    row     :   100,
                                                    orderBy :   '-id',
                                                    search  :   this_param,
                                                    extra   :   attr.extra
                                                }
                                            }
                                        }).then(function successCallback(response){
                                            rows = response.data.rows;
                                            if(rows.length != 0){
                                              // clear select option
                                              for(var i = 0; opt.length > i; i++){
                                                  opt.remove(opt.length-1);
                                              }
                                              // convert optionLabel string comma separated to array
                                              var arrayOptionLabel = attr.optionLabel.split(", ").map(String);

                                              if(attr.optionData){
                                                  var arrayOptionData = attr.optionData.split(", ").map(String);
                                              }

                                              // set black option
                                              tmp = '<option class="hidden" value=""></option>';
                                              chosen.form_field_jq.append(tmp);
                                              //chosen.form_field_jq.trigger('chosen:updated');

                                              // generate chosen option base on search result
                                              angular.forEach(rows,function(value,key){
                                                  var tmp;
                                                  var label   = "";
                                                  var val     = "";
                                                  var datas   = "";

                                                  if(attr.optionValue != "index"){
                                                      val = value[attr.optionValue]
                                                  }
                                                  else{
                                                      val = key;
                                                  }

                                                  // generation option label
                                                  for (var i = 0; i < arrayOptionLabel.length; i++) {
                                                      if(i == 1 && attr.fullnameLabel == "true"){
                                                          label = label +", "+ value[arrayOptionLabel[i]];
                                                      }
                                                      else{
                                                          if(value[arrayOptionLabel[i]] == null || value[arrayOptionLabel[i]] == ' ' || typeof value[arrayOptionLabel[i]] == 'undefined'){
                                                              label = label;
                                                          }
                                                          else{
                                                              label = label +" "+ value[arrayOptionLabel[i]];
                                                          }
                                                      }
                                                  }

                                                  if(attr.optionData){
                                                      // generation of data attr
                                                      for (var i = 0; i < arrayOptionData.length; i++) {
                                                          datas = datas +"data-"+arrayOptionData[i]+"='"+value[arrayOptionData[i]]+"'";
                                                      }
                                                  }

                                                  if(attr.optionCrypt && !attr.optionUsername){
                                                      tmp = '<option class="capitalize-per-word" '+datas+' value="'+ val +'" data-crypt="'+ value[attr.optionCrypt] +'">'+ label +'</option>';
                                                  }
                                                  else if(attr.optionUsername && attr.optionCrypt){
                                                      tmp = '<option class="capitalize-per-word" '+datas+' value="'+ val +'" data-username="'+value[attr.optionUsername]+'" data-crypt="'+ value[attr.optionCrypt] +'">'+ label +'</option>';
                                                  }
                                                  else{

                                                      tmp = '<option class="capitalize-per-word" '+datas+' value="'+ val +'" >'+ label +'</option>';
                                                  }

                                                  chosen.form_field_jq.append(tmp);
                                                  chosen.form_field_jq.trigger('chosen:updated');
                                              });
                                              chosen.search_field.val(cleanInputValue);
                                            }
                                            //chosen.active_field = false;

                                        },function errorCallback(response){
                                            console.log(response);
                                        });
                                    }
                                }, 500 );
                            });
                        },50)
                    }
                });
            }
        };
    })

    .directive('pieDonut', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var pieDataCustomer    = scope.thisPieDataCustomer;
                var pieDataClient      = scope.thisPieDataClient;
                var pieDataLoan        = scope.thisPieDataLoan;
                var thisPieData        = scope.thisPieData;
                var thisPieDataAgent   = scope.thisPieDataAgent;
                var thisPieDataCompany = scope.thisPieDataCompany;

                if($('#pie-chart-customer')[0]){
                    $.plot('#pie-chart-customer', pieDataCustomer, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-pie-customer',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                        // series: {
                        //     pie: {
                        //         show: true,
                        //         stroke: {
                        //             width: 2,
                        //         },
                        //     },
                        // },
                        // legend: {
                        //     container: '.flc-pie-customer',
                        //     backgroundOpacity: 0.5,
                        //     noColumns: 2,
                        //     backgroundColor: "white",
                        //     lineWidth: 0
                        // },
                        // grid: {
                        //     hoverable: true,
                        //     clickable: true
                        // },
                        // tooltip: true,
                        // tooltipOpts: {
                        //     content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                        //     shifts: {
                        //         x: 20,
                        //         y: 0
                        //     },
                        //     defaultTheme: false,
                        //     cssClass: 'flot-tooltip'
                        // }

                    });
                }

                if($('#pie-chart-client')[0]){
                    $.plot('#pie-chart-client', pieDataClient, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-pie-client',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                        // series: {
                        //     pie: {
                        //         show: true,
                        //         stroke: {
                        //             width: 2,
                        //         },
                        //     },
                        // },
                        // legend: {
                        //     container: '.flc-pie-client',
                        //     backgroundOpacity: 0.5,
                        //     noColumns: 2,
                        //     backgroundColor: "white",
                        //     lineWidth: 0
                        // },
                        // grid: {
                        //     hoverable: true,
                        //     clickable: true
                        // },
                        // tooltip: true,
                        // tooltipOpts: {
                        //     content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                        //     shifts: {
                        //         x: 20,
                        //         y: 0
                        //     },
                        //     defaultTheme: false,
                        //     cssClass: 'flot-tooltip'
                        // }

                    });
                }

                if($('#pie-chart-loan')[0]){
                    $.plot('#pie-chart-loan', pieDataLoan, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-pie-loan',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                        // series: {
                        //     pie: {
                        //         show: true,
                        //         stroke: {
                        //             width: 2,
                        //         },
                        //     },
                        // },
                        // legend: {
                        //     container: '.flc-pie-loan',
                        //     backgroundOpacity: 0.5,
                        //     noColumns: 2,
                        //     backgroundColor: "white",
                        //     lineWidth: 0
                        // },
                        // grid: {
                        //     hoverable: true,
                        //     clickable: true
                        // },
                        // tooltip: true,
                        // tooltipOpts: {
                        //     content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                        //     shifts: {
                        //         x: 20,
                        //         y: 0
                        //     },
                        //     defaultTheme: false,
                        //     cssClass: 'flot-tooltip'
                        // }

                    });
                }
            //Felix
                /* Donut Chart */
                if($('#donut-chart-user')[0]){
                    $.plot('#donut-chart-user', thisPieData, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-donut-user',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                    });
                }

                if($('#donut-chart-agent')[0]){
                    $.plot('#donut-chart-agent', thisPieDataAgent, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-donut-agent',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                    });
                }

                if($('#donut-chart-company')[0]){
                    $.plot('#donut-chart-company', thisPieDataCompany, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: {
                                    width: 2,
                                },
                            },
                        },
                        legend: {
                            container: '.flc-donut-company',
                            backgroundOpacity: 0.5,
                            noColumns: 2,
                            backgroundColor: "white",
                            lineWidth: 0
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false,
                            cssClass: 'flot-tooltip'
                        }
                    });
                }

            }
        }
    })

    //Line Chart

    .directive('sparklineLine', function(){

        return {
            restrict: 'A',
            link: function(scope, element) {
                function sparkLineLine(selector, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
                    $(selector).sparkline(values, {
                        type: 'line',
                        width: width,
                        height: height,
                        lineColor: lineColor,
                        fillColor: fillColor,
                        lineWidth: lineWidth,
                        maxSpotColor: maxSpotColor,
                        minSpotColor: minSpotColor,
                        spotColor: spotColor,
                        spotRadius: spotRadius,
                        highlightSpotColor: hSpotColor,
                        highlightLineColor: hLineColor
                    });
                }

                sparkLineLine('.stats-line', [9,4,6,5,6,4,5,7,9,3,6,5], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
                sparkLineLine('.stats-line-2', [5,6,3,9,7,5,4,6,5,6,4,9], 85, 45, '#fff', 'rgba(0,0,0,0)', 1.25, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 3, '#fff', 'rgba(255,255,255,0.4)');
                sparkLineLine('.dash-widget-visits', [9,4,6,5,6,4,5,7,9,3,6,5], '100%', '95px', 'rgba(255,255,255,0.7)', 'rgba(0,0,0,0)', 2, 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.4)', 5, 'rgba(255,255,255,0.4)', '#fff');

            }
        }
    })
    // =========================================================================
    // Curved Line Chart
    // =========================================================================

    .directive('curvedlineChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element) {

                /* Make some random data for the Chart*/

                var d1 = [];
                var d2 = [];
                var d3 = [];

                for (var i = 0; i <= 10; i += 1) {
                    d1.push([i, parseInt(Math.random() * 30)]);
                }

                for (var i = 0; i <= 20; i += 1) {
                    d2.push([i, parseInt(Math.random() * 30)]);
                }

                for (var i = 0; i <= 10; i += 1) {
                    d3.push([i, parseInt(Math.random() * 30)]);
                }


                /* Chart Options */

                var options = {
                    series: {
                        shadowSize: 0,
                        curvedLines: { //This is a third party plugin to make curved lines
                            apply: true,
                            active: true,
                            monotonicFit: true
                        },
                        lines: {
                            show: false,
                            lineWidth: 0,
                        },
                    },
                    grid: {
                        borderWidth: 0,
                        labelMargin:10,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6,

                    },
                    xaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    yaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    legend: {
                        show: false
                    }
                };

                /* Let's create the chart */

                $.plot($(element), [
                    {data: d1, lines: { show: true, fill: 0.98 }, label: 'Product 1', stack: true, color: '#e3e3e3' },
                    {data: d3, lines: { show: true, fill: 0.98 }, label: 'Product 2', stack: true, color: '#f1dd2c' }
                ], options);

                /* Tooltips for Flot Charts */

                if ($(".flot-chart")[0]) {
                    $(".flot-chart").bind("plothover", function (event, pos, item) {
                        if (item) {
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
                        }
                        else {
                            $(".flot-tooltip").hide();
                        }
                    });

                    $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                }
            }
        }
    })


    // =========================================================================
    // Regular Line Charts
    // =========================================================================

    .directive('lineChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element){

                /* Make some random data for Recent Items chart */

                var data = [];
                var totalPoints = 100;
                var updateInterval = 30;

                function getRandomData() {
                    if (data.length > 0)
                        data = data.slice(1);

                    while (data.length < totalPoints) {

                        var prev = data.length > 0 ? data[data.length - 1] : 50,
                            y = prev + Math.random() * 10 - 5;
                        if (y < 0) {
                            y = 0;
                        } else if (y > 90) {
                            y = 90;
                        }

                        data.push(y);
                    }

                    var res = [];
                    for (var i = 0; i < data.length; ++i) {
                        res.push([i, data[i]])
                    }

                    return res;
                }

                /* Make some random data for Flot Line Chart */

                var d1 = [];
                var d2 = [];
                var d3 = [];

                for (var i = 0; i <= 10; i += 1) {
                    d1.push([i, parseInt(Math.random() * 30)]);
                }

                for (var i = 0; i <= 20; i += 1) {
                    d2.push([i, parseInt(Math.random() * 30)]);
                }

                for (var i = 0; i <= 10; i += 1) {
                    d3.push([i, parseInt(Math.random() * 30)]);
                }

                /* Chart Options */

                var options = {
                    series: {
                        shadowSize: 0,
                        lines: {
                            show: false,
                            lineWidth: 0,
                        },
                    },
                    grid: {
                        borderWidth: 0,
                        labelMargin:10,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius:6,

                    },
                    xaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    yaxis: {
                        tickDecimals: 0,
                        ticks: false
                    },

                    legend: {
                        show: false
                    }
                };

                /* Regular Line Chart */
                if ($("#line-chart")[0]) {
                    $.plot($("#line-chart"), [
                        {data: d1, lines: { show: true, fill: 0.98 }, label: 'Product 1', stack: true, color: '#e3e3e3' },
                        {data: d3, lines: { show: true, fill: 0.98 }, label: 'Product 2', stack: true, color: '#FFC107' }
                    ], options);
                }
                var text = [[1,8],[2,5],[3,4],[4,9],[5,3],[6,1],[7,7]];
                /* Recent Items Customer Chart */
                if ($("#recent-items-customer")[0]) {
                    $.plot($("#recent-items-customer"), [
                        {data: text, lines: { show: true, fill: 0.8 }, label: 'Items', stack: true, color: '#4CAF50' },
                    ], options);
                }
                /* Recent Items Client Chart */
                if ($("#recent-items-client")[0]) {
                    $.plot($("#recent-items-client"), [
                        {data: getRandomData(), lines: { show: true, fill: 0.8 }, label: 'Items', stack: true, color: '#26c6da' },
                    ], options);
                }
                /* Recent Items Loan Chart */
                if ($("#recent-items-loan")[0]) {
                    $.plot($("#recent-items-loan"), [
                        {data: getRandomData(), lines: { show: true, fill: 0.8 }, label: 'Items', stack: true, color: '#FF9800' },
                    ], options);
                }
                /* Tooltips for Flot Charts */

                if ($(".flot-chart")[0]) {
                    $(".flot-chart").bind("plothover", function (event, pos, item) {
                        if (item) {
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);
                            $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
                        }
                        else {
                            $(".flot-tooltip").hide();
                        }
                    });

                    $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                }
            }
        }
    })

    //-----------------------------------------------
    // BAR CHART
    //-----------------------------------------------

    .directive('barChart', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                setTimeout(function () {
                    var branch = scope.branch;
                    var data1 = scope.principal;
                    var data2 = scope.interest;
                    var data3 = scope.cashout;
                    var branch_chart = scope.branch_chart

                    /* Create an Array push the data + Draw the bars*/

                    var barData = new Array();

                    barData.push({
                        data : data1,
                        label: 'Principal',
                        color: '#8BC34A',
                        bars : {
                            show : true,
                            barWidth : 0.25,
                            order : 1,
                            lineWidth: 0,
                            fillColor: '#8BC34A'
                        }
                    });

                    barData.push({
                        data : data2,
                        label: 'Interest',
                        color: '#00BCD4',
                        bars : {
                            show : true,
                            barWidth : 0.25,
                            order : 2,
                            lineWidth: 0,
                            fillColor: '#00BCD4'
                        }
                    });

                    barData.push({
                        data : data3,
                        label: 'Cashout',
                        color: '#FF9800',
                        bars : {
                            show : true,
                            barWidth : 0.25,
                            order : 3,
                            lineWidth: 0,
                            fillColor: '#FF9800'
                        }
                    });

                    /* Let's create the chart */
                    $.plot($(element), barData, {
                        grid : {
                                borderWidth: 1,
                                borderColor: '#eee',
                                show : true,
                                hoverable : true,
                                clickable : true
                        },

                        yaxis: {
                            tickColor: '#eee',
                            tickDecimals: 0,
                            font :{
                                lineHeight: 13,
                                style: "normal",
                                color: "#9f9f9f",
                            },
                            shadowSize: 0
                        },

                        xaxis: {
                            tickColor: '#fff',
                            tickDecimals: 0,
                            ticks: branch_chart,
                            font :{
                                lineHeight: 13,
                                style: "normal",
                                color: "#9f9f9f"
                            },
                            shadowSize: 0,
                        },

                        legend:{
                            container: '.flc-bar',
                            backgroundOpacity: 0.5,
                            noColumns: 0,
                            backgroundColor: "white",
                            lineWidth: 0
                        }
                    }
                    );
                    /* Tooltips for Flot Charts */

                    if ($(".flot-chart")[0]) {
                        $(".flot-chart").bind("plothover", function (event, pos, item, filter) {
                            if (item) {

                                var x = branch[(item.datapoint[0].toFixed(0))-1],
                                    y = format(item.datapoint[1].toFixed(2));
                                $(".flot-tooltip").html(item.series.label + " of " + x + " = " + y).css({top: item.pageY+5, left: item.pageX+5}).show();
                            }
                            else {
                                $(".flot-tooltip").hide();
                            }
                        });

                        $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                    }
                }, 10);

                format = function(num){
                    var decimals = 2;
                    var number = (num + '').replace(/[^0-9+\-Ee.]/g, '');
                    var n = !isFinite(+num) ? 0 : +num,
                        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                        s = '',
                        toFixedFix = function(n, prec) {
                            var k = Math.pow(10, prec);
                            return '' + (Math.round(n * k) / k)
                                .toFixed(prec);
                        };

                    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                        .split('.');
                    if (s[0].length > 3) {
                        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
                    }
                    if ((s[1] || '')
                        .length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1)
                            .join('0');
                    }
                    return s.join(dec);
                }
            }
        }
    })

    //-----------------------------------------------
    // OPEN LINKS
    //-----------------------------------------------

    .directive('setlinks', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                element.on('change', function(event){
                    var linkFromAttr = document.getElementById(element[0].attributes[0].value);
                    var link  = "";
                    if(document.getElementById(element[0].attributes[0].value).value === "Messenger"){
                        link = "https://www.messenger.com/";
                    }
                    else if(document.getElementById(element[0].attributes[0].value).value === "Skype"){
                        link = "https://web.skype.com/";
                    }
                    else if(document.getElementById(element[0].attributes[0].value).value === "Hangouts"){
                        link = "https://hangouts.google.com/";
                    }
                    else if(document.getElementById(element[0].attributes[0].value).value === "Meet.Jit"){
                        var today = new Date();
                        link = "https://meet.jit.si/"+today.toDateString().replace(/ /g, '');
                    }
                    linkFromAttr.setAttribute("data-link",link);
                });
            }
        }
    })

    .directive('openlinks', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.bind('click', function(event){
                    window.open(element[0].attributes[0].value);
                });
            }
        }
    })

    // ----------------------------------------------
    //  TIME INPUT
    // ----------------------------------------------

    .directive('timeInput', function(){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl){
                modelCtrl.$parsers.push(function(inputValue){
                    if (inputValue == null){
                        return '';
                    }
                    else{
                        $(element).inputmask({
                            mask: '99:99 aa',
                            placeholder: "hh:mm am",
                            showMaskOnHover: false,
                        });

                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                    return inputValue;
                });
            }
        }
    })

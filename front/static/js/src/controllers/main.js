kwaderno
    .controller('MainCtrl',function($rootScope,$timeout,$http,$scope,helper,$state,$filter,webStorage,NgTableParams,$filter,createModal,$stateParams,prompt){
        var self            =   this;
        $scope.isLogged     =   true;
        $scope.active_state =   $state;
        $scope.body         =   document.body.style;
        $scope.isMobile     =   window.innerWidth > 768 ? false : true;
        $scope.toggled      =   window.innerWidth > 768 ? true : false;
        $scope.didClick     =   window.innerWidth > 768 ? true : false;
        $scope.winWidth     =   window.innerWidth;
        $scope.mswinHeight  =   window.innerHeight;
        $scope.winHeight    =   window.innerHeight;

        $scope.project      =   {};
        $scope.document     =   {};
        $scope.navigation_state =   "planning";

        this.currentSkin = 'default';

        $(window).resize(function(){
            $scope.$apply(function(){
               $scope.winWidth  =   window.innerWidth;
               $scope.winHeight =   window.innerHeight;
               if(window.innerWidth <= 768){ document.body.classList.add('mobile'); }
               else{ document.body.classList.remove('mobile'); }
            });
        });

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
           document.body.classList.add('mobile');
           this.isMobile    =   true;
        }

        this.$state = $state;

        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }

        $scope.hoverBgColor = function(ev,type){
            if(type == 'in'){
                    ev.currentTarget.style.backgroundColor = '#f7f7f7';
            }
            else if(type == 'out'){
                    ev.currentTarget.style.backgroundColor = '';
            }
        }

        $scope.doClick  =   function(event){
            $scope.toggled    =  !$scope.toggled;
            $scope.didClick   =  !$scope.didClick;
            setTimeout(function(){
                if($scope.toggled){
                    $scope.winWidth > 768 ? $scope.body.overflow = 'auto' : $scope.body.overflow = 'hidden';
                    document.body.classList.add('nav-opened');
                }
                else{
                    var openSubmenu  =  document.querySelectorAll('.toggled');
                    if(openSubmenu.length > 0){
                        for(var i = 0; i < openSubmenu.length; i++){
                            openSubmenu[i].classList.remove('toggled');
                            openSubmenu[i].querySelector("UL")["style"].maxHeight = '0px';
                        }
                    }
                    $scope.body.overflow = 'auto';
                      document.body.classList.remove('nav-opened');
                  }
            },100)
        }

        $scope.doClickMobile    =   function(ev){
            var parent    =    helper.getParent('LI',ev.target,'tag');
            if(parent.classList.contains('open')){
                parent.classList.remove('open');
                setTimeout(function(){
                    document.querySelector('.nav-right').classList.remove('hidden');
                },100)
            }
            else{
                parent.classList.add('open');
                document.querySelector('.nav-right').classList.add('hidden');
            }
            $scope.doClick();
        }

        $scope.doEnter  =   function(type){
            if(!self.isMobile && !$scope.didClick){
                var timer = null;
                if(type == 'e'){
                    if(!$scope.toggled){
                        setTimeout(function(){
                            $timeout(function(){
                                $scope.$apply(function(){
                                    $scope.toggled = !$scope.toggled;
                                })
                            })
                        },200)
                    }
                }
                else if(type == 'l'){
                    $timeout(function(){
                        $scope.$apply(function(){
                            $scope.toggled = !$scope.toggled;
                        })
                    })

                }
            }
        }

        $scope.doLogout = function(){
            if((webStorage.local.has('user-view'))&&(webStorage.local.has('user-info'))){
                webStorage.local.remove('user-view');
                webStorage.local.remove('user-info');
            }
            $state.go('index');
            $state.go('index');
        }

        $scope.openModalForm = function(param, id){

              if (param === "details") {
                $scope.project_id = id;
                createModal.modalInstances(true, "m", 'static', false,$scope.modalContent,'projectModal.html',$scope);
              }
              else if (param === "login") {
                createModal.modalInstances(true, "m", 'static', false,$scope.modalContent,'loginModal.html',$scope);
              }
        }
    })

    .controller('LoginCtrl', function($rootScope, $scope, $http, growlService, $state, $stateParams, webStorage, $timeout,$window, NgTableParams, $filter, createModal, prompt) {
        
        $scope.login      = {};
        $scope.toggle     = {};

        $scope.toggle.login         = 1;

        $scope.onLogin = function(){
            console.log($scope.login, "LOGIN");
            $state.go('poem.wall');
        }

    })

    //==============================================================================
    // MODAL
    //==============================================================================
    .controller('ModalInstanceCtrl', function ($rootScope, $scope, $uibModalInstance, content,$uibModalStack){
        $rootScope.modalContent =   content; {};

        $rootScope.ok = function(){
            $uibModalInstance.close();
        }

        $rootScope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        }

        $rootScope.dismissAll = function(){
            $uibModalStack.dismissAll();
        }
    })

    // PROFILE
    .controller('profileCtrl', function(growlService){
        
        //Get Profile Information from profileService Service
        
        //User
        this.profileSummary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";
    
        this.fullName = "Mallinda Hollaway";
        this.gender = "female";
        this.birthDay = "23/06/1988";
        this.martialStatus = "Single";
        this.mobileNumber = "00971123456789";
        this.emailAddress = "malinda.h@gmail.com";
        this.twitter = "@malinda";
        this.twitterUrl = "twitter.com/malinda";
        this.skype = "malinda.hollaway";
        this.addressSuite = "44-46 Morningside Road";
        this.addressCity = "Edinburgh";
        this.addressCountry = "Scotland";

        //Edit
        this.editSummary = 0;
        this.editInfo = 0;
        this.editContact = 0;
    
        
        this.submit = function(item, message) {            
            if(item === 'profileSummary') {
                this.editSummary = 0;
            }
            
            if(item === 'profileInfo') {
                this.editInfo = 0;
            }
            
            if(item === 'profileContact') {
                this.editContact = 0;
            }
            
            growlService.growl(message+' has updated Successfully!', 'inverse'); 
        }

    })
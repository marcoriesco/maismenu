angular.module('cardapioAdminApp',[
    'ui.router',
    'ngAnimate',
    'ngResource',
    'ngMaterial',
    'ngSanitize',
    'ngAria',
    'ngLocale',
    'angularFileUpload',
    'constants',
    'cardapioAdminApp.auth',
    'cardapioAdminApp.config',
    'cardapioAdminApp.controllers',
    'cardapioAdminApp.directives',
    'cardapioAdminApp.filters',
    'cardapioAdminApp.modules',
    'cardapioAdminApp.services'
])

//Routes
.config(function($stateProvider, $locationProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('admin',{
        url         : '/:client',
        abstract    : true,
        templateUrl : 'partials/admin.html',
        cache       : false
    })

    .state('admin.dashboard',{
        url           : '/dashboard',
        templateUrl   : 'partials/dashboard.html',
        controller    : 'DashboardController',
        data          : {
            pageTitle : 'Dashboard'
        }
    })

    .state('admin.products',{
        url           : '/products',
        templateUrl   : 'partials/products.html',
        controller    : 'ProductsController',
        data          : {
            pageTitle : 'Produtos'
        }
    })
    .state('admin.addProduct',{
        url           : '/products/add',
        templateUrl   : 'partials/products_add.html',
        controller    : 'AddProductsController',
        data          : {
            pageTitle : 'Adicionar Novo Produto'
        }
    })
    .state('admin.editProduct',{
        url           : '/products/:id/edit',
        templateUrl   : 'partials/products_edit.html',
        controller    : 'EditProductsController',
        data          : {
            pageTitle : 'Editar Produto'
        }
    })
    .state('admin.catsProduct',{
        url           : '/products/cats',
        templateUrl   : 'partials/products_cats.html',
        controller    : 'ProductsCatsController',
        data          : {
            pageTitle : 'Categorias dos Produtos'
        }
    })

    // Banners
    .state('admin.banners',{
        url           : '/banners',
        templateUrl   : 'partials/banners.html',
        controller    : 'BannersController',
        data          : {
            pageTitle : 'Banners'
        }
    })
    .state('admin.addBanner',{
        url           : '/banners/add',
        templateUrl   : 'partials/banners_add.html',
        controller    : 'AddBannersController',
        data          : {
            pageTitle : 'Adicionar Novo Banner'
        }
    })
    .state('admin.editBanner',{
        url           : '/banners/:banner/edit',
        templateUrl   : 'partials/banners_edit.html',
        controller    : 'EditBannersController',
        data          : {
            pageTitle : 'Editar Banner'
        }
    })


    // Config
    .state('admin.config',{
        url           : '/config',
        templateUrl   : 'partials/config.html',
        controller    : 'SettingsController',
        data          : {
            pageTitle : 'Configurações',
        }
    })

    // Media
    .state('admin.media',{
        url           : '/media',
        templateUrl   : 'partials/media.html',
        controller    : 'MediaController',
        data          : {
            pageTitle : 'Media',
        }
    })

    // Profile
    .state('admin.profile',{
        url           : '/profile',
        controller    : 'ProfileController',
        templateUrl   : 'partials/profile.html',
        data          : {
            pageTitle : 'Perfil'
        }
    })

    // AUTH
    .state('admin.login',{
        url           : '/login',
        controller    : 'LoginController',
        templateUrl   : 'partials/auth/login.html',
        data          : {
            pageTitle : 'Login'
        }
    })
    .state('admin.logout',{
        url           : '/logout',
        controller    : 'LogoutController',
        templateUrl   : 'partials/auth/login.html'
    })
    .state('admin.resetpass',{
        url           : '/reset',
        controller    : 'ResetPassController',
        templateUrl   : 'partials/auth/reset.html',
        data          : {
            pageTitle : 'Resetar Senha'
        }
    });



    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode({
        enabled     : false,
        requireBase : false
    });

})

.run(function($rootScope, $state, $stateParams, $window, $location, AuthenticationService, userService, CLIENTS, PRODUCTS_USER) {

    $rootScope.$state       = $state;
    $rootScope.$stateParams = $stateParams;

    CLIENTS.one('teste').get()
    .then(function(res){
        //console.log(res);
        $rootScope.client = res;
    });

    PRODUCTS_USER.one('teste').get()
    .then(function(res){
        // console.log(res);
        $rootScope.products = res;
    });


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // Auth
        var shouldLogin = !$window.sessionStorage.token && !AuthenticationService.isLogged;

        //$rootScope.Authenticated = shouldLogin;

        var isLogin = toState.name === 'admin.login';
        if(isLogin){
           return;
        }

        if(shouldLogin) {
            $location.url(toParams.client+ '/login');
            return;
        }

        // get Client data
        //if($window.sessionStorage.token) {
            //userService.getUser();

            //if(!$rootScope.client) {

                CLIENTS.one('teste').get()
                .then(function(res){
                    // console.log(res);
                    $rootScope.client = res;
                });
            //}

            PRODUCTS.one('teste').get()
            .then(function(res){
                // console.log(res);
                $rootScope.products = res;
            });

        //}

    });

});


angular.module( 'choreizo.login', [
  'ui.state'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})


.controller( 'LoginCtrl', function LoginController( $scope ) {
  paypal.use( ["login"], function(login) {
    login.render ({
      "appid": "ASZRYxC_kgoVeRN-28FmCUW6MkT5gLcpMZr2M4WBAnpz-bbFs_8AQaUpDrHX",
      "scopes": "profile email address phone https://uri.paypal.com/services/paypalattributes",
      "containerid": "login-paypal",
      "locale": "en-gb",
      "returnurl": "http://choreizo.localhost/paypal_login_callback"
    });
  });
})

;


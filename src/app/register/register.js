
angular.module( 'choreizo.register', [
  'ui.state'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'RegisterCtrl',
        templateUrl: 'register/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})


.controller( 'RegisterCtrl', function RegisterController( $location, $scope, CurrentUser, CurrentUserHabitat) {

    $scope.user = CurrentUser.get(null, function() {
        console.log($scope.user);
        if (typeof $scope.user.habitat === 'undefined') {
            $scope.habitat = new CurrentUserHabitat();
        } else {
            $location.path("/people");
        }
    });

    $scope.save = function(user, habitat) {
        user.$update();
        habitat.$save(null, function() {
            $location.path("/people/add");
        });      
    }

})

;


angular.module( 'choreizo', [
  'templates-app',
  'templates-common',
  'choreizo.home',
  'choreizo.login',
  'choreizo.register',
  'ui.state',
  'ui.route',
  'ngResource'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
  
})
 
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Choreizo' ;
    }
  });
})

.factory('User', function($resource) {
  return $resource('http://choreizo.localhost/api/users/:userId',
    { userId:'@id' },
    { update: { method: 'PUT' }}
  );
})

.factory('CurrentUser', function($resource) {
  return $resource('http://choreizo.localhost/api/currentuser',
    { userId:'@id' },
    { update: { method: 'PUT' }}
  );
})

.factory('CurrentUserHabitat', function($resource) {
  return $resource('http://choreizo.localhost/api/currentusers/habitats',
    { userId:'@id' },
    { update: { method: 'PUT' }}
  );
})

.factory('Invite', function($resource) {
  return $resource('http://choreizo.localhost/api/invites/:userId',
    { userId:'@id' },
    { update: { method: 'PUT' }}
  );
})

.factory('Housemate', function($resource) {
  return $resource('http://choreizo.localhost/api/habitats/:habitatId/users', 
    null,
    { update: { method: 'PUT' }}
  
  );
})

.factory('Chore', function($resource) {
  return $resource('http://choreizo.localhost/api/habitats/:habitatId/chores'
  );
})

.factory('UserChore', function($resource) {
  return $resource('http://choreizo.localhost/api/currentuser/chores'
  );
})

.factory('UserDebt', function($resource) {
  return $resource('http://choreizo.localhost/api/users/:userId/chore/debt');
})

.factory('AuthService', function(CurrentUser) {
  var currentUser = CurrentUser.get();
  return {
      currentUser: function() { return currentUser; }
  };
});

;


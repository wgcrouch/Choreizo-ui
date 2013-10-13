
angular.module( 'choreizo.home', [
  'ui.state'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
  
  //People index
  $stateProvider.state( 'people', {
    url: '/people',
    views: {
      "main": {
        controller: 'PeopleCtrl',
        templateUrl: 'home/people.tpl.html'
      }
    },
    data:{ pageTitle: 'Housemates' }
  });
  
  //Chores index
  $stateProvider.state( 'chores', {
    url: '/chores',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/chores.tpl.html'
      }
    },
    data:{ pageTitle: 'Chores' }
  });
  
  //People Add
  $stateProvider.state( 'people_add', {
    url: '/people/add',
    views: {
      "main": {
        controller: 'PeopleAddCtrl',
        templateUrl: 'home/people_add.tpl.html'
      }
    },
    data:{ pageTitle: 'Invite Housemate' }
  });
  
  //Chores Add
  $stateProvider.state( 'chores_add', {
    url: '/chores/add',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/chores_add.tpl.html'
      }
    },
    data:{ pageTitle: 'Add Chore' }
  });
  
})


.controller( 'HomeCtrl', function HomeController( $scope ) {
  
})
    

.controller( 'PeopleAddCtrl', function PeopleAddController( $location, $scope, Invite) {
    $scope.invite = new Invite();
    $scope.send = function(invite) {
        invite.$save(null, function() {
            $location.path("/people");
        });
    }
})

.controller( 'PeopleCtrl', function PeopleController($location, $scope, Housemate, CurrentUser) {
    var user = CurrentUser.get(function() {
      console.log(user);
      $scope.habitat = user.habitat;
      $scope.people = Housemate.query({habitatId: user.habitat.id});
    });

    $scope.go = function ( path ) {
      $location.path( path );
    };
})

;


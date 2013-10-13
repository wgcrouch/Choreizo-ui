
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
        controller: 'ChoresCtrl',
        templateUrl: 'home/chores.tpl.html'
      }
    },
    data:{ pageTitle: 'Chores' }
  });

   //Chores index
  $stateProvider.state( 'my_chores', {
    url: '/chores/mine',
    views: {
      "main": {
        controller: 'MyChoresCtrl',
        templateUrl: 'home/my_chores.tpl.html'
      }
    },
    data:{ pageTitle: 'My Chores' }
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
        controller: 'ChoreAddCtrl',
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
    };
})

.controller( 'PeopleCtrl', function PeopleController($location, $scope, Housemate, CurrentUser, UserDebt) {
    var user = CurrentUser.get(function() {
        $scope.habitat = user.habitat;
        $scope.people = Housemate.query({habitatId: user.habitat.id});
        $scope.debts = UserDebt.query({userId: user.id});
    });

    $scope.go = function ( path ) {
        $location.path( path );
    };
})

.controller( 'ChoresCtrl', function ChoresController($location, $scope, Housemate, CurrentUser, Chore) {
    var user = CurrentUser.get(function() {
        $scope.habitat = user.habitat;
        $scope.chores = Chore.query({habitatId: user.habitat.id});
    });

    $scope.go = function ( path ) {
        $location.path( path );
    };
})

.controller( 'MyChoresCtrl', function MyChoresController($location, $scope, Housemate, CurrentUser, UserChore) {
    var user = CurrentUser.get(function() {
        $scope.habitat = user.habitat;
        $scope.chores = UserChore.query();
    });

    $scope.go = function ( path ) {
        $location.path( path );
    };
})

.controller( 'ChoreAddCtrl', function ChoreAddController($location, $scope, CurrentUser, Housemate, Chore) {
    $scope.people = [];
    var user = CurrentUser.get(function() {
        $scope.habitat = user.habitat;
        var people = Housemate.query({habitatId: user.habitat.id}, function() {
            for (var i = 0; i < people.length; i++) {
                person = people[i];
                var name = person.invite ? 'Invited: ' + person.email : person.first_name;
                $scope.people.push({name: name, id: person.id, position: i});
            }
        });
        $scope.chore = new Chore();
    });

    $scope.linkedPeople = [];
    $scope.selectedOption = [];

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.addPerson = function() {
        $scope.linkedPeople.push($scope.selectedOption); 
        delete($scope.people[$scope.people.indexOf($scope.selectedOption)]);
    }

    $scope.create = function(chore) {
        chore.users = $scope.linkedPeople.map(function(obj) {return obj.id});
        chore.$save({'habitatId' : user.habitat.id});
        $location.path("/chores");
    };
    
})


;


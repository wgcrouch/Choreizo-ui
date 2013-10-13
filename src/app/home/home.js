
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
        controller: 'HomeCtrl',
        templateUrl: 'home/people.tpl.html'
      }
    },
    data:{ pageTitle: 'People' }
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
        controller: 'HomeCtrl',
        templateUrl: 'home/people_add.tpl.html'
      }
    },
    data:{ pageTitle: 'Add Person' }
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

;


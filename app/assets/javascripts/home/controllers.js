/**
 * Home controllers.
 */
define([], function() {
  'use strict';

  /** Controls the index page */
  var HomeCtrl = function($scope, $rootScope, $location, $http, userService, $timeout) {
      $rootScope.pageTitle = 'Newsfeed';
      $scope.$watch(function () {
          var user = userService.getUser();
          return user;
      }, function (user) {
          $scope.user = user;
      }, true);

      $scope.reloadNewsfeed = function () {
          $http({
              method: 'GET',
              url: 'http://localhost:9000/tweets/newsfeed'
          }).success(function (data) {
              $scope.newsfeed = data;
          }).error(function (data) {
              console.error("Error on newfeed load: " + data);
          });
      }

    $scope.getUserSuggestions = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:9000/discover/users/three'
        }).success(function (data) {
            $scope.userSuggestions = data;
        }).error(function (data) {
            console.error("Error on newfeed load: " + data);
        });
    }
      $scope.getUserSuggestions();
      $scope.reloadNewsfeed()

      var poll = function() {
          $timeout(function() {
              $scope.reloadNewsfeed()
              poll();
          }, 30000);
      };
      poll();

  };
  HomeCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'userService', '$timeout'];

  /** Controls the header */
  var HeaderCtrl = function($scope, userService, helper, $location) {
    // Wrap the current user from the service in a watch expression
    $scope.$watch(function() {
      var user = userService.getUser();
      return user;
    }, function(user) {
      $scope.user = user;
    }, true);

    $scope.logout = function() {
      userService.logout();
      $scope.user = undefined;
      $location.path('/');
    };
  };
  HeaderCtrl.$inject = ['$scope', 'userService', 'helper', '$location'];

  /** Controls the footer */
  var FooterCtrl = function(/*$scope*/) {
  };
  //FooterCtrl.$inject = ['$scope'];

  return {
    HeaderCtrl: HeaderCtrl,
    FooterCtrl: FooterCtrl,
    HomeCtrl: HomeCtrl
  };

});

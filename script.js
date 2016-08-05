var app = angular.module("scrumit", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider.when("/task", {
      templateUrl: "view-task.html",
      controller: "taskController"
    })
    .when("/task/add", {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when("/task/:x", {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .otherwise({
      redirectTo: "/task"
    })
});

app.factory("taskFactory", ["$rootScope", function($rootScope) {
  var svc = {};

  var data = [{
    teamMember: "Member1",
    task: "FTD design",
    status: "In Progress"
  }, {
    teamMember: "Member2",
    task: "Technical design",
    status: "In Progress"
  }, {
    teamMember: "Member3",
    task: "Design Review",
    status: "To Do"
  }];

  svc.getTask = function() {
    return data;
  };

  svc.addTask = function(task) {
    data.push(task);
  };

  svc.editTask = function(index, task) {
    data[index] = task;
  };
  
  svc.deleteTask = function(index) {
    data.splice(index, 1);
  };
  return svc;
}]);

app.controller("taskController", ["$scope", "$location", "$routeParams", "taskFactory",
  function($scope, $location, $routeParams, taskFactory) {

    $scope.data = taskFactory.getTask();

    $scope.addTask = function() {
      $location.path("/task/add");
    };

    $scope.editTask = function(index) {
      $location.path("/task/" + index);
    };
  }
]);

app.controller("addController", ["$scope", "$location", "$routeParams", "taskFactory",
  function($scope, $location, $routeParams, taskFactory) {
    $scope.save = function() {
      taskFactory.addTask({
        teamMember: $scope.item.teamMember,
        task: $scope.item.task,
        status: $scope.item.status
      });
      $location.path("/task");
    };

    $scope.cancel = function() {
      $location.path("/task");
    };
  }
]);

app.controller("editController", ["$scope", "$location", "$routeParams", "taskFactory",
  function($scope, $location, $routeParams, taskFactory) {

    $scope.item = taskFactory.getTask()[parseInt($routeParams.x)];

    $scope.save = function() {
        taskFactory.editTask(parseInt($routeParams.x),{
        teamMember: $scope.item.teamMember,
        task: $scope.item.task,
        status: $scope.item.status
      });
      $location.path("/task");
    };

    $scope.cancel = function() {
      $location.path("/task");
    };
    
    $scope.delete = function() {
      taskFactory.deleteTask(parseInt($routeParams.x));
      $location.path("/task");
    };
  }
]);
'use strict';

var agetaApp = angular.module('agetaApp', ['ngRoute', 'agetaControllers', 'ui.bootstrap']);

var templatePath = `file://${__dirname}`;
templatePath = templatePath.replace('\config', '');

var config = {
	apiKey: "AIzaSyBmIKp9hWHzme-d2r7Ii7s8pcxVic-hMj8",
	authDomain: "stdiosoft-firebase.firebaseapp.com",
	databaseURL: "https://stdiosoft-firebase.firebaseio.com",
	projectId: "stdiosoft-firebase",
	storageBucket: "stdiosoft-firebase.appspot.com",
	messagingSenderId: "193651828811"
};
firebase.initializeApp(config);
var database = firebase.database();

agetaApp.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: templatePath + '/views/home.html',
			controller: 'homeController'
		})
	$routeProvider
		.when('/login', {
			templateUrl: templatePath + '/views/login.html',
			controller: 'loginController'
		})
	$routeProvider
		.when('/register', {
			templateUrl: templatePath + '/views/register.html',
			controller: 'registerController'
		})
		.otherwise({
			redirectTo: '/login'
		});
});

agetaApp.directive('mouseHover', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			// element.on('click', function () {
			// 	element.html('You clicked me!');
			// });
			element.on('mouseenter', function () {
				var childEl = element[0].querySelectorAll('#hoverShowedItems');
				//childEl[0].style.display = 'block';
				//childEl[0].style.visibility =  "visible";

			});
			element.on('mouseleave', function () {
				var childEl = element[0].querySelectorAll('#hoverShowedItems');
				//childEl[0].style.display = 'none';
				//childEl[0].style.visibility =  "hidden";
			});
		}
	};
});

agetaApp.directive('file', function () {
	return {
		scope: {
			file: '='
		},
		link: function (scope, el, attrs) {
			el.bind('change', function (event) {
				var files = event.target.files;
				var file = files[0];
				scope.file = file ? file.name : undefined;
				scope.$apply();
			});
		}
	};
});
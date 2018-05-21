'use strict';

var agetaControllers = angular.module('agetaControllers', []);

// notifier.notify(
// 	{
// 		title: 'Ageta',
// 		message: 'Hello from node, Mr. User!',
// 		icon: path.join(__dirname, '/assets/icons/filled.png'), // Absolute path (doesn't work on balloons)
// 		sound: true,
// 		wait: true
// 	},
// 	function (err, response) {
// 		console.log(response);
// 	}
// );


// notifier.on('click', function (notifierObject, options) {
// 	var window = remote.getCurrentWindow();
// 	window.focus();
// });

// notifier.on('timeout', function (notifierObject, options) {
// 	console.log("timeout");
// });

// const fs = require("fs");
// var students = [];
// fs.readdir('.', (err, dir) => {
// 	//console.log(dir);
// 	for (let filePath of dir) {

// 		console.log(filePath);
// 		var tes = { name: filePath, city: filePath };
// 		students.push(tes);
// 	}
// });

const electron = require('electron');
const path = require('path');
//const notifier = require('node-notifier');
const remote = require('electron').remote;
const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

agetaControllers.controller('homeController', ['$scope', '$timeout', function ($scope, $timeout) {

	$scope.addNew = [
		'Note',
		'New List'
	];

	$scope.current_window = remote.getCurrentWindow();
	$scope.current_window.setPosition(width / 3, height / 3);
	$scope.current_window.setMaximumSize(width / 3, height / 1.5);
	$scope.current_window.setMinimumSize(width / 2.5, height / 2);
	$scope.current_window.setSize(width / 2.5, height / 1.5);
	$scope.current_window.setPosition(Math.round(width - 770), Math.round(0));
	$scope.addNewItem = false;

	$scope.closeApp = function () {
		var window = remote.getCurrentWindow();
		window.close();
	};

	$scope.bringBack = function () {
		var window = remote.getCurrentWindow();
		if (!window.isMaximized()) {
			window.maximize();
		} else {
			window.minimize();
		}
	};

	var commentsRef = firebase.database().ref('lists/');
	$scope.allLists = [];

	commentsRef.on('value', function (snapshot) {
		$timeout(function () {
			$scope.allLists = [];
			snapshot.forEach(function (childSnapshot) {
				var childData = childSnapshot.val();
				childData.key = childSnapshot.key;
				$scope.allLists.push(childData);
			});
		});
	});

	commentsRef.on('child_added', function (data) {
		//addCommentElement(postElement, data.key, data.val().text, data.val().author);
	});

	commentsRef.on('child_changed', function (data) {
		//$scope.allLists = data.val();
	});

	commentsRef.on('child_removed', function (data) {
		//document.getElementById("list-" + data.key).remove();
	});

	$scope.addList = function (list) {
		list = {
			name: 'New List',
			items: []
		};
		firebase.database().ref('lists/').push(list);
	};

	$scope.deleteList = function (list) {
		if (confirm("Are you sure to delete '" + list.name + "' list ?")) {
			firebase.database().ref('lists/').child(list.key).remove();
		}
	};

	$scope.updateList = function (list) {
		firebase.database().ref('lists/' + list.key).update({ name: list.name });
		$scope.editListName = false;
	};

	$scope.addItem = function (list, item) {
		if (item.notifyDate instanceof Date) {
			item.notifyDate = item.notifyDate.getTime();
		}
		if (item.key) {
			firebase.database().ref('lists/' + list.key + '/items/' + item.key).set(item);
		} else {
			var key = item.key = +new Date();
			firebase.database().ref('lists/' + list.key + '/items/' + item.key).set(item);
		}
		$scope.addNewItem = false;
		$scope.item = null;
	};

	$scope.deleteItem = function (list, item) {
		if (confirm("Are you sure to delete this item ?")) {
			firebase.database().ref('lists/' + list.key + '/items/' + item.key).remove();
		}
	};

	$scope.editItem = function (list, item, addNewItem) {
		$scope.item = item;
		$scope.addNewItem = !$scope.addNewItem;
	}

}]);

agetaControllers.controller('loginController', function ($location, $scope) {
	$scope.loginData = {};

	$scope.current_window = remote.getCurrentWindow();
	$scope.current_window.setPosition(width / 3, height / 3);
	$scope.current_window.setMaximumSize(410, 400);
	$scope.current_window.setMinimumSize(410, 400);
	$scope.current_window.setSize(410, 400);
	$scope.current_window.setResizable(false);


	$scope.login = function () {
		$location.path("/home");
	};

});

agetaControllers.controller('registerController', ['$scope', function ($scope) {

}]);
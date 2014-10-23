var Home;
(function (Home) {
	var Controller = (function () {
		function Controller($scope, $http, $location, $routeParams, $filter, $anchorScroll, cfpLoadingBar) {
			this.$scope = $scope;
			this.$http = $http;
			this.$location = $location;
			this.$routeParams = $routeParams;
			//$scope.$dialog = $dialog;
			$scope.$filter = $filter;
			//this.$navigation = $navigation;
			//this.$util = $util;
			this.$anchorScroll = $anchorScroll;
			var _this = this;


			$scope.infoView = "All Items";
			$scope.hint = true;
			$scope.detailView = true;
			$scope.allRoomsViewed = true;
			$scope.viewRoom = {
				1: true, 2: true, 3: true, 4: true, 5: true, 6: true
			};
			$scope.viewRoomCheckbox = {
				1: true, 2: true, 3: true, 4: true, 5: true, 6: true
			};
			$scope.initialDataLoadCompleted = false;
			$scope.dataLoaded = false;
			$scope.submitDisabled = false;
			$scope.columnSorting1 = 'ItemName';
			$scope.columnSorting2 = 'Id';

			$scope.selectedStatusOptions = [];
			$scope.statusOptions = [
				{ Name: "Have", Id: 1 },
				{ Name: "Need", Id: 2 },
				{ Name: "Want", Id: 3 },
				{ Name: "Will Have", Id: 4 },
				{ Name: "Will Not Have", Id: 5 },
				{ Name: "Removed", Id: 6 }
			];

			$scope.selectedCategoryOptions = [];
			$scope.categoryOptions = [
				{ Name: "Entertainment", Id: 1 },
				{ Name: "Furniture", Id: 2 },
				{ Name: "Appliance", Id: 3 },
				{ Name: "Utensil", Id: 4 },
				{ Name: "Cleaning Supplies", Id: 5 },
				{ Name: "Food / Drink", Id: 6 },
				{ Name: "School / Education", Id: 7 },
				{ Name: "Personal", Id: 8 },
				{ Name: "Other", Id: 9 }
			];

			$scope.selectedUserOptions = [];
			$scope.userOptions = [
				{ Name: "Cal", Id: 1 },
				{ Name: "Max", Id: 2 },
				{ Name: "Alex", Id: 3 },
				{ Name: "Everyone", Id: 4 },
				{ Name: "No one", Id: 5 },
				{ Name: "Unsure", Id: 6 },
				{ Name: "Other", Id: 7 },
				{ Name: "Test User", Id: 8 }
			];

			$scope.selectedRoomOptions = [];
			$scope.roomOptions = [
				{ Name: "Living Room", Id: 1 },
				{ Name: "Kitchen", Id: 2 },
				{ Name: "Bathroom", Id: 3 },
				{ Name: "Cal's Room", Id: 4 },
				{ Name: "Max's Room", Id: 5 },
				{ Name: "Alex's Room", Id: 6 },
				{ Name: "Closet / Storage", Id: 7 },
				{ Name: "Undecided", Id: 8 },
				{ Name: "Other", Id: 9 },
				{ Name: "Dining Room", Id: 10 }
			];
			$scope.viewOptions = [
				{ Name: "All Items", Id: 1 },
			];

			$scope.itemsReferenceId = 0;

			$scope.editedItem = false;

			$scope.addedItems = [];		//store highest Id and use as reference for adding on
			$scope.editedItems = [];	//use $scope.apartmentItems.Id to compare/replace/update
			$scope.apartmentItems = [];

			$scope.includeDeletedItems = false;

			$scope.errorList = [];

			$scope.initializeAllData = function () {
				return _this.initializeAllData();
			};
			$scope.addNewItem = function (roomId) {
				return _this.addNewItem(roomId);
			};
			$scope.saveAddedItem = function (addedRowId, isNewItem) {
				return _this.saveAddedItem(addedRowId, isNewItem);
			};
			$scope.editItem = function (index) {
				return _this.editItem(index);
			};
			$scope.isEditedItem = function (index) {
				return _this.isEditedItem(index);
			};
			$scope.saveEditedItem = function (index) {
				return _this.saveEditedItem(index);
			};
			$scope.uploadItems = function () {
				return _this.uploadItems();
			};
			$scope.refreshAllItems = function () {
				return _this.refreshAllItems();
			};
			$scope.deleteItem = function (itemId, itemType) {
				return _this.deleteItem(itemId, itemType);
			};
			$scope.deleteError = function (index) {
				return _this.deleteError(index);
			};

			$scope.toggleViewAllRooms = function () {
				return _this.toggleViewAllRooms();
			};
			$scope.changeAllCheckbox = function (index) {
				return _this.changeAllCheckbox(index);
			};
			$scope.toggleSpecificView = function (room) {
				return _this.toggleSpecificView(room);
			};
			$scope.scrollTo = function (tagId, view, $anchorScroll) {
				return _this.scrollTo(tagId, view, $anchorScroll);
			};
			$scope.changeColumnSorting = function (columnName) {
				return _this.changeColumnSorting(columnName);
			};
			$scope.changeInfoView = function (view) {
				return _this.changeInfoView(view);
			};

			this.refreshAllItems();
		}

		Controller.$inject = [
			'$scope',
			'$http',
			'$location',
			'$routeParams',
			//'$dialog',
			'$filter',
			//'$navigation',
			//'$util',
			'$anchorScroll'
		];


		Controller.prototype.initializeAllData = function (data) {
			var _this = this;
			var tmpLength = _this.$scope.apartmentItems.length + _this.$scope.editedItems.length + _this.$scope.addedItems.length;
			_this.$scope.apartmentItems = data;

			if (!_this.$scope.initialDataLoadCompleted) {
				for (var i = tmpLength; i < _this.$scope.apartmentItems.length; i++) {
					_this.$scope.selectedStatusOptions.push(_this.$scope.statusOptions[_this.$scope.apartmentItems[i].StatusId - 1]);
					_this.$scope.selectedCategoryOptions.push(_this.$scope.categoryOptions[_this.$scope.apartmentItems[i].CategoryId - 1]);
					_this.$scope.selectedUserOptions.push(_this.$scope.userOptions[_this.$scope.apartmentItems[i].UserId - 1]);
					_this.$scope.selectedRoomOptions.push(_this.$scope.roomOptions[_this.$scope.apartmentItems[i].RoomId - 1]);
				}
			}
			_this.$scope.itemsReferenceId = _this.$scope.apartmentItems.length;
		};

		Controller.prototype.addNewItem = function (optionId) {
			var _this = this;
			var addedItemsLength = _this.$scope.addedItems.length;
			_this.$scope.itemsReferenceId++;

			var id = _this.$scope.itemsReferenceId;
			var itemName = "New Item " +(addedItemsLength+1);
			var categoryId = null;
			var userId = null;
			var roomId = null;
			var statusId = null;
			var link = null;
			var description = null;

			switch (_this.$scope.infoView) {
				case "Room":
					roomId = optionId;
					break;
				case "Category":
					categoryId = optionId;
					break;
				case "Owner":
					userId = optionId;
					break;
				case "Status":
					statusId = optionId;
					break;
			}

			_this.$scope.addedItems.push(
				{
					"Id": id,
					"ItemName": itemName,
					"CategoryId": categoryId,
					"UserId": userId,
					"RoomId": roomId,
					"StatusId": statusId,
					"Link": link,
					"Description": description
				}
			);

			_this.$scope.selectedStatusOptions.push(statusId ? _this.$scope.statusOptions[statusId - 1] : statusId);
			_this.$scope.selectedCategoryOptions.push(categoryId ? _this.$scope.categoryOptions[categoryId - 1] : categoryId);
			_this.$scope.selectedUserOptions.push(userId ? _this.$scope.userOptions[userId - 1] : userId);
			_this.$scope.selectedRoomOptions.push(roomId ? _this.$scope.roomOptions[roomId - 1] : roomId);
		};

		Controller.prototype.saveAddedItem = function (addedRowId, isNewItem) {
			var _this = this;


			//alert("blah");

			var id = null;
			var itemName = null;
			var categoryId = null;
			var userId = null;
			var roomId = null;
			var statusId = null;
			var link = null;
			var description = null;

			//check is addedItems is invalid in any way
			var addedItemsLength = _this.$scope.addedItems.length;
			var errorListLength = _this.$scope.errorList.length;
			var tmp = true;
			var spliceIndex = -1;

			var index = -1;
			for (i = 0; i < _this.$scope.addedItems.length; i++) {
				if (_this.$scope.addedItems[i].Id === addedRowId) {
					index = i;
				}
			}


			//this code is really sloppy, sorry :(
			//check status
			if (!_this.$scope.addedItems[index].StatusId || _this.$scope.addedItems[index].StatusId < 1 || _this.$scope.addedItems[index].StatusId > 6) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Status") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Status",
						Msg: 'Error: Status is invalid for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.addedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Status") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check item name
			if (!_this.$scope.addedItems[index].ItemName || _this.$scope.addedItems[index].ItemName.length > 30) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Item Name") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Item Name",
						Msg: 'Error: Item Name is invalid for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.addedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Item Name") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check category
			if (!_this.$scope.addedItems[index].CategoryId || _this.$scope.addedItems[index].CategoryId < 1 || _this.$scope.addedItems[index].CategoryId > 9) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Category") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Category",
						Msg: 'Error: Category is invalid for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.addedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Category") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check user/owner
			if (!_this.$scope.addedItems[index].UserId || _this.$scope.addedItems[index].UserId < 1 || _this.$scope.addedItems[index].UserId > 8) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "User") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "User",
						Msg: 'Error: User is invalid for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.addedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "User") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check room
			if (!_this.$scope.addedItems[index].RoomId || _this.$scope.addedItems[index].RoomId < 1 || _this.$scope.addedItems[index].RoomId > 10) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Room") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Room",
						Msg: 'Error: Room is invalid for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.addedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Room") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check Link (length)
			if (_this.$scope.addedItems[index].Link) {
				if (_this.$scope.addedItems[index].Link.length > 200) {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Link") {
							tmp = false;
						}
					}

					if (tmp) {
						_this.$scope.errorList.push({
							ErrorType: "Link",
							Msg: 'Error: Link is longer than 200 characters for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
							Id: _this.$scope.addedItems[index].Id
						});
					}
				} else {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Link") {
							spliceIndex = j;
						}
					}
					if (spliceIndex !== -1) {
						_this.$scope.errorList.splice(spliceIndex, 1);
					}
				}
			}

			spliceIndex = -1
			tmp = true;
			//check Description (length)
			if (_this.$scope.addedItems[index].Description) {
				if (_this.$scope.addedItems[ai].Description.length > 200) {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Description") {
							tmp = false;
						}
					}

					if (tmp) {
						_this.$scope.errorList.push({
							ErrorType: "Link",
							Msg: 'Error: Description is longer than 200 characters for this added item: ' + (_this.$scope.addedItems[index].ItemName ? _this.$scope.addedItems[index].ItemName : '(Item has no name)'),
							Id: _this.$scope.addedItems[index].Id
						});
					}
				} else {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.addedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Description") {
							spliceIndex = j;
						}
					}
					if (spliceIndex !== -1) {
						_this.$scope.errorList.splice(spliceIndex, 1);
					}
				}
			}

			if(_this.$scope.errorList.length > 0) {
				return;
			}

			//test to see if user is Guest or not
			if (isNewItem) {
				_this.$http.post("api/ApartmentItem/", _this.$scope.addedItems[index], {
					headers: {
						'Content-Type': 'application/json'
					}
				}).success(function (data) {
					//alert('data saved yay');

					//refresh items
					if (_this.$scope.addedItems.length <= 1) {
						_this.refreshAllItems();
					} else {
						_this.$scope.apartmentItems.push(_this.$scope.addedItems[index]);
					}
					_this.$scope.addedItems.splice(index, 1);
				}).error(function (data, status, headers, config) {
					alert('Item was NOT saved');
				});
			}
		};

		Controller.prototype.editItem = function (item) {
			var _this = this;
			//alert(Id + ' editing this item from apartmentItems. is edited: ');

			//if isEditedItem is true, then SAVE
			if (_this.isEditedItem(item.Id)) {
				_this.saveEditedItem(item.Id);
			} else if (!_this.isEditedItem(item.Id)) {
				_this.$scope.editedItems.push(item);
				_this.$scope.apartmentItems.splice(_this.$scope.apartmentItems.indexOf(item), 1);
			}
		};

		Controller.prototype.isEditedItem = function (Id) {
			var _this = this;
			var isEdited = false;
			
			for (var i = 0; i < _this.$scope.editedItems.length; i++) {
				if (_this.$scope.editedItems[i].Id === Id) {
					isEdited = true;
				}
			}
			return isEdited;
		};

		Controller.prototype.saveEditedItem = function (editedRowId) {
			var _this = this;
			var spliceIndex = -1;
			var index = -1;

			for (var i = 0; i < _this.$scope.editedItems.length; i++) {
				if (_this.$scope.editedItems[i].Id === editedRowId) {
					index = i;
				}
			}

			if (index === -1) {
				alert("Item is not a valid edited item.");
				return;
			}

			//this code is really sloppy, sorry :(
			//check status
			if (!_this.$scope.editedItems[index].StatusId || _this.$scope.editedItems[index].StatusId < 1 || _this.$scope.editedItems[index].StatusId > 6) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Status") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Status",
						Msg: 'Error: Status is invalid for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.editedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Status") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check item name
			if (!_this.$scope.editedItems[index].ItemName || _this.$scope.editedItems[index].ItemName.length > 30) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Item Name") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Item Name",
						Msg: 'Error: Item Name is invalid for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.editedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Item Name") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check category
			if (!_this.$scope.editedItems[index].CategoryId || _this.$scope.editedItems[index].CategoryId < 1 || _this.$scope.editedItems[index].CategoryId > 9) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Category") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Category",
						Msg: 'Error: Category is invalid for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.editedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Category") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check user/owner
			if (!_this.$scope.editedItems[index].UserId || _this.$scope.editedItems[index].UserId < 1 || _this.$scope.editedItems[index].UserId > 8) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "User") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "User",
						Msg: 'Error: User is invalid for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.editedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "User") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check room
			if (!_this.$scope.editedItems[index].RoomId || _this.$scope.editedItems[index].RoomId < 1 || _this.$scope.editedItems[index].RoomId > 10) {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Room") {
						tmp = false;
					}
				}

				if (tmp) {
					_this.$scope.errorList.push({
						ErrorType: "Room",
						Msg: 'Error: Room is invalid for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
						Id: _this.$scope.editedItems[index].Id
					});
				}
			} else {
				errorListLength = _this.$scope.errorList.length;
				for (var j = 0; j < errorListLength; j++) {
					if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Room") {
						spliceIndex = j;
					}
				}
				if (spliceIndex !== -1) {
					_this.$scope.errorList.splice(spliceIndex, 1);
				}
			}

			spliceIndex = -1
			tmp = true;
			//check Link (length)
			if (_this.$scope.editedItems[index].Link) {
				if (_this.$scope.editedItems[index].Link.length > 200) {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Link") {
							tmp = false;
						}
					}

					if (tmp) {
						_this.$scope.errorList.push({
							ErrorType: "Link",
							Msg: 'Error: Link is longer than 200 characters for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
							Id: _this.$scope.editedItems[index].Id
						});
					}
				} else {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Link") {
							spliceIndex = j;
						}
					}
					if (spliceIndex !== -1) {
						_this.$scope.errorList.splice(spliceIndex, 1);
					}
				}
			}

			spliceIndex = -1
			tmp = true;
			//check Description (length)
			if (_this.$scope.editedItems[index].Description) {
				if (_this.$scope.editedItems[ai].Description.length > 200) {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Description") {
							tmp = false;
						}
					}

					if (tmp) {
						_this.$scope.errorList.push({
							ErrorType: "Link",
							Msg: 'Error: Description is longer than 200 characters for this added item: ' + (_this.$scope.editedItems[index].ItemName ? _this.$scope.editedItems[index].ItemName : '(Item has no name)'),
							Id: _this.$scope.editedItems[index].Id
						});
					}
				} else {
					errorListLength = _this.$scope.errorList.length;
					for (var j = 0; j < errorListLength; j++) {
						if (_this.$scope.editedItems[index].Id === _this.$scope.errorList[j].Id && _this.$scope.errorList[j].ErrorType === "Description") {
							spliceIndex = j;
						}
					}
					if (spliceIndex !== -1) {
						_this.$scope.errorList.splice(spliceIndex, 1);
					}
				}
			}

			if (_this.$scope.errorList.length > 0) {
				return;
			}

			//alert('item being saved')
			_this.$http.put("api/ApartmentItem/" + _this.$scope.editedItems[index].Id + "/", _this.$scope.editedItems[index], {
				headers: {
					'Content-Type': 'application/json'
				}
			}).success(function (data) {
				//alert('edited item SAVED');

				//refresh data
				if (_this.$scope.editedItems.length <= 1) {
					_this.refreshAllItems();
				} else {
					_this.$scope.apartmentItems.push(_this.$scope.editedItems[index])
				}
				_this.$scope.editedItems.splice(index, 1);
			}).error(function (data, status, headers, config) {
				//alert('edited item NOT SAVED: ' + data +" " +status +" " +headers +" " +config);
			});
		};
		

		//function for adding all the editedItems and addedItems back into the apartmentItems array for upload.
		//remove all items in addedItems and editedItems
		Controller.prototype.uploadItems = function () {
			var _this = this;
			alert('Upload items call working');


			//IMPORTANT: UPDATE editedItems
			//IMPORTANT: CREATE addedItems
			//IMPORTANT: REMOVE removedItems - not necessary. Deletion is handled in the deleteItem function
			var editedItemsLength = _this.$scope.editedItems.length;
			for (var i = 0; i < editedItemsLength; i++) {
				_this.saveEditedItem(_this.$scope.editedItems[i].Id);
			}

			var addedItemsLength = _this.$scope.addedItems.length;
			for (var j = 0; j < addedItemsLength; j++) {
				_this.saveAddedItem(_this.addedItems[j].Id);
			}

			alert('items uploaded');
		};

		Controller.prototype.deleteItem = function (itemId, itemType) {
			var _this = this;

			if (itemType === 'apartmentItem') {
				//set status to Removed
				_this.$scope.apartmentItems[itemId - 1].StatusId = 6;
				_this.$scope.selectedStatusOptions[itemId - 1] = _this.$scope.statusOptions[_this.$scope.apartmentItems[itemId - 1].StatusId - 1];

			    _this.$http.put("api/ApartmentItem/" + itemId + "/", _this.$scope.apartmentItems[itemId - 1], {
					headers: { 'Content-Type': 'application/json' }
				}).success(function (data) {
				}).error(function (data, status, headers, config) {
					alert('Item NOT Deleted: ' + data + " " + status + " " + headers + " " + config);
				});
			} else if (itemType === 'editedItem') {
				//set status to Removed and save
				var index;
				for (var i = 0; i < _this.$scope.editedItems.length; i++) {
					if (_this.$scope.editedItems[i].Id === itemId) {
						index = i;
					}
				}

				//_this.$scope.editedItems[index].StatusId = 6;
				//_this.$scope.selectedStatusOptions[itemId - 1] = _this.$scope.statusOptions[_this.$scope.editedItems[index].StatusId - 1];

				//_this.saveEditedItem(itemId);

				_this.$scope.apartmentItems.push(_this.$scope.editedItems[index]);
				_this.$scope.editedItems.splice(index, 1);

			} else if (itemType === 'addedItem') {
				//remove from addedItems array
				for (var i = 0; i < _this.$scope.addedItems.length; i++) {
					if (_this.$scope.addedItems[i].Id === itemId) {
						_this.$scope.addedItems.splice(i, 1);
					}
				}
			}
		};

		Controller.prototype.deleteError = function (index) {
			var _this = this;

			_this.$scope.errorList.splice(index, 1);
		};

		Controller.prototype.refreshAllItems = function () {
			var _this = this;
			_this.$scope.dataLoaded = false;

			this.$http.get("api/ApartmentItem")
                .success(function (data) {
					_this.initializeAllData(data);

			    	_this.$scope.dataLoaded = true;
					_this.$scope.initialDataLoadCompleted = true;
			});
		};

		Controller.prototype.toggleViewAllRooms = function () {
			var _this = this;

			_this.$scope.hint = false;

			for (var room in _this.$scope.viewRoomCheckbox) {
				_this.$scope.viewRoom[room] = _this.$scope.allRoomsViewed;
				_this.$scope.viewRoomCheckbox[room] = _this.$scope.allRoomsViewed;
			}
		};

		Controller.prototype.changeAllCheckbox = function (index) {
			var _this = this;
			var trueFalse = 0;

			_this.$scope.viewRoom[index] = _this.$scope.viewRoomCheckbox[index];

			for (var room in _this.$scope.viewRoomCheckbox) {
				if (_this.$scope.viewRoomCheckbox[room] === true) {
					trueFalse++;
				} else {
					trueFalse--;
				}

				if (trueFalse === 6) {
					_this.$scope.allRoomsViewed = true;
				} else {
					_this.$scope.allRoomsViewed = false;
				}
			}
		};

		Controller.prototype.toggleSpecificView = function (room) {
			var _this = this;

			if (!_this.$scope.viewRoomCheckbox[room]) {
				_this.$scope.viewRoom[room] = !_this.$scope.viewRoom[room];
			}
		};

		Controller.prototype.scrollTo = function (tagId, view, $anchorScroll) {
			var _this = this;
			var tmp = _this.$location.hash();
			
			if (!isNaN(tagId)) {
				tagId += 1;
				tagId = tagId + "Link";
			}

			_this.$location.hash(tagId);
			_this.$anchorScroll();

			//reset to old to keep any additional routing logic from kicking in
			_this.$location.hash(tmp);
		};

		Controller.prototype.changeColumnSorting = function (columnName) {
			var _this = this;
			
			if (_this.$scope.columnSorting1 === columnName) {
				_this.$scope.columnSorting1 = '-' + columnName;
			} else if (_this.$scope.columnSorting1 === '-' + columnName) {
				_this.$scope.columnSorting1 = '';
			} else {
				_this.$scope.columnSorting1 = columnName;
			}
		};

		Controller.prototype.changeInfoView = function (view) {
			var _this = this;

			_this.$scope.infoView = view;

			//viewOptions = something depending on the view
			if (view === 'Room') {

				_this.$scope.viewOptions = _this.$scope.roomOptions;
			} else if (view === 'Category') {

				_this.$scope.viewOptions = _this.$scope.categoryOptions;
			} else if (view === 'Owner') {

				_this.$scope.viewOptions = _this.$scope.userOptions;
			} else if (view === 'Status') {

				_this.$scope.viewOptions = _this.$scope.statusOptions;
			} else if (view === 'All Items') {

				_this.$scope.viewOptions = [
					{ Name: "All Items", Id: 1 },
				];
			}
		};
		return Controller;
	})();
	Home.Controller = Controller;
})(Home || (Home = {}));

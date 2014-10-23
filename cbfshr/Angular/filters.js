angular
	.module('app.filters')
	.filter('viewFilter', [function () {
		return function (itemsList, option, infoView, includeDeletedItems) {
			var newItemsList = [];

			if (infoView === 'Room') {
				for (var index = 0 ; index < itemsList.length ; index++) {
					if (itemsList[index].RoomId === option.Id) {
						if (itemsList[index].StatusId === 6) {
							if (includeDeletedItems) {
								newItemsList.push(itemsList[index]);
							}
						} else {
							newItemsList.push(itemsList[index]);
						}
					}
				}
			} else if (infoView === 'Category') {
				for (var index = 0 ; index < itemsList.length ; index++) {
					if (itemsList[index].CategoryId === option.Id) {
						if (itemsList[index].StatusId === 6) {
							if (includeDeletedItems) {
								newItemsList.push(itemsList[index]);
							}
						} else {
							newItemsList.push(itemsList[index]);
						}
					}
				}
			} else if (infoView === 'Owner') {
				for (var index = 0 ; index < itemsList.length ; index++) {
					if (itemsList[index].UserId === option.Id) {
						if (itemsList[index].StatusId === 6) {
							if (includeDeletedItems) {
								newItemsList.push(itemsList[index]);
							}
						} else {
							newItemsList.push(itemsList[index]);
						}
					}
				}
			} else if (infoView === 'Status') {
				for (var index = 0 ; index < itemsList.length ; index++) {
					if (itemsList[index].StatusId === option.Id) {
						newItemsList.push(itemsList[index]);
					}
				}
			} else if (infoView === 'All Items') {
				for (var index = 0 ; index < itemsList.length ; index++) {
					if (itemsList[index].StatusId === 6) {
						if (includeDeletedItems) {
							newItemsList.push(itemsList[index]);
						}
					} else {
						newItemsList.push(itemsList[index]);
					}
				}
			}

			return newItemsList;
		};
	}]);

'use strict';

var MenuItem = function (config) {
    this.weight = 0;
    angular.extend(this, config);
};

MenuItem.prototype.children = function () {
    var children = [];
    angular.forEach(this, function (property) {
        if (angular.isObject(property)) {
            children.push(property);
        }
    });
    return children;
};

MenuItem.prototype.hasChildren = function () {
    for (var key in this) {
        if (this.hasOwnProperty(key) && angular.isObject(this[key])) {
            return true;
        }
    }
    return false;
};

MenuItem.prototype._isVisible = function () {
    if (angular.isFunction(this.isVisible)) {
        return this.isVisible();
    }
    if (angular.isDefined(this.isVisible)) {
        return this.isVisible;
    }
    return true;
};

MenuItem.prototype.isVisible = function () {
    return true;
};

MenuItem.prototype.isHeavy = function () {
    if (this.hasOwnProperty('weight')) {
        return this.weight >= 0;
    }
};

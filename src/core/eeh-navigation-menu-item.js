'use strict';

var MenuItem = function (config) {
    this.weight = 0;
    this.isIconVisible = true;
    this.isDivider = false;
    this.isReadOnly = false;
    this.ngBindHtml = '';
    angular.extend(this, config);
};

MenuItem.prototype.children = function () {
    var children = [];
    angular.forEach(this, function (property) {
        if (angular.isObject(property) && property instanceof MenuItem) {
            children.push(property);
        }
    });
    return children;
};

MenuItem.prototype.hasChildren = function () {
    return this.children().length > 0;
};

MenuItem.prototype._isVisible = function () {
    var hasVisibleChildren = this.children().filter(function (child) {
        return child._isVisible() !== false;
    }).length > 0;

    if (!hasVisibleChildren &&
        !this.isDivider &&
        angular.isUndefined(this.state) &&
        angular.isUndefined(this.href) &&
        angular.isUndefined(this.click) &&
        angular.isUndefined(this.ngInclude) &&
        !this.isReadOnly) {
        return false;
    }

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

MenuItem.prototype._ngBindHtml = function () {
    return angular.isFunction(this.ngBindHtml) ? this.ngBindHtml() : this.ngBindHtml;
};

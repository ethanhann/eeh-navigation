angular.module('demo')
.controller('AuthenticatedCtrl', function ($translate, $window, eehNavigation) {
    'use strict';
    eehNavigation.navbarMenuItem('user').text = 'Ethan';

    eehNavigation.navbarMenuItem('user.logout', {
        text: 'Logout',
        iconClass: 'fa-sign-out',
        click: function () {
            $window.alert('Faux logout');
        }
    });

    eehNavigation.sidebarMenuItem('click').click = function () {
        $window.alert('Tada');
    };

    var setLanguage = function (languageKey, languageName) {
        eehNavigation.navbarMenuItem('language').text = languageName;
        $translate.use(languageKey);
    };
    var defaultLanguageMenuItem = eehNavigation.navbarMenuItem('language.en');
    setLanguage('en', defaultLanguageMenuItem.text);
    defaultLanguageMenuItem.click = function () {
        setLanguage('en', this.text);
    };
    eehNavigation.navbarMenuItem('language.de').click = function () {
        setLanguage('de', this.text);
    };
});

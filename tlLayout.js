var Triarc;
(function (Triarc) {
    var Layout;
    (function (Layout) {
        angular.module('tlLayout', []);
    })(Layout = Triarc.Layout || (Triarc.Layout = {}));
})(Triarc || (Triarc = {}));
/// <reference path="tllayout.module.ts" />
var Triarc;
(function (Triarc) {
    var Layout;
    (function (Layout) {
        angular.module('tlLayout').directive('tlHeightOf', ["$rootScope", function ($rootScope) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        element.css('overflow-y', 'auto');
                        var owningClass = attrs.tlHeightOf;
                        var owningElement = $(owningClass);
                        var update = function () {
                            var previousOverflow = owningElement.css("overflow-y");
                            owningElement.css({ 'overflow': 'visible' });
                            var height = owningElement[0].scrollHeight;
                            if (attrs.tlHeightOfOffset) {
                                height += +attrs.tlHeightOfOffset;
                            }
                            element.css('height', height);
                            owningElement.css({ 'overflow': previousOverflow });
                        };
                        scope.$watch(function () { return owningElement[0].scrollHeight; }, function (val) {
                            update();
                        });
                        attrs.$observe(attrs.tlHeightOf, function (newVal) {
                            owningClass = attrs.tlHeightOf;
                            owningElement = $(owningClass);
                            update();
                        });
                        if (attrs.tlHeightOfOnEvent) {
                            var eventName = scope.$eval(attrs.tlHeightOfOnEvent);
                            scope.$on(eventName, function () {
                                update();
                            });
                        }
                    }
                };
            }]);
    })(Layout = Triarc.Layout || (Triarc.Layout = {}));
})(Triarc || (Triarc = {}));
/// <reference path="tllayout.module.ts" />
// Update the most local relative references and declare this directive.
var Triarc;
(function (Triarc) {
    var Layout;
    (function (Layout) {
        // declare correct angularjs module
        angular.module('tlLayout').directive('tlWindowHeight', [
            function () {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        var windowsListener = null;
                        attrs.$observe("tlWindowHeight", function (offset) {
                            var setHeight = function (offSetHeight) {
                                var timeout = setTimeout(function () {
                                    clearTimeout(timeout);
                                    var containerHeight = element.closest(attrs["tlWindowHeightContainerClass"]).height();
                                    element.height(containerHeight - +offSetHeight);
                                }, 10);
                            };
                            if (angular.isString(offset) && attrs["tlWindowHeightContainerClass"]) {
                                setHeight(offset);
                                if (Triarc.hasNoValue(windowsListener)) {
                                    windowsListener = $(window)[0].addEventListener("resize", function () {
                                        setHeight(offset);
                                    }, true);
                                }
                            }
                        });
                    }
                };
            }
        ]);
    })(Layout = Triarc.Layout || (Triarc.Layout = {}));
})(Triarc || (Triarc = {}));


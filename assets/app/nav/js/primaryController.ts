/// <reference path="../../baseIncludes.ts"/>
/// <reference path="navPlugin.ts"/>
/// <reference path="navInterfaces.ts"/>
module MainNav {

  interface NavItemMap {
    [key:string]: NavItem;
  }

  _module.directive("hawtioMainNav", ["HawtioNav", "$templateCache", "$compile", "$location", (HawtioNav:Registry, $templateCache:ng.ITemplateCacheService, $compile:ng.ICompileService, $location:ng.ILocationService) => {

    var config = {
      nav: <NavItemMap> {},
      numKeys: 0,
      numValid: 0
    }

    function itemIsValid(item:NavItem) {
      if (!('isValid' in item)) {
        return true;
      }
      if (_.isFunction(item.isValid)) {
        return item.isValid();
      }
      return false;
    }

    var iterationFunc = (item:NavItem) => {
      if (itemIsValid(item)) {
        config.numValid = config.numValid + 1;
      }
    };

    function addIsSelected(item:NavItem) {
      if (!('isSelected' in item) && 'href' in item) {
        var href = item.href();
        item.isSelected = () => $location.path().startsWith(href);
      }
    }

    HawtioNav.on(Actions.ADD, 'isSelectedEnricher', (item:NavItem) => {
      addIsSelected(item);
      if (item.tabs) {
        item.tabs.forEach(addIsSelected);
      }
    });

    HawtioNav.on(Actions.ADD, 'PrimaryController', (item:NavItem) => {
      log.debug("Item added: ", item);
      config.nav[item.id] = item;
    });

    HawtioNav.on(Actions.REMOVE, 'PrimaryController', (item:NavItem) => {
      delete config.nav[item.id];
    });

    HawtioNav.on(Actions.CHANGED, 'PrimaryController', (items:NavItem[]) => {
      config.numKeys = items.length;
      config.numValid = 0;
      items.forEach(iterationFunc);
    });

    return {
      restrict: 'A',
      replace: false,
      controller: ["$scope", "$element", "$attrs", ($scope, $element, $attrs) => {
        $scope.config = config;
        $scope.redraw = true;
        $scope.$watch('config.numKeys', (newValue, oldValue) => {
          if (newValue !== oldValue) {
            $scope.redraw = true;
          }
        });
        $scope.$watch('config.numValid', (newValue, oldValue) => {
          if (newValue !== oldValue) {
            $scope.redraw = true;
          }
        });
        $scope.$on('hawtio-nav-redraw', () => {
          $scope.redraw = true;
        });
      }],
      link: (scope, element, attr) => {
        scope.$watch(() => {
          var oldValid = config.numValid;
          config.numValid = 0;
          HawtioNav.iterate(iterationFunc);
          if (config.numValid !== oldValid) {
            scope.redraw = true;
          }
          if (!scope.redraw) {
            // log.debug("not redrawing");
            config.numValid = 0;
            HawtioNav.iterate(iterationFunc);
          } else {
            // log.debug("redrawing");
            scope.redraw = false;
            element.empty();

            function drawNavItem(item:NavItem) {
              if (!itemIsValid(item)) {
                return;
              }
              var newScope = scope.$new();
              newScope.item = item;
              var template:string = null;
              if (_.isFunction(item.template)) {
                template = item.template();
              } else {
                template = $templateCache.get('nav.html');
              } 
              element.append($compile(template)(newScope));
            }

            // first add any contextual menus (like perspectives)
            HawtioNav.iterate((item:NavItem) => {
              if (!('context' in item)) {
                return;
              }
              if (!item.context) {
                return;
              }
              drawNavItem(item);
            });
            // then add the rest of the nav items
            HawtioNav.iterate(drawNavItem);

          }
          // this can change whenever, so we need to evaluate it each time
          var selected = HawtioNav.selected();
          // log.debug("Selected item: ", selected);
          if (selected) {
            if (selected.tabs && selected.tabs.length > 0) {
              element.addClass('persistent-secondary');
            } else {
              element.removeClass('persistent-secondary');
            }
          }
        });
      }
    }
  }]);

}

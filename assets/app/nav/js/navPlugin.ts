/// <reference path="../../baseIncludes.ts"/>
/// <reference path="navGlobals.ts"/>
/// <reference path="navInterfaces.ts"/>
/// <reference path="../../helpers/js/pluginHelpers.ts"/>
module MainNav {

  export var _module:ng.IModule = angular.module(MainNav.pluginName, []);
  export var controller = PluginHelpers.createControllerFunction(_module, "MainNav");

  _module.run(['HawtioNav', '$rootScope', (HawtioNav:MainNav.Registry, $rootScope:ng.IRootScopeService) => {
    HawtioNav.on(Actions.ADD, "$apply", (item:MainNav.NavItem) => {
      var oldClick:($event:any) => void = item.click;
      item.click = ($event) => {
        if (!($event instanceof jQuery.Event)) {
          $rootScope.$apply();
        }
        if (oldClick) {
          oldClick($event);
        }
      }
    });
    log.debug("loaded");
  }]);

  hawtioPluginLoader.addModule(MainNav.pluginName);

}

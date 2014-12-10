/// <reference path="../../baseIncludes.ts"/>
/// <reference path="coreGlobals.ts"/>
module Core {

  export var _module:ng.IModule = angular.module(Core.pluginName, []);

  _module.config(($locationProvider:ng.ILocationProvider, $routeProvider:ng.route.IRouteProvider) => {
    $locationProvider.html5Mode(true);
  });

  _module.run(() => {
    log.debug("loaded");
  });

  hawtioPluginLoader.addModule("ng");
  hawtioPluginLoader.addModule("ngSanitize");
  hawtioPluginLoader.addModule("ngRoute");
  hawtioPluginLoader.addModule(Core.pluginName);

  // bootstrap the app
  $(() => {
    var doc = angular.element(document);
    Core.injector = angular.bootstrap(doc, hawtioPluginLoader.getModules());
    Logger.get(Core.pluginName).debug("Bootstrapped application, injector: ", Core.injector);
    var docEl = angular.element(document.documentElement);
    docEl.attr('xmlns:ng', "http://angularjs.org");
    docEl.attr('ng-app', Core.pluginName);
  });


}

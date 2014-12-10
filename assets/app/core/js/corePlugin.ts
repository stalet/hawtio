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
  window.addEventListener('HTMLImportsLoaded', () => {
    Core.injector = angular.bootstrap((<any>window).wrap(document), hawtioPluginLoader.getModules());
    Logger.get(Core.pluginName).debug("Bootstrapped application, injector: ", Core.injector);
  });


}

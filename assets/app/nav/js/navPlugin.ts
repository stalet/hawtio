/// <reference path="../../baseIncludes.ts"/>
/// <reference path="navGlobals.ts"/>
/// <reference path="../../helpers/js/pluginHelpers.ts"/>
module MainNav {

  export var _module:ng.IModule = angular.module(MainNav.pluginName, []);
  export var controller = PluginHelpers.createControllerFunction(_module, "MainNav");

  _module.run(() => {
    log.debug("loaded");
  });

  hawtioPluginLoader.addModule(MainNav.pluginName);

}

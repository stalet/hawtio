/// <reference path="../../baseIncludes.ts"/>
/// <reference path="../../nav/js/navInterfaces.ts"/>
/// <reference path="../../helpers/js/urlHelpers.ts"/>
module Test {
  // simple test plugin for messing with the nav bar

  export var pluginName = 'test';
  export var templatePath = 'app/test/html';
  export var log:Logging.Logger = Logger.get(pluginName);
  export var _module = angular.module(pluginName, []);

  var tab:MainNav.NavItem = null;
  var tab2:MainNav.NavItem = null;

  _module.config(['$routeProvider', 'HawtioNavBuilderProvider', ($routeProvider:ng.route.IRouteProvider, builder:MainNav.BuilderFactory) => {

    tab = builder.create()
            .id(pluginName)
            .title(() => "Test")
            .href(() => "/test1")
            .subPath("Sub Page 1", "page1", UrlHelpers.join(templatePath, 'page1.html'))
            .subPath("Sub Page 2", "page2", UrlHelpers.join(templatePath, 'page2.html'))
            .subPath("Sub Page 3", "page3", UrlHelpers.join(templatePath, 'page3.html'))
            .build();

    tab2 = builder.create()
            .id(UrlHelpers.join(pluginName, '2'))
            .title(() => "Test2")
            .href(() => "/test2")
            .page(() => UrlHelpers.join(templatePath, 'page1.html'))
            .build();

    builder.configureRouting($routeProvider, tab);
    builder.configureRouting($routeProvider, tab2);
  }]);

  _module.run(["HawtioNav", "$timeout", (HawtioNav:MainNav.Registry, $timeout:ng.ITimeoutService) => {
    log.debug('loaded');
    HawtioNav.add(tab);
    HawtioNav.add(tab2);
  }]);

  hawtioPluginLoader.addModule(pluginName);
}

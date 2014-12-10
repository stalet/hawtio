/// <reference path="navPlugin.ts"/>
/// <reference path="navInterfaces.ts"/>
/// <reference path="navItemBuilder.ts"/>
/// <reference path="../../helpers/js/tasks.ts"/>
module MainNav {

  export interface ICreateRegistry{
    ():Registry;
  }
  export var createRegistry:ICreateRegistry;

  export interface ICreateBuilder {
    ():NavItemBuilder 
  }
  export var createBuilder:ICreateBuilder;

  // provider so it's possible to get a nav builder in _module.config()
  _module.provider('HawtioNavBuilder', [function HawtioNavBuilderProvider() {
    this.$get = function() {
      return {};
    }
    this.create = function():NavItemBuilder {
      return createBuilder();
    }
    function setRoute($routeProvider:ng.route.IRouteProvider, tab:NavItem) {
      log.debug("Setting route: ", tab.href(), " to template URL: " , tab.page());
      var config:any = {
        templateUrl: tab.page()
      }
      if (!_.isUndefined(tab.reload)) {
        config.reloadOnSearch = tab.reload;
      }
      $routeProvider.when(tab.href(), config);
    }
    this.configureRouting = function($routeProvider:ng.route.IRouteProvider, tab:NavItem) {
      if (_.isUndefined(tab.page)) {
        if (tab.tabs) {
          var target = _.first(tab.tabs)['href']
          if (target) {
            log.debug("Setting route: ", tab.href(), " to redirect to ", target());
            $routeProvider.when(tab.href(), { reloadOnSearch: tab.reload, redirectTo: target() });
          }
        }
      } else {
        setRoute($routeProvider, tab);
      }
      if (tab.tabs) {
        tab.tabs.forEach((tab) => setRoute($routeProvider, tab));
      }
    }
  }]);

  _module.factory('HawtioNav', ['$window', ($window) => {
    var registry = $window.document.querySelector('hawtio-nav').registry;
    log.debug("Registry: ", registry);
    return registry;
  }]);

}

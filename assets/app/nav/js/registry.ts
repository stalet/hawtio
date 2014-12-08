/// <reference path="navPlugin.ts"/>
/// <reference path="navInterfaces.ts"/>
/// <reference path="navItemBuilder.ts"/>
/// <reference path="../../helpers/js/tasks.ts"/>
module MainNav {

  class RegistryImpl implements Registry {

    private items:NavItem[] = [];
    private addTasks:TaskHelpers.ParameterizedTasks = TaskHelpers.createParameterizedTasks();
    private removeTasks:TaskHelpers.ParameterizedTasks = TaskHelpers.createParameterizedTasks();
    private changeTasks:TaskHelpers.ParameterizedTasks = TaskHelpers.createParameterizedTasks();

    public constructor() {
      if (log.enabledFor(Logger.DEBUG)) {
        this.on(MainNav.Actions.ADD, 'log', (item) => {
          log.debug('Adding item with id: ', item.id);
        });
        this.on(MainNav.Actions.REMOVE, 'log', (item) => {
          log.debug('Removing item with id: ', item.id);
        });
      }
    }

    builder():NavItemBuilder {
      return new NavItemBuilderImpl();
    }

    add(item:NavItem, ...items:NavItem[]) {
      var toAdd = _.union([item], items);
      this.items = _.union(this.items, toAdd);
      toAdd.forEach((item) => this.addTasks.execute(item));
      this.changeTasks.execute(this.items);
    }

    remove(search:(item:NavItem) => boolean):NavItem[] {
      var removed = _.remove(this.items, search);
      removed.forEach((item) => this.removeTasks.execute(item)); 
      this.changeTasks.execute(this.items);
      return removed;
    }

    iterate(iterator:(item:NavItem) => void):void {
      this.items.forEach(iterator);
    }

    selected():NavItem {
      return <NavItem> _.find(this.items, (item:NavItem) => item.isSelected && item.isSelected());
    }

    on(action:string, key:string, fn:(item:any) => void):void {
      switch(action) {
        case Actions.ADD:
          this.addTasks.addTask(key, fn);
          if (this.items.length > 0) {
            this.items.forEach(fn)
          }
          break;
        case Actions.REMOVE:
          this.removeTasks.addTask(key, fn);
          break;
        case Actions.CHANGED:
          this.changeTasks.addTask(key, fn);
          if (this.items.length > 0) {
            fn(this.items);
          }
          break;
        default:
      }
    }
  }

  // used only for testing...
  export function createRegistry():Registry {
    return new RegistryImpl();
  }

  // provider so it's possible to get a nav builder in _module.config()
  _module.provider('HawtioNavBuilder', [function HawtioNavBuilderProvider() {
    this.$get = function() {
      return {};
    }
    this.create = function():NavItemBuilder {
      return new NavItemBuilderImpl();    
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
  }] );

  _module.factory('HawtioNav', () => {
    return createRegistry();
  });

}

///<reference path="../../baseIncludes.ts"/>
module Core {

  /**
   * The app's injector, set once bootstrap is completed 
   */
  export var injector:ng.auto.IInjectorService = null;

  /**
   * This plugin's name and angular module
   */
  export var pluginName = "hawtio-core";

  /**
   * Path to any HTML partials this plugin might have
   */
  export var templatePath = "app/core/html";

  /**
   * This plugins logger instance
   */
  export var log:Logging.Logger = Logger.get(pluginName);
}

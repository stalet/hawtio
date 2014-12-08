/// <reference path="../../baseIncludes.ts"/>
/**
 * Module that provides functions related to working with javascript objects
 */
module ObjectHelpers {

  /**
   * Convert an array of 'things' to an object, using 'index' as the attribute name for that value
   * @param arr
   * @param index
   * @param decorator
   */
  export function toMap(arr:Array<any>, index:string, decorator?:(any) => void):any {
    if (!arr || arr.length === 0) {
      return {};
    }
    var answer = {};
    arr.forEach((item) => {
      if (angular.isObject(item)) {
        answer[item[index]] = item;
        if (angular.isFunction(decorator)) {
          decorator(item);
        }
      }
    });
    return answer;
  }

  /**
   * Navigates the given set of paths in turn on the source object
   * and returns the last most value of the path or null if it could not be found.
   *
   * @method pathGet
   * @for Core
   * @static
   * @param {Object} object the start object to start navigating from
   * @param {Array} paths an array of path names to navigate or a string of dot separated paths to navigate
   * @return {*} the last step on the path which is updated
   */
  export function pathGet(object:any, paths:any) {
    var pathArray = (angular.isArray(paths)) ? paths : (paths || "").split(".");
    var value = object;
    angular.forEach(pathArray, (name):any => {
      if (value) {
        try {
          value = value[name];
        } catch (e) {
          // ignore errors
          return null;
        }
      } else {
        return null;
      }
    });
    return value;
  }

  /**
   * Navigates the given set of paths in turn on the source object
   * and updates the last path value to the given newValue
   *
   * @method pathSet
   * @for Core
   * @static
   * @param {Object} object the start object to start navigating from
   * @param {Array} paths an array of path names to navigate or a string of dot separated paths to navigate
   * @param {Object} newValue the value to update
   * @return {*} the last step on the path which is updated
   */
  export function pathSet(object:any, paths:any, newValue:any) {
    var pathArray = (angular.isArray(paths)) ? paths : (paths || "").split(".");
    var value = object;
    var lastIndex = pathArray.length - 1;
    angular.forEach(pathArray, (name, idx) => {
      var next = value[name];
      if (idx >= lastIndex || !angular.isObject(next)) {
        next = (idx < lastIndex) ? {} : newValue;
        value[name] = next;
      }
      value = next;
    });
    return value;
  }
}

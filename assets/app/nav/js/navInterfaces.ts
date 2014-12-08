/// <reference path="../../baseIncludes.ts"/>
module MainNav {

  //get function ADD():string { return 'add'; }

  export class Actions {
    public static get ADD():string { return 'add'; }
    public static get REMOVE():string { return 'remove'; }
    public static get CHANGED():string { return 'change'; }
  }

  export interface Registry {
    builder():NavItemBuilder;
    add(item:NavItem, ...items:NavItem[]);
    remove(search:(item:NavItem) => boolean):NavItem[];
    iterate(iterator:(item:NavItem) => void);
    on(action:string, key:string, fn:(item:any) => void):void;
    selected():NavItem;
  }

  export interface BuilderFactory {
    create():NavItemBuilder;
    configureRouting($routeProvider:ng.route.IRouteProvider, tab:NavItem);
  }

  export interface NavItem {
    id: string;
    page?: () => string;
    reload?: boolean;
    context?: boolean;
    title?: () => string;
    href?: () => string;
    click?: ($event:ng.IAngularEvent) => void;
    isValid?: () => boolean;
    isSelected?: () => boolean;
    template?: () => string;
    tabs?:NavItem[];
  }

  export interface NavItemBuilder {
    id(id:string):NavItemBuilder;
    reload(reload:boolean):NavItemBuilder;
    page(page: () => string):NavItemBuilder;
    title(title:() => string):NavItemBuilder;
    context(context:boolean):NavItemBuilder;
    href(href:() => string):NavItemBuilder;
    click(click:($event:ng.IAngularEvent) => void):NavItemBuilder;
    isValid(isValid:() => boolean):NavItemBuilder;
    isSelected(isSelected:() => boolean):NavItemBuilder;
    template(template:() => string):NavItemBuilder;
    tabs(item:NavItem, ...items:NavItem[]):NavItemBuilder;
    subPath(title:string, path:string, page?:string, reload?:boolean, isValid?:() => boolean):NavItemBuilder;
    build():NavItem;
  }

}

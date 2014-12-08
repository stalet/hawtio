/// <reference path="../../baseIncludes.ts"/>
/// <reference path="navInterfaces.ts"/>
/// <reference path="../../helpers/js/urlHelpers.ts"/>
module MainNav {

  export class NavItemBuilderImpl implements NavItemBuilder {
    private self = <NavItem> { id: '' };
    id(id:string):NavItemBuilder {
      this.self.id = id;
      return this;
    }
    title(title:() => string):NavItemBuilder {
      this.self.title = title;
      return this;
    }
    page(page:() => string):NavItemBuilder {
      this.self.page = page;
      return this;
    }
    reload(reload:boolean):NavItemBuilder {
      this.self.reload = reload;
      return this;
    }
    context(context:boolean):NavItemBuilder {
      this.self.context = context;
      return this;
    }
    href(href:() => string):NavItemBuilder {
      this.self.href = href;
      return this;
    }
    click(click:($event:ng.IAngularEvent) => void):NavItemBuilder {
      this.self.click = click;
      return this;
    }
    isSelected(isSelected:() => boolean):NavItemBuilder {
      this.self.isSelected = isSelected;
      return this;
    }
    isValid(isValid:() => boolean):NavItemBuilder {
      this.self.isValid = isValid;
      return this;
    }
    template(template:() => string):NavItemBuilder {
      this.self.template = template;
      return this;
    }
    tabs(item:NavItem, ...items:NavItem[]):NavItemBuilder {
      this.self.tabs = _.union(this.self.tabs, [item], items);
      return this;
    }
    subPath(title:string, path:string, page?:string, reload?:boolean, isValid?:() => boolean):NavItemBuilder {
      if (!this.self.tabs) {
        this.self.tabs = [];
      }
      var tab:NavItem = {
        id: '',
        title: () => title,
        href: () => UrlHelpers.join(this.self.href(), path)
      }
      if (!_.isUndefined(page)) {
        tab.page = () => page;
      }
      if (!_.isUndefined(reload)) {
        tab.reload = reload;
      }
      if (!_.isUndefined(isValid)) {
        tab.isValid = isValid;
      }
      this.self.tabs.push(tab);
      return this;
    }
    build():NavItem {
      return this.self;
    }
  }
  
}

/// <reference path="../testIncludes.ts"/>
/// <reference path="../../app/nav/js/navInterfaces.ts"/>
/// <reference path="../../app/nav/js/registry.ts"/>

describe("Nav Registry Tests", () => {

  it("Should create a new nav item in the registry", () => {
    var registry = MainNav.createRegistry();
    var navItem = registry.builder().id("foo").build();
    registry.add(navItem);
    registry.iterate((item) => {
      expect(item.id).toBe("foo");
    });
  });

  it("Should call on a notification handler when an item is added", () => {
    var registry = MainNav.createRegistry();
    var navItem = registry.builder().id("foo").build();
    var added = 0;
    registry.on(MainNav.Actions.ADD, 'test', (item) => {
      added = added + 1;
    });
    registry.add(navItem);
    expect(added).toBe(1);
  });

  it("Should call on a notification handler even after an item is already added", () => {
    var registry = MainNav.createRegistry();
    var navItem = registry.builder().id("foo").build();
    registry.add(navItem);
    var added = 0;
    registry.on(MainNav.Actions.ADD, 'test', (item) => {
      added = added + 1;
    });
    expect(added).toBe(1);
  });

  it("Should call on a notification handler when an item is removed", () => {
    var registry = MainNav.createRegistry();
    var navItem = registry.builder().id("foo").build();
    var added = 0;
    registry.on(MainNav.Actions.ADD, 'test', (item) => {
      added = added + 1;
    });
    registry.on(MainNav.Actions.REMOVE, 'test', (item) => {
      added = added - 1;
    });
    registry.add(navItem);
    registry.remove((item) => item.id === "foo");
    expect(added).toBe(0);
  });

});

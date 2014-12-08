/// <reference path="../testIncludes.ts"/>
/// <reference path="../../app/helpers/js/arrayHelpers.ts"/>
describe("arrayHelpersTests", () => {

  it("should add new stuff to the existing array", () => {
    var target = [{ id: 'one' }, { id: 'two' }];
    var source = [{ id: 'one' }, { id: 'two' }, { id: 'three' }];
    var changed = ArrayHelpers.sync(target, source);
    expect(_.any(target, (item) => item.id === 'three')).toBe(true);
    expect(changed).toBe(true);
  });

  it("should remove stuff from the existing array", () => {
    var target = [{ id: 'one' }, { id: 'two' }, { id: 'three' }];
    var source = [{ id: 'one' }, { id: 'two' }];
    var changed = ArrayHelpers.sync(target, source);
    expect(_.any(target, (item) => item.id === 'three')).toBe(false);
    expect(changed).toBe(true);
  });

  it("should return false if the source is the same as the target", () => {
    var target = [{ id: 'one' }, { id: 'two' }, { id: 'three' }];
    var source = [{ id: 'one' }, { id: 'two' }, { id: 'three' }];
    var changed = ArrayHelpers.sync(target, source);
    expect(changed).toBe(false);
  });

});

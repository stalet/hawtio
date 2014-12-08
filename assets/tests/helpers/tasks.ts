/// <reference path="../testIncludes.ts"/>
/// <reference path="../../app/helpers/js/tasks.ts"/>

describe("taskTestSuite", () => {

  it("should execute a task", () => {
    var tasks = TaskHelpers.createTasks();
    var executed = false;
    tasks.addTask('setValue', () => {
      executed = true;
    });
    tasks.execute();
    expect(executed).toBe(true);
  });

  it("should execute tasks once by default", () => {
    var tasks = TaskHelpers.createTasks();
    var executed = 0;
    tasks.addTask('setValue', () => {
      executed = executed + 1;
    });
    tasks.execute();
    tasks.execute();
    expect(executed).toBe(1);
  });

  it("should execute a task if all tasks have been executed", () => {
    var tasks = TaskHelpers.createTasks();
    var executed = 0;
    tasks.addTask('dummy', () => {
      executed = executed + 1;
    });
    tasks.execute();
    tasks.addTask('dummy2', () => {
      executed = executed + 1;
    });
    expect(executed).toBe(2);
  });


});

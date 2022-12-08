const updateCurrentStatus = (tasks, checkedTask) => {
  tasks.map((task) => {
    if (task.index === checkedTask.index) {
      task.completed = !task.completed;
    }
    return task;
  });
  return tasks;
};

export default updateCurrentStatus;
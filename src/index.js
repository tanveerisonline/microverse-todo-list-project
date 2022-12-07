import './styles.css';

const todos = [
  {
    description: 'Take Medicines',
    completed: false,
    index: 0,
  },
  {
    description: 'Eat Break Fast',
    completed: true,
    index: 4,
  },
  {
    description: 'Join Microverse Morning Session',
    completed: true,
    index: 2,
  },
  {
    description: 'At 8:30 Am join coding partner meeting',
    completed: true,
    index: 3,
  },
  {
    description: 'Take Break at 12 pm',
    completed: false,
    index: 1,
  },
];

const listContainer = document.querySelector('.todo-list-items');
todos.sort((a, b) => a.index - b.index);

todos.forEach((todo) => {
  const task = document.createElement('li');
  task.innerHTML = `
      <div>
        <input type="checkbox" name="" class="task-complete check ${todo.completed ? 'hide' : ''}">
        <i class="fa fa-check list-drag-btn check check-icon ${!todo.completed ? 'hide' : ''}"></i>
        <p ${todo.completed ? 'class="task-completed"' : ''}>${todo.description}</p>
      </div>
      <i class="fa fa-ellipsis-vertical list-drag-btn"></i>
    `;
  listContainer.appendChild(task);
});

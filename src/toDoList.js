const listContainer = document.querySelector('.todo-list-items');
const todoInput = document.querySelector('.todo-input');
const addTodoBtn = document.querySelector('#add-button');

export default class Todos {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  displayList(task) {
    const list = document.createElement('li');
    list.setAttribute('dataindex', task.index);
    list.innerHTML = `
        <div id="task-${task.index}">
            <input type="checkbox" name="" class="task-completed check ${task.completed ? 'hide' : ''}">
            <i class="fa fa-check list-drag-btn check check-icon ${!task.completed ? 'hide' : ''}"></i>
            <input type="text" class="todo-input-edit ${task.completed ? 'completed' : ''}" value="${task.description}" />
        </div>
      `;
    const dragBtn = document.createElement('span');
    dragBtn.className = 'fa fa-ellipsis-vertical list-drag-btn';
    const trashBtn = document.createElement('span');
    const trashIcon = document.createElement('i');
    trashBtn.className = 'list-delete-btn hide';
    trashIcon.className = 'fa fa-trash';
    trashBtn.appendChild(trashIcon);
    list.appendChild(dragBtn);
    list.appendChild(trashBtn);
    listContainer.appendChild(list);
    list.onclick = () => {
      const todoInputs = document.querySelectorAll('.todo-input-edit');
      todoInputs.forEach((input) => {
        const parent = input.parentNode.parentNode;
        const drag = parent.children[1];
        const trash = parent.children[2];
        if (input === document.activeElement) {
          drag.classList.add('hide');
          trash.classList.remove('hide');
        } else {
          drag.classList.remove('hide');
          trash.classList.add('hide');
        }
      });
    };

    const inputEdit = list.children[0].children[2];
    inputEdit.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const taskText = inputEdit.value;
        this.editTask(task, taskText);
        e.target.blur();
      }
    });

    trashBtn.addEventListener('click', () => {
      this.removeTask(task);
    });
  }

  getTasks() {
    listContainer.innerHTML = '';
    if (localStorage.getItem('todoItems')) {
      this.tasks = JSON.parse(localStorage.getItem('todoItems'));
      this.tasks.sort((a, b) => a.index - b.index);
      this.tasks.forEach((task) => {
        this.displayList(task);
      });
    } else {
      localStorage.setItem('todoItems', '');
      this.tasks = [];
    }
  }

  addTask(task) {
    this.tasks.push(task);
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  removeTask(selectedTask) {
    this.tasks = this.tasks.filter((task) => selectedTask.index !== task.index);
    this.tasks.map((task, index) => {
      task.index = index + 1;
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }

  editTask(selectedTask, text) {
    this.tasks.map((task) => {
      if (task.index === selectedTask.index) {
        task.description = text;
      }
      return task;
    });
    localStorage.setItem('todoItems', JSON.stringify(this.tasks));
    this.getTasks();
  }
}

const todos = new Todos();

todos.getTasks();

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const index = todos.tasks.length + 1;
  if (todoInput.value !== '') {
    const newTask = {
      description: todoInput.value,
      completed: false,
      index,
    };
    todos.addTask(newTask);
    todoInput.value = '';
  }
});

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodoBtn.click();
  }
});
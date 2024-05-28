document.addEventListener('DOMContentLoaded', displayTasks);
function addTask() 
{
  var taskInput = document.getElementById('taskInput');
  var taskDate = document.getElementById('taskDate');
  var taskList = document.getElementById('taskList');
  if (taskInput.value === '' || taskDate.value === '') 
  {
    alert('Please enter both task and date.');
    return;
  }
  var taskItem = document.createElement('div');
  taskItem.className = 'task-item';

  var taskText = document.createElement('span');
  taskText.textContent = taskInput.value;

  var taskDateText = document.createElement('span');
  taskDateText.textContent = '(' + taskDate.value + ')';

  var taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = function () { editTask(taskItem); };

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () { deleteTask(taskItem); };

  var completeButton = document.createElement('button');
  completeButton.textContent = 'Mark as Completed';
  completeButton.onclick = function () { markAsCompleted(taskItem); };

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);
  taskActions.appendChild(completeButton);

  taskItem.appendChild(taskText);
  taskItem.appendChild(taskDateText);
  taskItem.appendChild(taskActions);

  taskList.appendChild(taskItem);

  saveTask(taskInput.value, taskDate.value);

  taskInput.value = '';
  taskDate.value = '';

  updateTaskCount();
}

function editTask(taskItem) 
{
  var newText = prompt('Edit task:', taskItem.querySelector('span').textContent);
  if (newText !== null) {
    taskItem.querySelector('span').textContent = newText;
    updateStoredTasks();
  }
}

function deleteTask(taskItem) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskItem.remove();
    updateStoredTasks();
    updateTaskCount();
  }
}

function markAsCompleted(taskItem) {
  taskItem.classList.toggle('completed-task');
  updateStoredTasks();
  updateTaskCount();
}

function clearCompleted() {
  var completedTasks = document.querySelectorAll('.completed-task');
  completedTasks.forEach(function (taskItem) {
    taskItem.remove();
  });
  updateStoredTasks();
  updateTaskCount();
}

function filterTasks(filterType) {
  var taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(function (taskItem) {
    switch (filterType) {
      case 'all':
        taskItem.style.display = 'flex';
        break;
      case 'active':
        taskItem.style.display = taskItem.classList.contains('completed-task') ? 'none' : 'flex';
        break;
      case 'completed':
        taskItem.style.display = taskItem.classList.contains('completed-task') ? 'flex' : 'none';
        break;
    }
  });
}

function saveTask(text, date) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: text, date: date, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStoredTasks() {
  var tasks = [];
  var taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(function (taskItem) {
    var text = taskItem.querySelector('span').textContent;
    var date = taskItem.querySelector('span:nth-child(2)').textContent.slice(1, -1);
    var completed = taskItem.classList.contains('completed-task');
    tasks.push({ text: text, date: date, completed: completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskList = document.getElementById('taskList');

  tasks.forEach(function (task) {
    var taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    var taskText = document.createElement('span');
    taskText.textContent = task.text;

    var taskDateText = document.createElement('span');
    taskDateText.textContent = '(' + task.date + ')';

    var taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () { editTask(taskItem); };

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () { deleteTask(taskItem); };

    var completeButton = document.createElement('button');
    completeButton.textContent = 'Mark as Completed';
    completeButton.onclick = function () { markAsCompleted(taskItem); };

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);
    taskActions.appendChild(completeButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDateText);
    taskItem.appendChild(taskActions);

    if (task.completed) {
      taskItem.classList.add('completed-task');
    }

    taskList.appendChild(taskItem);
  });

  updateTaskCount();
}


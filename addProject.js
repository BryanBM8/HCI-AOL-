let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let completedTasks = document.getElementById("completedTasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [
  // Example task for testing purposes
  { text: "Example Task", date: "2023-06-30", description: "This is an example task" }
];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    completed: false // Add a 'completed' property set to false initially
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let completeTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  let taskId = selectedTask.id;
  data[taskId].completed = true; // Set 'completed' property to true for the corresponding task

  completedTasks.appendChild(selectedTask); // Move the task to the completedTasks section
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let createTasks = () => {
  completedTasks.innerHTML = "";
  tasks.innerHTML = "";
  data.map((x, y) => {
    // Get the current date and the task's due date
    let currentDate = new Date();
    let dueDate = new Date(x.date);

    // Calculate the difference in days between the current date and the due date
    let timeDiff = dueDate.getTime() - currentDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Set the background color based on the deadline
    let backgroundColor = "";
    if (diffDays <= 0) {
      backgroundColor = "#ff8080"; // Red for overdue tasks
    } else if (diffDays <= 2) {
      backgroundColor = "#ffcc80"; // Orange for tasks due within 2 days
    } else {
      backgroundColor = "#e2eede"; // Default background color
    }

    let taskElement = document.createElement("div");
    taskElement.id = y;
    taskElement.style.backgroundColor = backgroundColor;
    taskElement.innerHTML = `
      <span class="fw-bold">${x.text}</span>
      <span class="small text-secondary">${x.date}</span>
      <p>${x.description}</p>
      <span class="options">
        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
      </span>
    `;

    if (x.completed) {
      completedTasks.appendChild(taskElement);
    } else {
      tasks.appendChild(taskElement);
    }
  });

  resetForm();
};




(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });
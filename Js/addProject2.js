const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
}

/* modal */
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

const todo_submit = document.getElementById("todo_submit");
const todo_update = document.getElementById("todo_update");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const titleInput = document.getElementById("todo_input");
  const dateInput = document.getElementById("date_input");
  const descInput = document.getElementById("textarea");

  const title = titleInput.value.trim();
  const date = dateInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || date === "" || desc === "") {
    // Display an error message or perform validation as needed
    return;
  }

  const currentDate = new Date();
  const selectedDate = new Date(date);

  const timeDifference = selectedDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

  const todo_div = document.createElement("div");
  const todo_title = document.createElement("h3");
  const todo_date = document.createElement("p");
  const todo_desc = document.createElement("p");
  const span = document.createElement("span");
  const editBtn = document.createElement("button");

  if (daysRemaining < 0) {
    // Deadline has passed
    todo_div.style.backgroundColor = "#ffcccc";
  } else if (daysRemaining < 3) {
    // Less than 3 days remaining
    todo_div.style.backgroundColor = "#ffebcc";
  } else if (daysRemaining < 7) {
    // Less than 7 days remaining
    todo_div.style.backgroundColor = "#ffffcc";
  } else {
    // More than 7 days remaining
    todo_div.style.backgroundColor = "#ccffcc";
  }

  todo_title.textContent = title;
  todo_date.textContent = date;
  todo_desc.textContent = desc;
  span.textContent = "\u00D7";
  editBtn.textContent = "Edit";
  editBtn.style.color = "#fff";

  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  todo_div.appendChild(todo_title);
  todo_div.appendChild(todo_date);
  todo_div.appendChild(todo_desc);
  todo_div.appendChild(span);
  todo_div.appendChild(editBtn);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.remove();
  });

  editBtn.addEventListener("click", () => {
    titleInput.value = todo_title.textContent;
    dateInput.value = todo_date.textContent;
    descInput.value = todo_desc.textContent;

    todo_div.remove();

    todo_form.classList.add("active");
    overlay.classList.add("active");

    todo_update.style.display = "block";
    todo_submit.style.display = "none";

    todo_update.addEventListener("click", () => {
      updateTodo();
    });
  });

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  titleInput.value = "";
  dateInput.value = "";
  descInput.value = "";

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

function updateTodo() {
  const titleInput = document.getElementById("todo_input");
  const dateInput = document.getElementById("date_input");
  const descInput = document.getElementById("textarea");

  const title = titleInput.value.trim();
  const date = dateInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || date === "" || desc === "") {
    // Display an error message or perform validation as needed
    return;
  }

  const todo_div = document.createElement("div");
  const todo_title = document.createElement("h3");
  const todo_date = document.createElement("p");
  const todo_desc = document.createElement("p");
  const span = document.createElement("span");
  const editBtn = document.createElement("button");

  todo_title.textContent = title;
  todo_date.textContent = date;
  todo_desc.textContent = desc;
  span.textContent = "\u00D7";
  editBtn.textContent = "Edit";

  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  todo_div.appendChild(todo_title);
  todo_div.appendChild(todo_date);
  todo_div.appendChild(todo_desc);
  todo_div.appendChild(span);
  todo_div.appendChild(editBtn);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.remove();
  });

  editBtn.addEventListener("click", () => {
    titleInput.value = todo_title.textContent;
    dateInput.value = todo_date.textContent;
    descInput.value = todo_desc.textContent;

    todo_div.remove();

    todo_form.classList.add("active");
    overlay.classList.add("active");

    todo_update.style.display = "block";
    todo_submit.style.display = "none";

    todo_update.addEventListener("click", () => {
      updateTodo();
    });
  });

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  titleInput.value = "";
  dateInput.value = "";
  descInput.value = "";

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");

  todo_update.style.display = "none";
  todo_submit.style.display = "block";
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

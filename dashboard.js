// sidebar
// Membuat objek recognition baru dari Web Speech API
const recognition = new webkitSpeechRecognition();

// Mengatur pengaturan recognition
recognition.lang = 'id-ID'; // Atur bahasa yang diakui
recognition.continuous = true; // Terus mendeteksi ucapan secara berkesinambungan

// Mendapatkan referensi ke elemen output
const outputDiv = document.getElementById('output');

// Fungsi untuk membuat div baru
function createNewDiv(content) {
  const newDiv = document.createElement('div');
  newDiv.textContent = content;
  document.body.appendChild(newDiv);
}

// Mengatur event listener untuk tombol mulai mendengarkan
document.getElementById('startBtn').addEventListener('click', function() {
  // Memulai recognition ketika tombol ditekan
  recognition.start();
});

// Event listener untuk hasil speech
recognition.onresult = function(event) {
  const last = event.results.length - 1;
  const result = event.results[last][0].transcript;


  if (result.toLowerCase().includes('buat notes')) {

    window.location.href = 'notes.html';
  }

  if (result.toLowerCase().includes('buat kalender')) {

    window.location.href = 'calendar.html';
  }

  if (result.toLowerCase().includes('ubah profil')) {

    window.location.href = 'profile.html';
  }


  createNewDiv(result);
};

// Event listener untuk kesalahan
recognition.onerror = function(event) {
  console.error(event.error);
};

// alarm

const currentTime = document.querySelector('.alarm');
const audio = new Audio('assets/ringtone.mp3');

audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.querySelector('#upcoming-alarms-list');
const addAlarm = document.querySelector('.setAlarm');

const alarmList = []; 


function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const realTime = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText = `${hour}:${minutes}:${seconds}`;


    if (alarmList.includes(realTime)) {
        ring(realTime);
    }
}


function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


function stopAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}


upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});


remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0; 
    alarmList.push.apply(alarmList, newList);
}



function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    upcomingAlarmList.innerHTML += html
};



addAlarm.addEventListener('submit', event => {

    event.preventDefault(); 

    let hour = formatTime(addAlarm.hr.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.min.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.sec.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`


    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})


setInterval(updateTime, 1000);


const ringtone = new Audio('ajojing.mp3');


function playRingtone() {
  ringtone.play();
}


function stopRingtone() {
  ringtone.pause();
  ringtone.currentTime = 0;
}


function ring(realTime) {
  playRingtone();
}


function stopAlarm() {
  stopRingtone();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }
}

// to-do list
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

function saveTodosToLocalStorage() {
  const todos = Array.from(document.querySelectorAll(".todo"));
  const todosData = todos.map((todo) => {
    const title = todo.querySelector("h3").textContent;
    const date = todo.querySelector("p:nth-child(2)").textContent;
    const desc = todo.querySelector("p:nth-child(3)").textContent;
    return { title, date, desc };
  });
  localStorage.setItem("todos", JSON.stringify(todosData));
}

function loadTodosFromLocalStorage() {
  const todosData = JSON.parse(localStorage.getItem("todos"));
  if (todosData) {
    todosData.forEach((todoData) => {
      const { title, date, desc } = todoData;
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
        saveTodosToLocalStorage();
      });

      editBtn.addEventListener("click", () => {


        todo_update.addEventListener("click", () => {
          updateTodo();
          saveTodosToLocalStorage();
        });
      });

      todo_div.addEventListener("dragstart", dragStart);
      todo_div.addEventListener("dragend", dragEnd);
    });
  }
}

window.addEventListener("load", loadTodosFromLocalStorage);

function createTodo() {
  const titleInput = document.getElementById("todo_input");
  const dateInput = document.getElementById("date_input");
  const descInput = document.getElementById("textarea");

  const title = titleInput.value.trim();
  const date = dateInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || date === "" || desc === "") {
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
    todo_div.style.backgroundColor = "#ffcccc";
  } else if (daysRemaining < 3) {
    todo_div.style.backgroundColor = "#ffebcc";
  } else if (daysRemaining < 7) {
    todo_div.style.backgroundColor = "#ffffcc";
  } else {
    todo_div.style.backgroundColor = "#ccffcc";
  }

  todo_title.textContent = title;
  todo_date.textContent = date;
  todo_desc.textContent = desc;
  span.textContent = "\u00D7";
  span.style.color = "#000"
  editBtn.textContent = "Edit";
  editBtn.style.color = "#000";

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

  const todoData = { title, date, desc };
  const todosData = localStorage.getItem("todos");

  if (todosData) {
    
    const todos = JSON.parse(todosData);
    todos.push(todoData);

    
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    
    const todos = [todoData];
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  saveTodosToLocalStorage();
}


function updateTodo() {
  const titleInput = document.getElementById("todo_input");
  const dateInput = document.getElementById("date_input");
  const descInput = document.getElementById("textarea");

  const title = titleInput.value.trim();
  const date = dateInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || date === "" || desc === "") {
    
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

  saveTodosToLocalStorage();
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
    });
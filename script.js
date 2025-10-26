// DOM references
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Add task function
function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${escapeHtml(task)}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  // Append to list
  listContainer.appendChild(li);

  // Clear and focus input
  inputBox.value = "";
  inputBox.focus();

  // Activate buttons & checkbox for this li
  activateTaskControls(li);

  // Update counters
  updateCounters();
}

// Add Enter key support
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Attach control behaviors to newly-created li
function activateTaskControls(li) {
  const checkbox = li.querySelector("input[type='checkbox']");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskSpan = li.querySelector("label > span");

  // Checkbox toggles completed class
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // Edit button - prompt with current text
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      const trimmed = update.trim();
      // if user typed empty string, ignore the change
      if (trimmed.length > 0) {
        taskSpan.textContent = trimmed;
      }
      // Uncheck and remove completed styling after edit
      checkbox.checked = false;
      li.classList.remove("completed");
      updateCounters();
    }
  });

  // Delete button - confirm then remove
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
}

// Counters updater
function updateCounters() {
  const total = document.querySelectorAll("#list-container li").length;
  const completed = document.querySelectorAll("#list-container li.completed").length;
  const uncompleted = total - completed;

  completedCounter.textContent = completed;
  uncompletedCounter.textContent = uncompleted;
}

// Basic HTML-escape to avoid breaking markup when task contains < or >
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Initial counters (in case there are pre-existing items)
updateCounters();




$(document).ready(init);

let tasks = [];

function init() {
  console.log("To Do List Ready");
  $("#js-add-task").on("submit", addTask);
  $(".js-task-output").on("click", ".js-btn-delete-task", deleteTask);
  $(".js-task-output").on("click", ".js-btn-toggle-complete", toggleComplete);

  getTasks();
}

function addTask(event) {
  event.preventDefault();

  const newTask = [
    $("#js-item").val(),
    $("#js-quantity").val(),
    $("#js-notes").val(),
  ];
  postTask(newTask);

  clearInput();
}

function postTask(task) {
  const dataToServer = {
    item: $("#js-item"),
    quantity: $("#js-quantity"),
    notes: $("#js-notes"),
  };

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: dataToServer,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function getTasks() {
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((response) => {
      tasks = response;
      renderTasks();
    })
    .catch((err) => {
      console.warn(err);
    });
}
function deleteTask() {
  const taskId = $(this).parent().data("id");

  $.ajax({
    type: "DELETE",
    url: `/tasks/${taskId}`,
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function toggleComplete() {
  const complete = {
    complete: $(this).parent().data("complete"),
  };
  const taskId = $(this).parent().data("id");

  $.ajax({
    type: "PUT",
    url: `/tasks/${taskId}`,
    data: complete,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function clearInput() {
  $("#js-item").val("");
  $("#js-quantity").val("");
  $("#js-notes").val("");
}

function renderTasks() {
  $(".js-task-output").empty();

  for (let task of tasks) {
    $(".js-task-output").append(`
        <div data-id=${task.id} data-complete=${task.complete}>
            <span>${task.item}</span>
            <button class="js-btn-delete-task">X</button>
            <button class="js-btn-toggle-complete">O</button>
        </div>
    `);

    if (task.complete === true) {
      const $el = $(".js-task-output").children().last();
      $el.addClass("complete");
    }
  }
}

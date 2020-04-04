$(document).ready(init);

function init() {
  console.log("To Do List Ready");
  $("#js-add-task").on("submit", addTask);
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
function deleteCat() {
  const catId = $(this).parent().data("id");

  $.ajax({
    type: "DELETE",
    url: `/cat/${catId}`,
  })
    .then((response) => {
      getCats();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function toggleCat() {
  const owned = {
    owned: $(this).parent().data("owned"),
  };
  const catId = $(this).parent().data("id");

  $.ajax({
    type: "PUT",
    url: `/cat/${catId}`,
    data: owned,
  })
    .then((response) => {
      getCats();
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

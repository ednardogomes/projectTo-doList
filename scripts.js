const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;
const handleAddTask = () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContents = document.createElement("p");
  taskContents.innerText = inputElement.value;

  taskContents.addEventListener("click", () => handleClick(taskContents));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContents)
  );

  taskItemContainer.appendChild(taskContents);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";
  updateLocalStorage();
};

const handleClick = (taskContents) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaksIsBeingClicked = task.firstChild.isSameNode(taskContents);
    if (currentTaksIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContents) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const currentTaksIsBeingClicked = task.firstChild.isSameNode(taskContents);
    if (currentTaksIsBeingClicked) {
      taskItemContainer.remove();
    }
  }
  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");
    return { description: content.innerText, isCompleted };
  });
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContents = document.createElement("p");
    taskContents.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContents.addEventListener("click", () => handleClick(taskContents));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContents)
    );

    taskItemContainer.appendChild(taskContents);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());

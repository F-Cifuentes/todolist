const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");

    let tasks = [];

    function updateTaskCount() {
      totalTasks.textContent = tasks.length;
      const completedCount = tasks.filter(task => task.completed).length;
      completedTasks.textContent = completedCount;
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          tasks[index].completed = checkbox.checked;
          updateTaskCount();
        });

        const label = document.createElement("label");
        label.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
          tasks.splice(index, 1);
          renderTasks();
          updateTaskCount();
        });

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    }

    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
        updateTaskCount();
      }
    });

    updateTaskCount();
  
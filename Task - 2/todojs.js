// Define a function to show the household section
function showHousehold() {
  var householdDiv = document.getElementById("household");
  var frontDiv = document.getElementById("front");
  frontDiv.style.display = "none";
  householdDiv.style.display = "block";
}

// Define a function to hide the household section
function hideHousehold() {
  var householdDiv = document.getElementById("household");
  var frontDiv = document.getElementById("front");
  householdDiv.style.display = "none";
  frontDiv.style.display = "block";
}

// Function to handle the edit of a todo item
function editItem(index) {
  const todo = todos[index];
  const newTitle = prompt('Enter new title:', todo.title);
  const newDate = prompt('Enter new date:', todo.date);
  const newTime = prompt('Enter new time:', todo.time);
  const newDescription = prompt('Enter new description:', todo.de);

  // Update the todo item
  todos[index] = {
      title: newTitle,
      date: newDate,
      time: newTime,
      de: newDescription,
      dropdown: todo.dropdown,
      checked: todo.checked
  };

  // Re-render the todos
  generateTodo();
}

// Function to handle deletion of a todo item
function deleteItem(index) {
  todos.splice(index, 1);
  generateTodo();
}


// Function to generate the todo list
function generateTodo() {
    const list = document.getElementById("tasks");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="todo-text">${todo.date}</span>
            <span class="todo-text">${todo.time}</span>
            <span class="todo-text">${todo.title}</span>
            <span class="todo-text">${todo.de}</span>
            <div>
                <i class="fa-solid fa-trash" onclick="deleteItem(${index})"></i>
                <i class="fa-solid fa-pencil-alt" onclick="editItem(${index})"></i>
            </div>
        `;
        list.appendChild(listItem);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}



function addTodo() {
  const title = document.getElementById("topic").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const description = document.getElementById("des").value;
  todos.push({
      title,
      date,
      time,
      de: description,
      dropdown: false,
      checked: false
  });
  generateTodo();
}


function clearAll() {
  todos = [];
  generateTodo();
}

let todos = JSON.parse(localStorage.getItem("todos")) || [];
generateTodo();

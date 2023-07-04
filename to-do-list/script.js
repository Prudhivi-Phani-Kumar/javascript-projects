const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = () => {
  if (inputBox.value === "") {
    alert("add your task...!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.append(span);
  }
  inputBox.value = "";
  saveData();
};

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

const saveData = () => {
  localStorage.setItem("todo-data", listContainer.innerHTML);
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem("todo-data");
};

showTask();

let task = document.getElementById("todo-input");
let listContainer=document.getElementById("todo-items");



function addTask(){

    const edit = document.createElement("span");
    edit.setAttribute("onclick", "editTask(event)");
    edit.innerHTML = "\u270E";
    edit.classList.add("edit-task");


    const remove = document.createElement("span");
    remove.setAttribute("onclick", "removeTask(event)");
    remove.innerHTML = "\u00d7";
    remove.classList.add("remove-task");
    
    let li=document.createElement("li")
    li.classList.add("unchecked");
    li.setAttribute("onclick", "checkTask(event)");
    li.innerHTML = task.value;


    li.appendChild(edit);
    li.appendChild(remove);

    if(task.value === "" || window.localStorage.getItem(li.innerHTML) != null){ 
        alert("Please enter a task or create a new one");
    }
    else{
        listContainer.appendChild(li);
        window.localStorage.setItem(li.innerHTML, "unchecked");
    }
    task.value = "";// Clear the input field after adding the task
}


function checkTask(task){
    if(task.target.classList.contains("unchecked") && task.target.tagName === "LI"){

        task.target.classList.remove("unchecked");
        task.target.classList.add("checked");

        window.localStorage.removeItem(task.target.innerHTML);
        window.localStorage.setItem(task.target.innerHTML, "checked");
    }
    else if(task.target.classList.contains("checked") && task.target.tagName === "LI"){

        task.target.classList.remove("checked");
        task.target.classList.add("unchecked");

        window.localStorage.removeItem(task.target.innerHTML);
        window.localStorage.setItem(task.target.innerHTML, "unchecked");

    }
}


function removeTask(task){     
    window.localStorage.removeItem(task.target.parentElement.innerHTML);// Remove the task from localStorage
    task.target.parentElement.remove();// Remove the task from the list
}


function editTask(task){

    // Create edit and remove buttons
    // These buttons are created again to ensure they are present in the edited task
    const edit = document.createElement("span");
    edit.setAttribute("onclick", "editTask(event)");
    edit.innerHTML = "\u270E";
    edit.classList.add("edit-task");


    const remove = document.createElement("span");
    remove.setAttribute("onclick", "removeTask(event)");
    remove.innerHTML = "\u00d7";
    remove.classList.add("remove-task");

    let oldTask= task.target.parentElement.textContent.replace("\u270E", "").replace("\u00d7", "").trim();// Get the text of the task to be edited, removing the edit and remove icons
    let newTaskText = prompt("Edit your task:", oldTask);// Prompt the user to enter the new task text and show the old task text as a default value
    if(newTaskText === null ) {
        return;
    }

    let newTaskLi = document.createElement("li");// Create a new list item for the edited task to replace the old one
    newTaskLi.classList.add("unchecked");

    newTaskLi.innerHTML = newTaskText;
    newTaskLi.appendChild(edit);
    newTaskLi.appendChild(remove);
    newTaskLi.setAttribute("onclick", "checkTask(event)");
    task.target.parentElement.remove();// Remove the old task from the list
    listContainer.appendChild(newTaskLi);// Append the new task to the list

    window.localStorage.setItem(newTaskLi.innerHTML, "unchecked");// Store the new task in localStorage
    window.localStorage.removeItem(task.target.parentElement.innerHTML);// Remove the old task from localStorage


}


document.addEventListener("DOMContentLoaded", () => {
        if (window.localStorage.length === 0) {
            return;
        }
        for(let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            let li = document.createElement("li");
            if (window.localStorage.getItem(key) === "checked") {
                li.classList.add("checked");
                li.setAttribute("onclick", "checkTask(event)");
            } else {
                li.classList.add("unchecked");
                li.setAttribute("onclick", "checkTask(event)");
            }

            li.setAttribute("onclick", "checkTask(event)");
            li.innerHTML = key;
            listContainer.appendChild(li);
            window.localStorage.removeItem(key);
            window.localStorage.setItem(li.innerHTML, li.classList.contains("checked") ? "checked" : "unchecked");
        }
       
    }
)

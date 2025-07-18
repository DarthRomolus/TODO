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

    let p = document.createElement("p");
    p.classList.add("main-task-text-unchecked");
    p.setAttribute("onclick", "checkTask(event)");

    p.innerHTML = task.value;
    li.appendChild(p);


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

        window.localStorage.removeItem(task.target.innerHTML);
        task.target.querySelector("p").className = "main-task-text-checked";
        window.localStorage.setItem(task.target.innerHTML, "checked");
        task.target.className = "checked";
        
        
    }
    else if(task.target.classList.contains("checked") && task.target.tagName === "LI"){

        console.log(task.target.innerHTML);
        window.localStorage.removeItem(task.target.innerHTML);
        task.target.querySelector("p").className = "main-task-text-unchecked";
        window.localStorage.setItem(task.target.innerHTML, "unchecked");
        task.target.className = "unchecked";     


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

    let newTaskLi = document.createElement("li");// Create a new list item for the edited task to replace the old one
    newTaskLi.classList.add("unchecked");

    let p = document.createElement("p");
    p.classList.add("main-task-text-unchecked");
    p.setAttribute("onclick", "checkTask(event)");

    p.innerHTML = newTaskText;// Set the text of the new task
    newTaskLi.appendChild(p);

    newTaskLi.appendChild(edit);
    newTaskLi.appendChild(remove);
    newTaskLi.setAttribute("onclick", "checkTask(event)");
    

    if(newTaskText === "" || window.localStorage.getItem(newTaskLi.innerHTML) != null){
        alert("Please enter a task or create a new one");
    }
    else{
        task.target.parentElement.remove();// Remove the old task from the list
        listContainer.appendChild(newTaskLi);// Append the new task to the list
        window.localStorage.setItem(newTaskLi.innerHTML, "unchecked");// Store the new task in localStorage
        window.localStorage.removeItem(task.target.parentElement.innerHTML);// Remove the old task from localStorage
    }
    

}

// Initialize the list from localStorage when the page loads after a refresh or reopening the page
document.addEventListener("DOMContentLoaded", () => {
        if (window.localStorage.length === 0) {
            return;
        }
        for(let i = 0; i < window.localStorage.length; i++) {// Loop through all items in localStorage
            let key = window.localStorage.key(i);// Get the key of the current item
            let li = document.createElement("li");// Create a new list item for the task
            if (window.localStorage.getItem(key) === "checked"){// Check if the task is marked as checked
                li.classList.add("checked");
                li.setAttribute("onclick", "checkTask(event)");
            } else {
                li.classList.add("unchecked");
                li.setAttribute("onclick", "checkTask(event)");
            }

            li.innerHTML = key;
            listContainer.appendChild(li);
            window.localStorage.removeItem(key);
            window.localStorage.setItem(li.innerHTML, li.classList.contains("checked") ? "checked" : "unchecked");
        }
       
    }
)

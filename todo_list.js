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

    const addSubtask = document.createElement("span");
    addSubtask.setAttribute("onclick", "addSubtask(event)");
    addSubtask.innerHTML = "\u002B";
    addSubtask.classList.add("add-subtask");
    
    
    let li=document.createElement("li")
    li.classList.add("unchecked");
    li.setAttribute("onclick", "checkTask(event)");

    let p = document.createElement("p");
    p.classList.add("main-task-text-unchecked");
    p.setAttribute("onclick", "checkTask(event)");

    let ul=document.createElement("ul");


    p.innerHTML = task.value;
    li.appendChild(p);


    li.appendChild(edit);
    li.appendChild(remove);
    li.appendChild(addSubtask);
    li.appendChild(ul);
    

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
    if(task.target.classList.contains("unchecked") && task.target.tagName === "LI"){// If the task is unchecked, check it

        window.localStorage.removeItem(task.target.innerHTML);
        task.target.querySelector("p").className = "main-task-text-checked";
        task.target.innerHTML = task.target.innerHTML.replaceAll("subtask-unchecked", "subtask-checked");// Replace all unchecked subtasks with checked subtasks in the task
        window.localStorage.setItem(task.target.innerHTML, "checked");
        task.target.className = "checked";

        
        
    }
    else if(task.target.classList.contains("checked") && task.target.tagName === "LI"){// If the task is checked, uncheck it
        // If the task is already checked, uncheck it
        window.localStorage.removeItem(task.target.innerHTML);
        task.target.querySelector("p").className = "main-task-text-unchecked";
        task.target.innerHTML = task.target.innerHTML.replaceAll("subtask-checked", "subtask-unchecked");// Replace all checked subtasks with unchecked subtasks in the task
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

    const addSubtask = document.createElement("span");
    addSubtask.setAttribute("onclick", "addSubtask(event)");
    addSubtask.innerHTML = "\u002B";
    addSubtask.classList.add("add-subtask");

    
    let newTaskText = prompt("Edit your task:");// Prompt the user to enter the new task text and show the old task text as a default value

    if(newTaskText === "" ){
        alert("Please enter a task or create a new one");
    }
    else{
        let keyToRemove = task.target.parentElement.innerHTML;// Get the key of the task to be removed from localStorage
        window.localStorage.removeItem(keyToRemove);// Remove the old task from localStorage
        task.target.parentElement.classList.remove("checked");// Remove the checked class from the task
        task.target.parentElement.classList.add("unchecked");// Add the unchecked class to the task

       
        let ul=document.createElement("ul");// Create a new ul element to hold the existing subtasks
        let subTasks=task.target.parentElement.querySelector("ul");// Get the existing subtask list from the old task
        ul.innerHTML=subTasks.innerHTML.replaceAll("subtask-checked", "subtask-unchecked");// Replace all checked subtasks with unchecked subtasks in the subtask list
        task.target.parentElement.remove();

        let newTaskLi = document.createElement("li");// Create a new list item for the edited task to replace the old one
        newTaskLi.classList.add("unchecked");

        const p = document.createElement("p");
        p.classList.add("main-task-text-unchecked");
        newTaskLi.setAttribute("onclick", "checkTask(event)");
   
        p.innerHTML = newTaskText;// Set the text of the new task
        newTaskLi.appendChild(p);// Append the new task text to the new list item
        newTaskLi.appendChild(edit);// Append the edit button to the new list item
        newTaskLi.appendChild(remove);// Append the remove button to the new list item
        newTaskLi.appendChild(addSubtask);// Append the add subtask button to the new
        newTaskLi.appendChild(ul);// Append the existing subtask list to the new list item

        window.localStorage.setItem(newTaskLi.innerHTML,"unchecked");// Remove the old task from localStorage
        listContainer.appendChild(newTaskLi);// Append the new task to the list
        
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

function addSubtask(event) {
    let ul = event.target.parentElement.querySelector("ul");// Get the ul element where the subtasks will be added       
    let subtaskText = prompt("Enter subtask:");
    window.localStorage.removeItem(event.target.parentElement.innerHTML);// Remove the task from localStorage to update it with the new subtask

    const edit = document.createElement("span");
    edit.setAttribute("onclick", "editSubtask(event)");
    edit.innerHTML = "\u270E";
    edit.classList.add("edit-subtask");


    const remove = document.createElement("span");
    remove.setAttribute("onclick", "removeSubtask(event)");
    remove.innerHTML = "\u00d7";
    remove.classList.add("remove-subtask");


    if (subtaskText) {// Check if the subtask text is not empty and then create a new whole task 'element'
        let li = document.createElement("li");
        li.classList.add("subtask-unchecked");
        li.setAttribute("onclick", "checkSubtask(event)");

        li.textContent = subtaskText;
        li.appendChild(edit);
        li.appendChild(remove);
        ul.appendChild(li);
    } else {
        alert("Subtask cannot be empty.");
    }
    window.localStorage.setItem(event.target.parentElement.innerHTML, "unchecked");// Store the updated task in localStorage
}

function removeSubtask(subtask) {// Remove a subtask from the list
    let removedSubtask = subtask.target;
    let li = removedSubtask.parentElement;
    let ul = li.parentElement;

    window.localStorage.removeItem(ul.parentElement.innerHTML);//remove the entire task from localStorage
    ul.removeChild(li);// Remove the subtask from the list

    ul.innerHTML = ul.innerHTML.replace(li, "");// Update the innerHTML of the ul to remove the subtask
    ul.parentElement.innerHTML.replace(removedSubtask.parentElement, ul);// Update the parent element's innerHTML to reflect the changes
    window.localStorage.setItem(ul.parentElement.innerHTML, "unchecked");// Store the updated task in localStorage
}

function editSubtask(subtask) {// Edit a subtask in the list
    const edit = document.createElement("span");
    edit.setAttribute("onclick", "editSubtask(event)");
    edit.innerHTML = "\u270E";
    edit.classList.add("edit-subtask");


    const remove = document.createElement("span");
    remove.setAttribute("onclick", "removeSubtask(event)");
    remove.innerHTML = "\u00d7";
    remove.classList.add("remove-subtask");


    let editedSubtask = subtask.target;
    let li = editedSubtask.parentElement;
    let ul = li.parentElement;
    let newLi=document.createElement("li");// Create a new list item for the edited subtask

   
    let editableSubtaskText = li.textContent.replace("\u270E", "").replace("\u00d7", "").trim(); // Get the text of the subtask without the edit and remove icons
    let newSubtaskText = prompt("Edit your subtask:");// Prompt the user to enter the new subtask text

    window.localStorage.removeItem(ul.parentElement.innerHTML);//remove the entire task from localStorage
    console.log(ul.parentElement.innerHTML);
    li.remove();// Remove the subtask from the list

    if (newSubtaskText === "") {
        alert("Subtask cannot be empty.");
        return;
    }

    newLi.textContent=li.textContent.replace(editableSubtaskText, newSubtaskText).replace("\u270E", "").replace("\u00d7", "");// Replace the old subtask text with the new one
    newLi.classList.add("subtask-unchecked");// Add the class for unchecked subtasks
    newLi.setAttribute("onclick", "checkSubtask(event)");// Set the onclick attribute to
    newLi.appendChild(edit);
    newLi.appendChild(remove);
    ul.appendChild(newLi);// Append the updated subtask back to the ul
    window.localStorage.setItem(ul.parentElement.innerHTML, "unchecked");// Store the updated task in localStorage
    console.log(ul.parentElement.innerHTML);
}


function checkSubtask(task) {
    let subtask = task.target;
    let ul = subtask.parentElement;
    window.localStorage.removeItem(subtask.parentElement.parentElement.innerHTML);// Remove the task from localStorage
    if (subtask.classList.contains("subtask-unchecked") && task.target.tagName === "LI") {
        subtask.classList.remove("subtask-unchecked");
        subtask.classList.add("subtask-checked");
        if(ul.innerHTML.includes("subtask-unchecked")){// Check if there are any checked subtasks
           window.localStorage.setItem(subtask.parentElement.parentElement.innerHTML, "unchecked");
           ul.parentElement.classList.remove("checked");
           ul.parentElement.classList.add("unchecked");
        }
        else{
            window.localStorage.setItem(subtask.parentElement.parentElement.innerHTML, "checked");
            ul.parentElement.classList.remove("unchecked");
           ul.parentElement.classList.add("checked");
        }
    } else if (subtask.classList.contains("subtask-checked") && task.target.tagName === "LI") {
        subtask.classList.remove("subtask-checked");
        subtask.classList.add("subtask-unchecked");
        window.localStorage.setItem(subtask.parentElement.parentElement.innerHTML, "unchecked");
        ul.parentElement.classList.remove("checked");
        ul.parentElement.classList.add("unchecked");
    }
}
let task = document.getElementById("todo-input");
let listContainer=document.getElementById("todo-items");


function addTask(){
    let li=document.createElement("li")
    li.classList.add("unchecked");
    li.setAttribute("onclick", "checkTask(event)");
    li.innerHTML = task.value;

    let span = document.createElement("span");
    span.setAttribute("onclick", "removeTask(event)");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    if(task.value === "" || window.localStorage.getItem(li.innerHTML) != null){ 
        alert("Please enter a task or create a new one");
    }
    else{
        listContainer.appendChild(li);
        window.localStorage.setItem(li.innerHTML, "unchecked");
    }
    
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
    window.localStorage.removeItem(task.target.parentElement.innerHTML);
    window.localStorage.removeItem(task.target.innerHTML);
    task.target.parentElement.remove();
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

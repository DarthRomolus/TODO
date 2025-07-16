let task = document.getElementById("todo-input");
let listContainer=document.getElementById("todo-items");
function addTask(){
    if(task.value === "") {
        alert("Please enter a task.");
    }
    else{
        window.localStorage.setItem(task.value, "unchecked");
        let li=document.createElement("li")
        li.classList.add("unchecked");
        li.setAttribute("onclick", "checkTask(event)");
        li.innerHTML = task.value;
        listContainer.appendChild(li);
    }
    
}
function checkTask(task){
    if(task.target.classList.contains("unchecked")){
        task.target.classList.remove("unchecked");
        task.target.classList.add("checked");
        window.localStorage.removeItem(task.target.innerHTML);
        window.localStorage.setItem(task.target.innerHTML, "checked");
    }
    else{
        task.target.classList.remove("checked");
        task.target.classList.add("unchecked");
        window.localStorage.removeItem(task.target.innerHTML);
        window.localStorage.setItem(task.target.innerHTML, "unchecked");


    }
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
        }
       
    }
)

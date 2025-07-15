let task = document.getElementById("todo-input");
let listContainer=document.getElementById("todo-items");
function addTask(){
    if(task.value === "") {
        alert("Please enter a task.");
        return;
    }
    else{
        window.localStorage.setItem(task.value, task.value);
        let li=document.createElement("li")
        li.innerHTML = task.value;
        listContainer.appendChild(li);
    }
    
}
document.addEventListener("DOMContentLoaded", () => {
        if (window.localStorage.length === 0) {
            return;
        }
        for(let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            let li = document.createElement("li");
            li.innerHTML = window.localStorage.getItem(key);
            listContainer.appendChild(li);
        }
       
    })
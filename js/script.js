let addTaskBtn = document.querySelector("#add-task-btn");
let writeTaskInput = document.querySelector("#write-task-input");
let firstMessage = document.querySelector("#first-message");
let toDoList = document.querySelector(".to-do-list");
let delTaskBtn = document.querySelector("#del-task-btn");
let delAllTasksBtn = document.querySelector("#del-all-tasks-btn");
let delCheckTaskBtn = document.querySelector("#del-check-task-btn");

addTaskBtn.addEventListener("click", addTaskHandler);
writeTaskInput.addEventListener("keydown", function(e){
    if(e.code == "Enter" || e.code == "NumpadEnter") addTaskHandler();
});

delCheckTaskBtn.addEventListener("click", function(){
    let allChecket = document.querySelectorAll("input[type=checkbox]");
    for(const elem of allChecket){
        if(elem.checked){
            elem.parentElement.remove();
        }
    }
    returmMessange();
});


// удалить все задачи
delAllTasksBtn.addEventListener("click", function(){
    while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    firstMessage.hidden = false; // вернуть сообщение
    writeTaskInput.focus(); // вернуть фокус после удаления
})

function returmMessange(){
    if(toDoList.childNodes.length === 1){
        firstMessage.hidden = false; // вернуть сообщение
        writeTaskInput.focus(); // вернуть фокус после удаления
    }
}

// удалить текущую задачу
function delTask(){
    this.parentElement.remove();
    returmMessange();
}

function addTaskHandler(){
    if(writeTaskInput.value){
        if(!firstMessage.hidden) firstMessage.hidden = true;

        let newTask = createNewTask(writeTaskInput.value);
        toDoList.append(newTask);

    writeTaskInput.value = "";
    }else {
        alert("Enter your task");
    }
}

function changeTaskState(){
    if(this.checked){
        this.parentElement.classList.add("new-task-checked");
    } else {
        this.parentElement.classList.remove("new-task-checked");
    }
}

function createNewTask(text){
    let div = document.createElement("div");
    div.classList.add("new-task");

    let input = document.createElement("input");
    input.addEventListener("click", changeTaskState);
    input.type = "checkbox";

    let p = document.createElement("p");
    p.textContent = text;

    let img = document.createElement("img");
    img.src = "./image/bin.png";
    img.alt = "bin";
    img.id = "del-task-btn";
    img.addEventListener("click", delTask);


    div.append(input);
    div.append(p);
    div.append(img);

    return div;
}
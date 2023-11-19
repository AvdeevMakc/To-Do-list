let addTaskBtn = document.querySelector("#add-task-btn");
let writeTaskInput = document.querySelector("#write-task-input");
let firstMessage = document.querySelector("#first-message");
let toDoList = document.querySelector(".to-do-list");
let selectionBtn = document.querySelector("#showSelection");
let delAllTasksBtn = document.querySelector("#del-all-tasks-btn");
let delCheckTaskBtn = document.querySelector("#del-check-task-btn");

let arrayTasks = [];

addTaskBtn.addEventListener("click", addTaskHandler);
writeTaskInput.addEventListener("keydown", function(e){
    if(e.code == "Enter" || e.code == "NumpadEnter") addTaskHandler();
});

// сортировка
selectionBtn.addEventListener("change", function(){
    switch(selectionBtn.selectedIndex){
        case 0:
            showAllTasks();
            console.log("show all");
            break;
        case 1:
            console.log("show check");
            showCheckedArray();
            break;
        case 2:
            showNoCheckedArray();
            console.log("show no check");
    }
})

function showAllTasks(){            
    clearDisplay();      // удаляем все задания
    if(!firstMessage.hidden) firstMessage.hidden = true; // установка текста про задачи

    for(let i = 0; i < arrayTasks.length; i++) {
        let task = arrayTasks[i];
        let newTask = createNewTask(task.text, task.done);
        toDoList.append(newTask);
    }        

writeTaskInput.value = "";
}

// показать выделенные 
function showCheckedArray(){            
        clearDisplay();      // удаляем все задания
        if(!firstMessage.hidden) firstMessage.hidden = true; // установка текста про задачи

        for(let i = 0; i < arrayTasks.length; i++) {
            let task = arrayTasks[i];
            if(task.done){
                let newTask = createNewTask(task.text, task.done);
                toDoList.append(newTask);
            }
        }        

    writeTaskInput.value = "";
}

// показать не выделенные
function showNoCheckedArray(){            
    clearDisplay();      // удаляем все задания
    if(!firstMessage.hidden) firstMessage.hidden = true; // установка текста про задачи

    for(let i = 0; i < arrayTasks.length; i++) {
        let task = arrayTasks[i];
        if(!task.done){
            let newTask = createNewTask(task.text, task.done);
            toDoList.append(newTask);
        }
    }        

writeTaskInput.value = "";
}


//добавление новой записи в разметку 
function addTaskHandler(){
    if(writeTaskInput.value){
        
        clearDisplay();      // удаляем все задания
        if(!firstMessage.hidden) firstMessage.hidden = true; // установка текста про задачи
       
        addTaskToArray();   // добавляем в массив введенное значение

        for(let i = 0; i < arrayTasks.length; i++) {
            let task = arrayTasks[i];
            let newTask = createNewTask(task.text, task.done);
            toDoList.append(newTask);
        }
        

    writeTaskInput.value = "";
    }else {
        alert("Enter your task");
    }
}

// добавить в массив запись
function addTaskToArray(){
    let elem = {
        text: writeTaskInput.value,
        done: false
    }
    arrayTasks.push(elem);
    console.log(arrayTasks);
}

// изменить задачу
function renameTask(){
    let newTask = prompt("Enter new task");
    let elem = this.previousSibling; // находим Р через соседний элемент

    for(let i = 0; i < arrayTasks.length; i++){
        let task = arrayTasks[i];

        if(task.text === elem.textContent){
            arrayTasks[i].text = newTask;
        }
    }

    this.previousSibling.textContent = newTask;
}

// создание разметки 
function createNewTask(text, value){    

        let div = document.createElement("div");
        div.classList.add("new-task");

        let input = document.createElement("input");
        input.addEventListener("click", changeTaskState);
        input.type = "checkbox";
        input.checked = value;

        let p = document.createElement("p");
        p.textContent = text;

        let imgPrint = document.createElement("img");
        imgPrint.src = "./image/print.png";
        imgPrint.alt = "print";
        imgPrint.id = "renameBtn";
        imgPrint.addEventListener("click", renameTask);

        let imgBin = document.createElement("img");
        imgBin.src = "./image/bin.png";
        imgBin.alt = "bin";
        imgBin.id = "del-task-btn";
        imgBin.addEventListener("click", delTask);

        div.append(input);
        div.append(p);
        div.append(imgPrint);
        div.append(imgBin);

        if(input.checked){
            div.classList.add("new-task-checked");  
        } 

        return div;
}

// удалить все задачи
delAllTasksBtn.addEventListener("click", dellAllList);
function dellAllList(){
    clearDisplay();
    arrayTasks.splice(0, arrayTasks.length); // очистить массив
}

// удалить текущую задачу
function delTask(){
    this.parentElement.remove();
    let elem = this.previousSibling.previousSibling; // находим Р через соседний элемент, на котором было событие

    for(let i = 0; i < arrayTasks.length; i++){
        let task = arrayTasks[i];

        if(task.text === elem.textContent){
            arrayTasks.splice(i, 1);
        }
    }
    returmMessange();
}

// если список пусть, вернули текст
function returmMessange(){
    if(toDoList.childNodes.length === 0){
        firstMessage.hidden = false; // вернуть сообщение
        writeTaskInput.focus(); // вернуть фокус после удаления
    }
}

// очистить список на экране
function clearDisplay(){
    while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
    }
    firstMessage.hidden = false; // вернуть сообщение
    writeTaskInput.focus(); // вернуть фокус после удаления
}

// добавить класс к выбранному DIV
function changeTaskState(){
    if(this.checked){
        this.parentElement.classList.add("new-task-checked");
        console.log(this);

        let elem = this.nextSibling; // находим Р через соседний элемент

        for(let i = 0; i < arrayTasks.length; i++){
            let task = arrayTasks[i];

            if(task.text === elem.textContent){
                arrayTasks[i].done = true;
            }
        }

    } else {
        this.parentElement.classList.remove("new-task-checked");

        let elem = this.nextSibling; // находим Р через соседний элемент

        for(let i = 0; i < arrayTasks.length; i++){
            let task = arrayTasks[i];

            if(task.text === elem.textContent){
                arrayTasks[i].done = false;
            }
        }
    }
}

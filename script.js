document.addEventListener('DOMContentLoaded', () =>{

    let todoInput = document.getElementById("todo-input");
    let todoList = document.getElementById("todo-list");
    let addTaskBtn = document.getElementById("add-task-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) ||  [];

    tasks.forEach((task) => renderTask(task));

    addTaskBtn.addEventListener('click' , addTasks);

    todoInput.addEventListener('keydown' , (e) => {
        if(e.key === "Enter") addTasks();
    });

    function addTasks() {

        let inputText = todoInput.value.trim();
        if(inputText ==="")return;

        const newTask = {
            id : Date.now(),
            text: inputText,
            completed : false,

        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value =""    // clear input

    }

    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id" , task.id);
        li.innerHTML = `
            <span> ${task.text} </span>
            <button>delete</button>
        `;
        li.addEventListener('click' , (e) => {
            if(e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        })

        li.querySelector("button").addEventListener('click' , (e) =>{
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });
        todoList.append(li);
    }
    function saveTasks(){
        localStorage.setItem("tasks" , JSON.stringify(tasks));
    }

    
});
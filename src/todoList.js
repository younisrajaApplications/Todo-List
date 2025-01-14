const todoList = JSON.parse(localStorage.getItem('todoListSaved')) || [];

function addTask() {
    const task = document.querySelector('.taskName').value;
    const deadlineDate = document.querySelector('.deadline').value;
    if (!task || !deadlineDate) {
        return;
    }
    todoList.push({task , deadlineDate});
    console.log(todoList);
    document.querySelector('.taskName').value = '';
    document.querySelector('.deadline').value = '';
    updateList();
}

function updateList() {
    let generatedHTML = '';
    for (let i = 0; i < todoList.length; i++) {
        const {task , deadlineDate} = todoList[i];
        generatedHTML += `<div class="px-2.5">${task}</div> <div class="px-2.5">${deadlineDate}</div>
        <button class="bg-red-700 text-red-300 p-3" onclick="removeTask(${i});">Delete</button>`;
    }
    localStorage.setItem('todoListSaved', JSON.stringify(todoList));
    document.querySelector('.taskList').innerHTML = generatedHTML;
}

function removeTask(i) {
    todoList.splice(i, 1);
    updateList();
}
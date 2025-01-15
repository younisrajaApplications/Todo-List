const todoList = JSON.parse(localStorage.getItem('todoListSaved')) || [];

function addTask() {
    const task = checkInput(document.querySelector('.taskName'));
    const deadlineDate = checkInput(document.querySelector('.deadline'));
    if (!task || !deadlineDate) {
        updateList();
        return;
    }
    todoList.push({task , deadlineDate});
    console.log(todoList);
    document.querySelector('.taskName').value = '';
    document.querySelector('.deadline').value = '';
    updateList();
}

function checkInput(input) {
    if (input.value) {
        input.classList.remove('border-red-500');
        input.classList.remove('border-solid');
        input.classList.remove('border-2');
        input.classList.remove('bg-red-200');
        return input.value;
    } else {
        input.classList.add('border-red-500');
        input.classList.add('border-solid');
        input.classList.add('border-2');
        input.classList.add('bg-red-200');
        return false;
    }
}

function updateList() {
    let generatedHTML = '';
    /* for (let i = 0; i < todoList.length; i++) {
        const {task , deadlineDate} = todoList[i];
        generatedHTML += `<div class="px-2.5 self-center">${task}</div> <div class="px-2.5 self-center">${deadlineDate}</div>
        <button class="bg-red-700 text-red-300 p-3" onclick="removeTask(${i});">Delete</button>`;
    } */
    todoList.forEach((todoTask, index) => {
        const {task , deadlineDate} = todoTask;
        generatedHTML += `<div class="px-2.5 self-center">${task}</div>
        <div class="px-2.5 self-center">${deadlineDate}</div>
        <button class="bg-red-700 text-red-300 p-3" onclick="removeTask(${index});">Delete</button>`;
    });
    localStorage.setItem('todoListSaved', JSON.stringify(todoList));
    document.querySelector('.taskList').innerHTML = generatedHTML;
}

function removeTask(i) {
    todoList.splice(i, 1);
    updateList();
}
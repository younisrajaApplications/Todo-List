const todoList = JSON.parse(localStorage.getItem('todoListSaved')) || [];

const addButton = document.querySelector('.js-addTaskBtn');
addButton.addEventListener('click', () => addTask());

const deleteAllButton = document.querySelector('.js-deleteAllBtn');
deleteAllButton.addEventListener('click', () => deleteAllTasks());

const viewAllButton = document.querySelector('.js-viewAllBtn');
viewAllButton.addEventListener('click', () => updateList());

function noTasks() {
    document.querySelector('.taskList').innerHTML='<p class="text-center col-span-3 font-bold text-xl">No Tasks To Do!</p>';
}

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
    if (todoList.length === 0) {
        noTasks();
        return;
    }
    todoList.forEach((todoTask, index) => {
        const {task , deadlineDate} = todoTask;
        generatedHTML += `<div class="px-2.5 self-center">${task}</div>
        <div class="px-2.5 self-center">${deadlineDate}</div>
        <button class="js-deleteBtn bg-red-700 text-red-300 p-3">Delete</button>`;
    });
    localStorage.setItem('todoListSaved', JSON.stringify(todoList));
    document.querySelector('.taskList').innerHTML = generatedHTML;
    //document.querySelectorAll(`.js-deleteBtn`)
      //  .forEach((deleteButton, index) => deleteButton.addEventListener('click', () => removeTask(index)));
    const deleteBtns = document.querySelectorAll(`.js-deleteBtn`);
    deleteBtns.forEach((deleteButton, index) => deleteButton.addEventListener('click', () => removeTask(index)));
}

function removeTask(i) {
    todoList.splice(i, 1);
    updateList();
}

function deleteAllTasks() {
    todoList.splice(0, todoList.length);
    updateList();
}
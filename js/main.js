function todoApp() {
    const todoList = document.querySelector('.todo-list');
    const newTodoInput = document.querySelector('.add-todo-input');
    let todoLocalStorage = JSON.parse(localStorage.getItem('todo')) || [];

    function addNewTodo() {
        const newTodoButton = document.querySelectorAll('.add-todo-btn');

        if (!!newTodoButton) {
            newTodoButton.forEach(button => {
                button.addEventListener('click', () => {
                    const newTodoItemVal = newTodoInput.value;
                    const id = parseInt(new Date() / 1000);
        
                    if (!newTodoItemVal) {
                        return;
                    }

                    const todo = {
                        text: newTodoItemVal,
                        id
                    };

                    todoLocalStorage.push(todo);

                    localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

                    displayItemsTemplate(newTodoItemVal, id);

                    newTodoInput.value = '';
                });
            });
        }
    }

    addNewTodo();

    function displayItemsTemplate (content, id) {
        todoList.innerHTML += `
        <div class="todo-item-wrapper">
            <input class="item" value="${content}" data-id=${id} readonly>
            <div class="todo-buttons-wrapper">
                <img class="edit-btn" src="./img/edit.png" data-button="edit-button">
                <img class="delete-btn" src="./img/delete.png" data-button="delete-button">
            </div>
        </div>
        `;

        todoList.addEventListener('click', (e) => {
            if (e.target.dataset.button === 'delete-button') {
                todoLocalStorage = todoLocalStorage.filter((item) => {
                    return item.text !== e.target.closest('.todo-item-wrapper').firstElementChild.value;
                });
    
                localStorage.setItem('todo', JSON.stringify(todoLocalStorage));
                
                const itemWrapper = e.target.closest('.todo-item-wrapper');
    
                itemWrapper.replaceChildren();
    
            } else if (e.target.dataset.button === 'edit-button') {
                const itemInput = e.target.closest('.todo-item-wrapper').firstElementChild;

                itemInput.removeAttribute("readonly");

                itemInput.focus();

                itemInput.addEventListener('blur', (e) => {
                    const id = e.target.dataset.id;

                    todoLocalStorage = todoLocalStorage.map(object => {
                        if (object.id === +id) {
                            return {
                                ...object,
                                text: e.target.value
                            };
                        }

                        return object;
                    });

                    localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

                    itemInput.setAttribute("readonly", true);
                });
            }
        });
    }

    function renderLocalStorage(array) {
        array.forEach(item => {
            displayItemsTemplate(item.text, item.id);
        });
    }

    renderLocalStorage(todoLocalStorage);

    function clearTodoList() {
        const clearTodoButton = document.querySelectorAll('.btn-clear-todo');

        if (!!clearTodoButton) {
            clearTodoButton.forEach(button => {
                button.addEventListener('click', () => {
                    todoList.innerHTML = '';
                    localStorage.clear();
                });
            });
        }
    }

    clearTodoList();
}

document.addEventListener('DOMContentLoaded', todoApp);
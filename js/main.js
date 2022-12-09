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
        
                    if (!newTodoItemVal) {
                        return;
                    }

                    const todo = {
                        text: newTodoItemVal,
                        date: new Date().getMilliseconds()
                    };

                    todoLocalStorage.push(todo);

                    localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

                    displayItemsTemplate(newTodoItemVal);

                    newTodoInput.value = '';
                });
            });
        }
    }

    addNewTodo();

    function displayItemsTemplate (content) {
        todoList.innerHTML += `
        <div class="todo-item-wrapper">
            <input class="item" value="${content}" readonly>
            <div class="todo-buttons-wrapper">
                <img class="edit-btn" src="./img/edit.png" data-button="edit-button">
                <img class="delete-btn" src="./img/delete.png" data-button="delete-button">
            </div>
        </div>
        `;

        todoList.addEventListener('click', (e) => {
            if (e.target.dataset.button === 'delete-button') {
                const arrayWithoutRemovedItem = todoLocalStorage.filter((item) => {
                    return item.text !== e.target.closest('.todo-item-wrapper').firstElementChild.value;
                });
    
                todoLocalStorage = arrayWithoutRemovedItem;
    
                localStorage.setItem('todo', JSON.stringify(todoLocalStorage));
                
                const itemWrapper = e.target.closest('.todo-item-wrapper');
    
                itemWrapper.replaceChildren();
    
            } else if (e.target.dataset.button === 'edit-button') {
                const itemInput = e.target.closest('.todo-item-wrapper').firstElementChild;

                itemInput.removeAttribute("readonly");

                itemInput.focus();

                itemInput.addEventListener('blur', (e) => {
                    const editItem = todoLocalStorage.map(object => {
                        if (object.text === itemInput.value) {
                            return {...object, text:!e.target.value};
                        }
    
                        return object;
                    });

                    todoLocalStorage = editItem;

                    localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

                    itemInput.setAttribute("readonly", true);
                });
            }
        });
    }

    function renderLocalStorage(array) {
        array.forEach(item => {
            displayItemsTemplate(item.text);
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


            // const itemTextInput = document.createElement('p');
            
            // itemTextInput.classList.add('item-text-input');
            // itemTextInput.contentEditable = 'true';
            // itemInput.replaceWith(itemTextInput);
            // itemTextInput.innerText = itemInput.value;
            // itemTextInput.focus();
            
            // itemTextInput.addEventListener('blur', (e) => {
            //     itemTextInput.replaceWith(itemInput);
            //     itemInput.value = itemTextInput.innerText;
            //     console.log('blur done');
            // });

// function todoApp() {
//     const todoList = document.querySelector('.todo-list');
//     const newTodoInput = document.querySelector('.add-todo-input');
//     let todoLocalStorage = JSON.parse(localStorage.getItem('todo')) || [];
    
//     console.log(todoLocalStorage);

//     function addNewTodo() {
//         const newTodoButton = document.querySelectorAll('.add-todo-btn');

//         if (!!newTodoButton) {
//             newTodoButton.forEach(button => {
//                 button.addEventListener('click', () => {
//                     const newTodoItemVal = newTodoInput.value;
        
//                     if (!newTodoItemVal) {
//                         return;
//                     }

//                     displayItemsTemplate(newTodoItemVal);

//                     newTodoInput.value = '';
//                 });
//             });
//         }
//     }

//     addNewTodo();

//     function displayItemsTemplate (content) {
//         todoList.innerHTML += `
//         <div class="todo-item-wrapper">
//             <input class="item" value="${content}" readonly>
//             <div class="todo-buttons-wrapper">
//                 <img class="edit-btn" src="./img/edit.png" data-button="edit-button">
//                 <img class="delete-btn" src="./img/delete.png" data-button="delete-button">
//             </div>
//         </div>
//         `;

//         const todo = {
//             text: content,
//             date: new Date().getMilliseconds()
//         };

//         todoLocalStorage.push(todo);

//         localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

//         todoList.addEventListener('click', (e) => {
//             if (e.target.dataset.button === 'delete-button') {
//                 // const itemWrapper = e.target.closest('.todo-item-wrapper');
                
//                 // itemWrapper.replaceChildren();

//                 const arrayWithoutRemovedItem = todoLocalStorage.filter((item) => {
//                     return item.text !== e.target.closest('.todo-item-wrapper').firstElementChild.value;
//                 });
    
//                 todoLocalStorage = arrayWithoutRemovedItem;
    
//                 localStorage.setItem('todo', JSON.stringify(todoLocalStorage));

//             } else if (e.target.dataset.button === 'edit-button') {
//                 const itemInput = e.target.closest('.todo-item-wrapper').firstElementChild;
//                 itemInput.removeAttribute("readonly");
//                 itemInput.focus();
    
//                 itemInput.addEventListener('blur', (e) => {
//                     itemInput.setAttribute("readonly", true);
                    
//                     todo.text = e.target.value;

//                     localStorage.setItem('todo', JSON.stringify(todoLocalStorage));
//                 });
//             }
//         });
//     }

//     // function renderLocalStorage(array) {
//     //     array.forEach(item => {
//     //         displayItemsTemplate(item.text);
//     //     });
//     // }

//     // renderLocalStorage(todoLocalStorage);

//     function clearTodoList() {
//         const clearTodoButton = document.querySelectorAll('.btn-clear-todo');

//         if (!!clearTodoButton) {
//             clearTodoButton.forEach(button => {
//                 button.addEventListener('click', () => {
//                     todoList.innerHTML = '';
//                     localStorage.clear();
//                 });
//             });
//         }
//     }

//     clearTodoList();
// }

// document.addEventListener('DOMContentLoaded', todoApp);
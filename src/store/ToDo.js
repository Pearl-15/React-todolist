import { observable, decorate, action, computed, flow } from "mobx";
import { addToDoItem } from '../API/postData';
import { updateToDoItem } from '../API/updateData';
import { deleteToDoItem } from '../API/deleteData';
import { getToDoList } from "../API/getData";

class ToDo {
    todoTable = [];
    selectedToDoItem = {};

    setSelectedToDoItem = (targetItem) => {
        if (!targetItem) {
            this.selectedToDoItem = {};
            return
        }
        this.selectedToDoItem = targetItem;
    };

    addToDoItem = flow(function* (newToDo) {
        newToDo.status = false;
        const responseData = yield addToDoItem(newToDo);
        console.log('ToDo added successfully:', responseData);
        this.todoTable.push(responseData);
    });

    deleteToDoItem = flow(function* (todoItemId) {
        const responseData = yield deleteToDoItem(todoItemId);
        console.log('ToDo deleted successfully');
        this.todoTable = this.todoTable.filter((todoItem) => {
            return todoItem.id !== todoItemId;
        });
    });

    updateToDoItem = flow(function* (id, updatedTodoItem) {
        const todoItem = this.todoTable.find((item) => item.id === id);
        let responseData;
        if(typeof updatedTodoItem ==='boolean'){
            const updatedStatus = { status: updatedTodoItem };
            responseData = yield updateToDoItem(id, updatedStatus);
        }else{
            responseData = yield updateToDoItem(id, updatedTodoItem);   
        }
        console.log('Edited Successfully in DB: ', responseData);
        if (todoItem) {
            todoItem.title = responseData.title;
            todoItem.content = responseData.content;
            todoItem.date = responseData.date;
            todoItem.status = responseData.status;
            }
    });

    getToDoList = flow(function* () {
        const responseData = yield getToDoList();
        if (responseData) {
            this.todoTable = responseData;
        }
    });

}

decorate(ToDo, {
    todoTable: observable,
    selectedToDoItem: observable,
    setSelectedToDoItem: action,
    addToDoItem: action,
    deleteToDoItem: action,
    updateToDoItem: action,
    getToDoList: action,
});

export const todoStore = new ToDo();


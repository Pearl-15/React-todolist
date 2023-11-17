import { observable, decorate, action, computed, flow, toJS } from "mobx";
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
        newToDo.todoStatus = false;
        const responseData = yield addToDoItem(newToDo);
        console.log('ToDo added successfully:', responseData);
        yield this.todoTable.push(toJS(responseData.Item));
        console.log("this.todoTable", toJS(this.todoTable));
    });

    deleteToDoItem = flow(function* (todoItemtodoId) {
        const responseData = yield deleteToDoItem(todoItemtodoId);
        console.log('ToDo deleted successfully');
        this.todoTable = this.todoTable.filter((todoItem) => {
            return todoItem.todoId !== todoItemtodoId;
        });
    });

    updateToDoItem = flow(function* (todoId, updatedTodoItem) {
        const todoItem = this.todoTable.find((item) => item.todoId === todoId);
        let responseData;
        if(typeof updatedTodoItem ==='boolean'){
            const updatedStatus = { todoStatus: updatedTodoItem };
            responseData = yield updateToDoItem(todoId, updatedStatus);
            responseData = toJS(responseData.UpdatedItem)
            if (todoItem) {
                todoItem.todoStatus = responseData.todoStatus;
                }
        }else{
            responseData = yield updateToDoItem(todoId, updatedTodoItem);  
            console.log('Edited Successfully in DB: ', responseData);
            responseData = toJS(responseData.UpdatedItem)
            if (todoItem) {
                todoItem.title = responseData.title;
                todoItem.content = responseData.content;
                todoItem.createdDate = responseData.createdDate;
                todoItem.todoStatus = responseData.todoStatus;
                } 
        }      
    });

    getToDoList = flow(function* () {
        const responseData = yield getToDoList();
        if (responseData) {
            this.todoTable = responseData.todoTable;
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


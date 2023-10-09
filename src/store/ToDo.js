import { observable, decorate, action, computed, flow} from "mobx";
import { addToDoItem } from '../API/postData';
import { updateToDoItem } from '../API/updateData';
import { deleteToDoItem } from '../API/deleteData';
import { getToDoList } from "../API/getData";
import moment from 'moment';


class ToDo{
    todoTable = [];
    selectedToDoItem = {};

    addToDo = () => {
        this.selectedToDoItem={};       
    };


    handleAddToDoOk = flow(function* (newToDo){

        try {

            newToDo.status = false;
            const responseData = yield addToDoItem(newToDo);

            if (responseData && responseData.title && responseData.content) {
                console.log('ToDo added successfully:', responseData);
                this.todoTable.push(responseData);    
                
            } else {
                console.log('Unexpected response:', responseData);
            }
        } catch (error) {
            console.log('Error : ', error)
        }
    });

    onDelete = flow(function* (todoItemId){

        try {

            const responseData = yield deleteToDoItem(todoItemId);
            if (responseData) {
                console.log('ToDo deleted successfully');

                this.todoTable = this.todoTable.filter((todoItem)=>{
                    return todoItem.id !== todoItemId;
                });

            } else {
                console.error('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error: ', error);
        }
    });

    onEdit = (targetItem)=>{
        this.selectedToDoItem = targetItem;
    }


    handleEditToDoOk = flow(function* (values){   

        try {

            const obj = { title: values.title, content: values.content , date: values.date , status: values.status};

            const responseData = yield updateToDoItem(values.id , obj);

            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.todoTable.map((todoItem) => {
                    if (todoItem.id === values.id) {
                        return { ...todoItem, title: responseData.title, content: responseData.content, date: responseData.date };
                    }
                    return todoItem;
                });

                this.todoTable = updatedTodoTable;
       
            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    });

    handleCancel = (values) => {
        //if cancel from AddToDo FormComponent
        if(!values){
          this.selectedToDoItem = {};
        }
       
    };

    onChangeStatus = flow (function *(updatedStatus, todoItemId){
        console.log(" Status change from To Do Table ", updatedStatus, todoItemId)
        try {

            const obj = { status: updatedStatus};
            const responseData = yield updateToDoItem(todoItemId, obj);
        
            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.todoTable.map((todoItem) => {
                    if (todoItem.id === todoItemId) {
                        return { ...todoItem, status: responseData.status };
                    }
                    return todoItem;
                });

                this.todoTable = updatedTodoTable;

            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    });
    
    getToDoList = flow(function* (){
        const responseData = yield getToDoList();
        return responseData;
    });

}

decorate(ToDo,{
    todoTable: observable,
    selectedToDoItem: observable,
    addToDo: action,
    handleAddToDoOk: action,
    onDelete: action,
    onEdit: action,
    handleEditToDoOk: action,
    onChangeStatus: action,
    getToDoList: action, 

});

export const todoStore = new ToDo();


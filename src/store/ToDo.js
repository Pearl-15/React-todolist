import { observable, decorate, action, computed, flow} from "mobx";
import { addToDoItem } from '../API/postData';
import { updateToDoItem } from '../API/updateData';
import { deleteToDoItem } from '../API/deleteData';
import { getToDoList } from "../API/getData";
import moment from 'moment';


class ToDo{
    todoTable = [];
    filteredToDoTable =[ ];
    selectedTask = "";
    isFormVisible = false;
    selectedToDoItem = {};

    get filter(){
        let selectedStatus;
        if(this.selectedTask === "completed"){
            selectedStatus = true
        }else if(this.selectedTask === "uncompleted"){
            selectedStatus = false
        }else{
            selectedStatus = ""
        }
    
        try {
    
            // Use filter() to filter the todoTable based on selectedStatus
            const filteredItems = this.todoTable.filter((todoItem) => {
                if(selectedStatus !== ""){
                    return todoItem.status === selectedStatus;
                }
                return todoItem
              
            });
            
            return filteredItems;
        
        } catch (error) {
            console.log('Error : ', error)
        }
    }

    addToDo = () => {
        // this.setState({
        //     isFormVisible: true,
        //     selectedToDoItem:{}
        // })
        this.isFormVisible = true;
        this.selectedToDoItem={};
       
    };


    handleAddToDoOk = flow(function* (newToDo){

        try {

            newToDo.status = false;
            const responseData = yield addToDoItem(newToDo);

            if (responseData && responseData.title && responseData.content) {
                console.log('ToDo added successfully:', responseData);
                // Update the state with the new data after successful POST
                // this.setState((prevState) => ({
                //     todoTable: [...prevState.todoTable, responseData],
                // }));

                // this.onFilter(this.state.selectedTask);
                // this.handleCancel();

                this.todoTable.push(responseData);
                this.onFilter(this.selectedTask);
                this.handleCancel();     
                
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

            // if (responseData) {
            //     console.log('ToDo deleted successfully');
            //     this.setState({
            //         todoTable: this.state.todoTable.filter((todoItem) => {
            //             return todoItem.id !== todoItemId;
            //         }),
            //         filteredToDoTable: this.state.filteredToDoTable.filter((todoItem) => {
            //             return todoItem.id !== todoItemId;
            //         }),
            //     });


            if (responseData) {
                console.log('ToDo deleted successfully');

                this.todoTable = this.todoTable.filter((todoItem)=>{
                    return todoItem.id !== todoItemId;
                });

                this.filteredToDoTable = this.filteredToDoTable.filter((todoItem)=>{
                    return todoItem.id !== todoItemId;
                })


            } else {
                console.error('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error: ', error);
        }
    });

    onEdit =  (todoItemId) => {
        //to render based on state change 
        // const targetItem = this.state.filteredToDoTable.find((item) => item.id === todoItemId);
        const targetItem = this.filteredToDoTable.find((item) => item.id === todoItemId);
        const dateMoment = moment(targetItem.date);
        targetItem.date = dateMoment;

        // this.setState({
        //     isFormVisible: true,
        //     selectedToDoItem:{
        //                     id: targetItem.id,
        //                     title: targetItem.title,
        //                     content: targetItem.content,
        //                     status:targetItem.status,
        //                     date: dateMoment
        //                     }
        //     });

      
        this.isFormVisible = true;
        this.selectedToDoItem = targetItem;

        console.log("OnEdit : ", this.filteredToDoTable);

    }


    handleOk = flow(function* (values){   
        
        //if AddToDo which will not give id, handleAddToDoOk
        if(!values.id){
            this.handleAddToDoOk(values);
            return
        }

        //else EditToDo
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

                // this.setState({
                //     todoTable: updatedTodoTable,
                //     filteredToDoTable: updatedTodoTable,
                // });
                this.todoTable = updatedTodoTable;
                this.onFilter(this.selectedTask)
                this.handleCancel();


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
            // this.setState({isFormVisible:false, selectedToDoItem:{}})
         this.isFormVisible = false;
          this.selectedToDoItem = {};
        }else{ //else cancel from ToDoItem
            // this.setState({ isFormVisible: false });
            this.isFormVisible = false;
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

                // this.setState({
                //     todoTable: updatedTodoTable
                // });

                this.todoTable = updatedTodoTable;

                this.onFilter(this.selectedTask);

            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    });

    ////////////  ***** before adding autorun
    onFilter = (value)=>{
        console.log(" From To Do Table Filter ", value);      
        this.selectedTask = value;
        console.log("onFilter Value Selected Task", this.selectedTask);
        const filteredItems = this.filter;
    
        this.filteredToDoTable = filteredItems

        console.log("this.selectedTask ", this.selectedTask)
    }
    
    getToDoList = flow(function* (){
        const responseData = yield getToDoList();
        return responseData;
    });

}

decorate(ToDo,{
    todoTable: observable,
    filteredToDoTable: observable,
    selectedTask: observable,
    isFormVisible: observable,
    selectedToDoItem: observable,
    addToDo: action,
    handleAddToDoOk: action,
    onDelete: action,
    onEdit: action,
    handleOk: action,
    onChangeStatus: action,
    onFilter: action,
    filter:computed,
    getToDoList: action, 

});

export const todoStore = new ToDo();


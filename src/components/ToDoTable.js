import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import { Col, Row, Tag } from "antd";
import moment from 'moment';
import Filter from './Filter';
import { StyledModal } from './ToDoForm';
import FormComponent from './FormComponent';
import { getToDoList } from './API/getData';
import { addToDoItem } from './API/postData';
import { updateToDoItem } from './API/updateData';
import { deleteToDoItem } from './API/deleteData';

const url = 'http://localhost:3000/todoTable';

const filter = (selectedTask, todoTable)=>{
    let selectedStatus;
    if(selectedTask === "completed"){
        selectedStatus = true
    }else if(selectedTask === "uncompleted"){
        selectedStatus = false
    }else{
        selectedStatus = ""
    }

    try {

        // Use filter() to filter the todoTable based on selectedStatus
        const filteredItems = todoTable.filter((todoItem) => {
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

class ToDoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoTable: [],
            filteredToDoTable:[],
            selectedTask:"",
            isFormVisible: false,
            isFormAdd: false,
            isFormEdit: false,
            selectedToDoItem:{}
        }
    }

    addToDo = async () => {
        this.setState({
            isFormVisible: true,
            isFormAdd: true,
            selectedToDoItem:{}
        })
    }

    handleAddToDoOk = async (values) => {

        try {

            const newToDo = {
                title: values.title,
                content: values.content,
                date: values.date,
                status: values.status,
            }

            const responseData = await addToDoItem(newToDo);

            if (responseData && responseData.title && responseData.content) {
                console.log('ToDo added successfully:', responseData);
                // Update the state with the new data after successful POST
                this.setState((prevState) => ({
                    todoTable: [...prevState.todoTable, responseData],
                }));

                this.onFilter(this.state.selectedTask);
                this.handleCancel();
                
            } else {
                console.log('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error : ', error)

        }

    }

    onDelete = async (todoItemId) => {

        try {

            const endpoint = `${url}/${todoItemId}`

            const responseData = await deleteToDoItem(todoItemId);

            if (responseData) {
                console.log('ToDo deleted successfully');
                this.setState({
                    todoTable: this.state.todoTable.filter((todoItem) => {
                        return todoItem.id !== todoItemId;
                    }),
                    filteredToDoTable: this.state.filteredToDoTable.filter((todoItem) => {
                        return todoItem.id !== todoItemId;
                    }),
                });

            } else {
                console.error('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error: ', error);
        }
    }

    onEdit = async (todoItemId) => {
        //to render based on state change 
        const targetItem = this.state.filteredToDoTable.find((item) => item.id === todoItemId);
        const dateMoment = moment(targetItem.date);

        this.setState({
            isFormVisible: true,
            isFormEdit: true,
            selectedToDoItem:{
                            id: targetItem.id,
                            title: targetItem.title,
                            content: targetItem.content,
                            status:targetItem.status,
                            date: dateMoment
                            }
            });

        console.log("OnEdit : ", todoItemId);

    }


    handleEditOk = async (values) => {    

        try {

            const obj = { title: values.title, content: values.content , date: values.date , status: values.status};

            const responseData = await updateToDoItem(values.id , obj);

            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.state.todoTable.map((todoItem) => {
                    if (todoItem.id === values.id) {
                        return { ...todoItem, title: responseData.title, content: responseData.content, date: responseData.date };
                    }
                    return todoItem;
                });

                this.setState({
                    todoTable: updatedTodoTable,
                    filteredToDoTable: updatedTodoTable,
                });

                this.handleCancel();


            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    };

    handleCancel = () => {
        this.setState({ isFormAdd:false ,isFormEdit: false, isFormVisible: false, selectedToDoItem:{} });
    };

    onChangeStatus = async(updatedStatus, todoItemId)=>{
        console.log(" Status change from To Do Table ", updatedStatus, todoItemId)
        try {

            const obj = { status: updatedStatus};
            const responseData = await updateToDoItem(todoItemId, obj);
        
            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.state.todoTable.map((todoItem) => {
                    if (todoItem.id === todoItemId) {
                        return { ...todoItem, status: responseData.status };
                    }
                    return todoItem;
                });

                this.setState({
                    todoTable: updatedTodoTable
                });

                this.onFilter(this.state.selectedTask);

            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    }

    onFilter = async (value)=>{
        console.log(" From To Do Table Filter ", value);

        //to fix the asynchronous of setState issue use callback function
        this.setState({
            selectedTask: value,
        }, ()=>{
            const filteredItems = filter(this.state.selectedTask, this.state.todoTable);
            this.setState({
                filteredToDoTable: filteredItems
            });

            console.log("this.selectedTask ", this.state.selectedTask)
        });
    }


    async componentDidMount() {

        try {
            const responseData = await getToDoList();

            this.setState({
                todoTable: responseData,
                filteredToDoTable: responseData,
                selectedTask:"all"
            });
        } catch (error) {
            console.log('Error : ', error.message)
        }
    }
 
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <ToDoForm onAdd={this.addToDo} />
                    </Col>
                    <Col span={8} offset={8}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ marginRight: '8px', color: 'white', backgroundColor:'#f5ba13' , padding:'4.5px 12px', borderRadius:'0.2rem', fontWeight:'bold'}}>Select Task</span>
                            <Filter onFilter={this.onFilter}/>
                       </div>
                    </Col>
                </Row>

                <Row gutter={[16, 20]}>

                    {this.state.filteredToDoTable.map((todoItem) => {

                        const dateMoment = moment(todoItem.date);
                        console.log("Statu from ToDoTable ", todoItem.status)
                        return (

                            <Col span={6} key={todoItem.id}>
                                <ToDoItem
                                    id={todoItem.id}
                                    title={todoItem.title}
                                    content={todoItem.content}
                                    date={dateMoment}
                                    status={todoItem.status}
                                    onDelete={this.onDelete}
                                    onEdit={this.onEdit}
                                    onChangeStatus={this.onChangeStatus}                                    
                                />
                            </Col>
                        )
                    })}
                </Row>

                <StyledModal
                    title="Edit ToDo"
                    visible={this.state.isFormVisible}
                    footer={null}
                    closable={false}
                >

                    {/* {this.state.isFormEdit && */}
                        <FormComponent
                            //to pass to form and when form is submitted, this id will be bring together to handleOk method from values.id
                            selectedToDoItem={this.state.selectedToDoItem}
                            onOk={this.handleEditOk}
                            onCancel={this.handleCancel}
                        /> 
                        {/* } */}

                    {/* {this.state.isFormAdd &&
                        <FormComponent
                            onOk={this.handleAddToDoOk}
                            onCancel={this.handleCancel}
                        /> } */}
                </StyledModal>
            </div>

        )
    }
}

export default ToDoTable;
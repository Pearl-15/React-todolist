import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import { Col, Row, Tag } from "antd";
import moment from 'moment';
import { fetchAPIToAdd, fetchAPIToDelete, fetchAPIToEdit, fetchAPIToLoad } from './API';
import Filter from './Filter';

class ToDoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoTable: [],
        }
    }

    addToDo = async (newToDo) => {
        try {

            const responseData = await fetchAPIToAdd(newToDo);

            if (responseData && responseData.title && responseData.content) {
                console.log('ToDo added successfully:', responseData);
                // Update the state with the new data after successful POST
                this.setState((prevState) => ({
                    todoTable: [...prevState.todoTable, responseData], // Use the response data
                }));
            } else {
                console.log('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error : ', error)

        }

    }

    onDelete = async (todoItemId) => {

        try {

            const responseData = await fetchAPIToDelete(todoItemId);

            if (responseData) {
                console.log('ToDo deleted successfully');
                this.setState({
                    todoTable: this.state.todoTable.filter((todoItem) => {
                        return todoItem.id !== todoItemId;
                    })
                });

            } else {
                console.error('Unexpected response:', responseData);
            }


        } catch (error) {
            console.log('Error: ', error);
        }
    }

    onEdit = async (todoItemId, updatedTitle, updatedContent, updatedDate) => {    

        try {

            const obj = { title: updatedTitle, content: updatedContent, date: updatedDate };

            const responseData = await fetchAPIToEdit(todoItemId, obj);

            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.state.todoTable.map((todoItem) => {
                    if (todoItem.id === todoItemId) {
                        return { ...todoItem, title: responseData.title, content: responseData.content, date: responseData.date };
                    }
                    return todoItem;
                });

                this.setState({
                    todoTable: updatedTodoTable,
                });


            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    }

    onChangeStatus = async(updatedStatus, todoItemId)=>{
        console.log(" Status change from To Do Table ", updatedStatus, todoItemId)
        try {

            const obj = { status: updatedStatus};
           
            const responseData = await fetchAPIToEdit(todoItemId, obj )
        
            if (responseData) {
                console.log('Edited Successfully in DB: ', responseData);
                const updatedTodoTable = this.state.todoTable.map((todoItem) => {
                    if (todoItem.id === todoItemId) {
                        return { ...todoItem, status: responseData.status };
                    }
                    return todoItem;
                });

                this.setState({
                    todoTable: updatedTodoTable,
                });


            } else {
                console.error('Unexpected response:', responseData);
            }

        } catch (error) {
            console.log('Error : ', error);
        }
    }

    onFilter = async (value)=>{
        console.log(" From To Do Table Filter ", value);
        let selectedStatus;
        if(value === "completed"){
            selectedStatus = true
        }else if(value === "uncompleted"){
            selectedStatus = false
        }else{
            selectedStatus = ""
        }

        try {

           const responseData = await fetchAPIToLoad();

            // Use filter() to filter the todoTable based on selectedStatus
            const filteredItems = responseData.filter((todoItem) => {
                if(selectedStatus !== ""){
                    return todoItem.status === selectedStatus;
                }
                return todoItem
              
            });
            
            this.setState({
                todoTable: filteredItems
            });
        } catch (error) {
            console.log('Error : ', error)
        }

    }


    async componentDidMount() {

        try {
            const responseData = await fetchAPIToLoad();

            this.setState({
                todoTable: responseData
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
                            <span style={{ marginRight: '8px', color: 'white', backgroundColor:'#f5ba13' , padding:'4.5px 12px', borderRadius:'0.2rem', fontWeight:'bold'}}>Select Tasks</span>
                            <Filter onFilter={this.onFilter}/>
                       </div>
                    </Col>
                </Row>

                <Row gutter={[16, 20]}>

                    {this.state.todoTable.map((todoItem) => {

                        const dateMoment = moment(todoItem.date);
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
            </div>

        )
    }
}

export default ToDoTable;
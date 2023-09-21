import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import { Col, Row } from "antd";
import moment from 'moment';
import { fetchAPI } from './API';
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
            const response = await fetch('http://localhost:3000/todoTable', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newToDo),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json()

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

            const response = await fetch(`http://localhost:3000/todoTable/${todoItemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

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
            const response = await fetch(`http://localhost:3000/todoTable/${todoItemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: updatedTitle, content: updatedContent, date: updatedDate }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
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
            const response = await fetch(`http://localhost:3000/todoTable/${todoItemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: updatedStatus}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            // const obj = { status: updatedStatus};
           
            // const responseData = fetchAPI(todoItemId, obj )
        
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
            const response = await fetch("http://localhost:3000/todoTable", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();

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
            const response = await fetch("http://localhost:3000/todoTable", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            this.setState({
                todoTable: responseData
            });
        } catch (error) {
            console.log('Error : ', error)
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
                            <span style={{ marginRight: '8px', color: 'red' }}>Select Tasks</span><Filter onFilter={this.onFilter}/>
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
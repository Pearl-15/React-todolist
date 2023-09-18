import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import { Col, Row } from "antd";

class ToDoTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            todoTable:[],
        }
    }

    addToDo = async(newToDo)=>{
        try{
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


        }catch(error){
            console.log('Error : ' , error)

        }

    }

    onDelete = async(todoItemId)=>{

        try{

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

              if(responseData){
                console.log('ToDo deleted successfully');
                this.setState({
                    todoTable: this.state.todoTable.filter((todoItem)=>{
                        return todoItem.id !== todoItemId ;
                    })
                });

              }else {
                console.error('Unexpected response:', responseData);
              }


        }catch(error){
            console.log('Error: ', error);
        }     
    }

    onEdit = async(todoItemId, updatedTitle, updatedContent)=>{

        try{
            const response = await fetch(`http://localhost:3000/todoTable/${todoItemId}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({title: updatedTitle, content: updatedContent}),
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            if(responseData){
                console.log('Edited Successfully in DB: ' , responseData);
                const updatedTodoTable = this.state.todoTable.map((todoItem) => {
                    if (todoItem.id === todoItemId) {
                      return { ...todoItem, title: responseData.title, content: responseData.content };
                    }
                    return todoItem;
                  });

                this.setState({
                    todoTable: updatedTodoTable,
                });
          

            } else{
                console.error('Unexpected response:', responseData);
            }

        }catch(error){
            console.log('Error : ', error);
        }
    }


    async componentDidMount() {

        try{
            const response = await fetch("http://localhost:3000/todoTable",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
              }

            const responseData = await response.json();
            this.setState({
                todoTable: responseData
            });
        }catch(error){
            console.log('Error : ', error)
        }
      }

    render(){
        return(   
            <div>
                <Row>
                    <Col span={8}>
                        <ToDoForm onAdd={this.addToDo} />
                    </Col>
                </Row>
                <Row gutter={[16,20]}>
                {this.state.todoTable.map((todoItem)=>{
                    return (
                       
                            <Col span={4} key={todoItem.id}>
                            <ToDoItem
                                id={todoItem.id}
                                title={todoItem.title}
                                content={todoItem.content}
                                onDelete={this.onDelete}
                                onEdit={this.onEdit}
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
import React from 'react';
import ToDoItem from './ToDoItem';
import NoteForm from './ToDoForm';
import { Col, Row } from "antd";

class ToDoTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            todoTable:[],
        }
    }

    addToDo = (newToDo)=>{
        fetch('http://localhost:3000/todoTable', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newToDo),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
    })
    .then((responseData) => {
        if (responseData && responseData.title && responseData.content) {
            console.log('ToDo added successfully:', responseData);
            // Update the state with the new data after successful POST
            this.setState((prevState) => ({
                todoTable: [...prevState.todoTable, responseData], // Use the response data
            }));
        } else {
            console.log('Unexpected response:', responseData);
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });

    }

    onDelete = (todoItemId)=>{
   
        fetch(`http://localhost:3000/todoTable/${todoItemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((responseData) => {
              // Handle the response from the server (e.g., show a success message)
              if (responseData) {
                console.log('ToDo deleted successfully:' , responseData);
        
                // Update the component state to reflect the deletion

                this.setState({
                    todoTable: this.state.todoTable.filter((todoItem)=>{
                        return todoItem.id !== todoItemId ;
                    })
                })
              } else {
                console.error('Unexpected response:', responseData);
              }
            })
            .catch((error) => {
              // Handle errors (e.g., show an error message)
              console.error('Error:', error);
            });

        
    }

    onEdit = (todoItemId, updatedTitle, updatedContent)=>{
        console.log("Want do edit :" ,todoItemId, " : ", updatedTitle, " : ", updatedContent)
        fetch(`http://localhost:3000/todoTable/${todoItemId}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({title: updatedTitle, content: updatedContent}),
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((responseData)=>{


            if(responseData){
                console.log('Edited Successfully : ' + responseData.content);
                console.log(this.state.todoTable);

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
        })
        .catch((error)=>{
            console.error('Error : ', error);
        })
        


    }

    componentDidMount() {
        // Call API to retrieve total game numbers that been played
        fetch("http://localhost:3000/todoTable",{
         
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            this.setState({
                todoTable: data
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render(){
        return(   
            <div className='note-table'>
                <Row>
                    <Col span={8}>
                        <NoteForm onAdd={this.addToDo} />
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
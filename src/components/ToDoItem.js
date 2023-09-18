import React from 'react';
import { Button, Card, Typography, Icon, Modal, Input } from "antd";

class ToDoItem extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isModalVisable: false,
            editedTitle: this.props.title,
            editedContent: this.props.content
        }
    }

    showModal = ()=>{
        console.log("Show Model has been activate")
        this.setState({
            isModalVisable:true,
        })
    }

   handleOk = () => {
        this.setState({iisModalVisable: false});
        // Pass the edited title and content to the parent component
        this.props.onEdit(this.props.id, this.state.editedTitle, this.state.editedContent);
      };
    
    handleCancel = () => {
    this.setState({isModalVisable: false});      
      };
    

    handleDelete = ()=>{
        this.props.onDelete(this.props.id);
    }

    render(){
        return(
        <div className="card"> 
            {/* <Card title={this.props.title}>
            {this.props.content}
            </Card>     */}

            <h3>{this.props.title}</h3>
            <p>{this.props.content}</p>
          

            <Button onClick={this.handleDelete} type="danger" size="small" shape='circle'><Icon type="delete" /></Button>    
            <Button onClick={this.showModal} type="primary" size="small" shape='circle'><Icon type="edit" /></Button>
            <Modal
            title="Edit ToDo"
            visible={this.state.isModalVisable}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <Input
            placeholder="Edit Title"
            value={this.state.editedTitle}
            onChange={(e) => this.setState({editedTitle: e.target.value})}
            />
            <Input.TextArea
            placeholder="Edit Content"
            value={this.state.editedContent}
            onChange={(e) => this.setState({editedContent: e.target.value})}
            />
        </Modal>                    
        </div>)
    }
}

export default ToDoItem;
import React from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const StyledButton = styled(Button)`
font-weight: bold;

  &:hover {
    background-color: #f5ba13;
    border-color: #f5ba13;
    color: white;
  }
`;

export const StyledModal = styled(Modal)`
 .ant-modal-body{
    background-color: wheat;
 }
 .ant-form-item-label{
    font-weight: bold;
 }
 .ant-input{
    border-radius: 0.5rem;
 }
`;



class ToDoButton extends React.Component {

  handleAddToDo = ()=>{
    this.props.onAdd();
  }  
  render(){
   
    return (
        <div>
        <StyledButton type="primary" onClick={this.handleAddToDo}>
          Add ToDo
        </StyledButton> 
        </div>
    );
  }
}
export default ToDoButton;

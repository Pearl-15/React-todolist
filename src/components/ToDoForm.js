import React from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import FormComponent from './FormComponent'; 
import moment from 'moment';

const today = moment();

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



class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false, 
      isAddToDo:false,
    };
  }

  handleShowModal = () => {
    this.setState({ isModalVisible: true, isAddToDo: true });
  };

  handleOk = (values) => {
        this.props.onAdd(values);
        this.setState({ isModalVisible: false, isAddToDo: false });
  };

  handleCancel= () => {
    this.setState({ isModalVisible: false, isAddToDo: false });
};

  
  render(){
    const isEdit = false
  
    return (
        <div>
        <StyledButton type="primary" onClick={this.handleShowModal}>
          Add ToDo
        </StyledButton> 

        <StyledModal
          title="Add ToDo"
          visible={this.state.isModalVisible} 
          footer={null}
          closable={false}    
        >
          
          <FormComponent   
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          isEdit={isEdit}
          />
        
        </StyledModal>
        </div>
    );
  }
}




export default ToDoForm;

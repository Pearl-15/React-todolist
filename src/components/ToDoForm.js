import React from 'react';
import { Button, Modal , Form} from 'antd';
import 'antd/dist/antd.css';
import FormComponent from './FormComponent'; 
import styled from 'styled-components';

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
    };
  }

  handleShowModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onAdd(values);
        this.handleCancel();
      }
    });
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
        <div>
        <StyledButton type="primary" onClick={this.handleShowModal}>
          Add ToDo
        </StyledButton> 

        <StyledModal
          title="Add ToDo"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormComponent form={this.props.form} />
        </StyledModal>
        </div>
    );
  }
}

export default Form.create({ name: 'to_do_form' })(ToDoForm);

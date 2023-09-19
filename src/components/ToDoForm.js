import React from 'react';
import { Button, Typography, Modal , Form} from 'antd';
import 'antd/dist/antd.css';
import FormComponent from './FormComponent'; 
import styled from 'styled-components';
const { Text } = Typography;

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

  handleSubmit = (e) => {
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
        <Text> Create To Do </Text>
        
        {/* <Button type="primary" onClick={this.handleShowModal}>
          Add ToDo
        </Button> */}
        <StyledButton type="primary" onClick={this.handleShowModal}>
          Add ToDo
        </StyledButton> 

        <StyledModal
          title="Add ToDo"
          visible={this.state.isModalVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <FormComponent form={this.props.form} /> {/* Use the FormComponent here */}
        </StyledModal>
        </div>
    );
  }
}

export default Form.create({ name: 'to_do_form' })(ToDoForm);

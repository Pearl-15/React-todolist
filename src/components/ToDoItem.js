
import React from 'react';
import { Button,Icon, Modal, Form } from 'antd';
import FormComponent from './FormComponent';
import styled from 'styled-components';
import { StyledModal } from './ToDoForm';


const StyledToDoCard = styled.div`
  border: 1.5px solid black;
  border-color: #f5ba13;
  padding: 20px;
  border-radius: 0.8rem;
`;

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      editedTitle: this.props.title,
      editedContent: this.props.content,
    };
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
      editedTitle: this.props.title,
      editedContent: this.props.content,
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        this.props.onEdit(this.props.id,  values.title, values.content );

        this.setState({
            editedTitle: values.title,
            editedContent: values.editedContent
        })

        this.handleCancel();
      }
    });
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({ isModalVisible: false });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };



  render() {
    return (
    //   <div className="card">
    <StyledToDoCard>
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>

        <Button onClick={this.handleDelete} type="danger" size="small" shape="circle">
          <Icon type="delete" />
        </Button>
        <Button onClick={this.showModal} type="primary" size="small" shape="circle">
          <Icon type="edit" />
        </Button>
        <StyledModal
          title="Edit ToDo"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormComponent
            title={this.state.editedTitle}
            content={this.state.editedContent}
            form={this.props.form}
          />
        </StyledModal>
           {/* </div> */}
    </StyledToDoCard>
    );
  }
}

export default Form.create({ name: 'to_do_item' }) (ToDoItem);


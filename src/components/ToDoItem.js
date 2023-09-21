
import React from 'react';
import { Button, Icon, Tag, Row, Col, Switch, Divider } from 'antd';
import FormComponent from './FormComponent';
import styled from 'styled-components';
import { StyledModal } from './ToDoForm';
import moment from 'moment';

const dateFormat = 'DD/MM/YY';

const StyledToDoCard = styled.div`
  border: 1.5px solid black;
  border-color: #f5ba13;
  padding: 10px;
  border-radius: 0.8rem; 

`;

const StyledSwitch = styled(Switch)`
  margin-inline-right: 40em;
  &.ant-switch-checked {
    background-color: #3ec166;
  }  
`


class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      editedTitle: this.props.title,
      editedContent: this.props.content,
      editedDate: this.props.date,
    };
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
      editedTitle: this.props.title,
      editedContent: this.props.content,
      editedDate: this.props.date
    });
  };

  handleOk = (values) => {
    this.props.onEdit(this.props.id, values.title, values.content);
    this.setState({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };


  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleTaskDone = (e) => {
    console.log('target : ', e)
    this.props.onChangeStatus(e, this.props.id)
  }


  formatDate = (date) => {
    return (moment(date).format(dateFormat))
  }

  render() {

    const fromatedDate = this.formatDate(this.state.editedDate);

    return (
      <StyledToDoCard>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            {this.props.status ? <Tag color="#3ec166">{this.props.title}</Tag> : <Tag color="grey">{this.props.title}</Tag>}
          </div>

          <div>
            <StyledSwitch
              checked={this.props.status}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              onChange={this.handleTaskDone}
            />
          </div>
          
        </div>

        
 
        <br></br>

        <Tag>{fromatedDate}</Tag>

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
          footer={null}
          closable={false}
        >
          <FormComponent
            title={this.state.editedTitle}
            content={this.state.editedContent}
            date={this.state.editedDate}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          />
        </StyledModal>
      </StyledToDoCard>
    );
  }
}

export default ToDoItem;


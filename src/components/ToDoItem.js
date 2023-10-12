
import React from 'react';
import { Button, Icon, Tag, Switch, Popconfirm, message } from 'antd';
import styled from 'styled-components';
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

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}


class ToDoItem extends React.Component {

  handleEdit = () => {
    this.props.onEdit(this.props.id);
  }

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

    return (
      <StyledToDoCard>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

        <Tag>{this.formatDate(this.props.date)}</Tag>

        <p>{this.props.content}</p>
        <Popconfirm
          title="Are you sure delete this todo?"
          onConfirm={this.handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" size="small" shape="circle">
          <Icon type="delete" />
          </Button>
        </Popconfirm>
        <Button onClick={this.handleEdit} type="primary" size="small" shape="circle">
          <Icon type="edit" />
        </Button>
      </StyledToDoCard>
    );
  }
}

export default ToDoItem;


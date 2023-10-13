import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import { todoStore } from '../store/ToDo';

const { TextArea } = Input;

const dateFormat = 'DD/MM/YY';

const today = moment();

function disabledDate(current) {
  /// Check if the current date is before today
  return current && current < moment().startOf('day');
}


class ToDoForm extends React.Component {

  async componentDidMount() {
    console.log('Component Did Mount')
    await this.updateFormFields();
  }

  async componentDidUpdate(prevProps, prevState) {

    if (this.props.form.getFieldValue('id') !== todoStore.selectedToDoItem.id) {
      await this.updateFormFields();
    }
  }
  componentWillUnmount() {
    console.log('Component Will Unmount')
    this.props.form.resetFields();
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form From FormComponent: ', values);
        this.props.onOk(values);

        if (!this.props.form.getFieldValue('id')) {

          //can't use resetFields() as hidden field status & date will be setback to empty, so that need to manually set 
          const { setFieldsValue } = this.props.form;
          setFieldsValue({
            title: "",
            content: "",
            date: today,
            status: false,
          });
        }
      }
    });
  };

  handleCancel = async (e) => {
    e.preventDefault();
    this.props.onCancel();
    const { setFieldsValue } = this.props.form;
      setFieldsValue({
        id:"",
        title: "",
        content: "",
        date: today,
        status: false,
      }); 
  }

  async updateFormFields() {
    const { setFieldsValue } = this.props.form;
    await setFieldsValue({
      id: todoStore.selectedToDoItem.id,
      title: todoStore.selectedToDoItem.title ,
      content: todoStore.selectedToDoItem.content ,
      date: todoStore.selectedToDoItem.date ,
      status: todoStore.selectedToDoItem.status ,
    });
  }



  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    // const { title, content } = this.props; // Receive title and content as props
    const titleError = getFieldError('title');
    const contentError = getFieldError('content');
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='Date'>
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please select date!' }],
          })(<DatePicker format={dateFormat} disabledDate={disabledDate} />)}
        </Form.Item>
        <Form.Item label='Title' validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input todo title!' }, { max: 20, message: 'Title must not exceed 20 characters!' },],
          })(
            <Input
              placeholder='Title...'
            />)}
        </Form.Item>
        <Form.Item label='Content' validateStatus={contentError ? 'error' : ''} help={contentError || ''}>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input todo content' }],
          })(
            <TextArea
              placeholder='Content...'
            />)}
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('status')(<Input type="hidden" />)}
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          {getFieldDecorator('id')(<Input type="hidden" />)}
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={this.handleCancel}>
            Cancel
          </Button>
          <span style={{ margin: '0 8px' }}></span>
          <Button type="primary" htmlType="submit">
            Ok
          </Button>
        </Form.Item>       
      </Form>
    
    );
  }
}

export default Form.create({ name: 'form_component' })(ToDoForm);

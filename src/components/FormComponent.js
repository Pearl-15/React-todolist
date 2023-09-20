import React from 'react';
import { Form, Input , Button, DatePicker } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const dateFormat = 'DD/MM/YY';

const today = moment();

function disabledDate(current) {
  /// Check if the current date is before today
  return current && current < moment().startOf('day');
}

function onChange(date, dateString) {
  console.log("On Change : ")
  console.log(date, dateString);
}

class FormComponent extends React.Component {

  componentDidMount() {
    console.log('Component Did Mount')
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      title: this.props.title || "",
      content: this.props.content || "",
      date: this.props.date,
      status: this.props.status || false,
    });

    console.log("Component Did Mount from FormComponent : ", this.props.date)
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

      }
    });
  }; 

  handleCancel = e =>{
    e.preventDefault();
    console.log('Cancel has been click')
    this.props.onCancel();
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
          })(<DatePicker format={dateFormat} disabledDate={disabledDate}/>)}
        </Form.Item>
        <Form.Item label='Title' validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input todo title!' }],
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

export default Form.create({ name: 'form_component' })(FormComponent);

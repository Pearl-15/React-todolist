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


class FormComponent extends React.Component {

  async componentDidMount() {
    console.log('Component Did Mount')
    await this.updateFormFields();
  }

  async componentDidUpdate(prevProps, prevState) {

    console.log("ComponentDidUpdate - todoStore.selectedToDoItem.id : ", todoStore.selectedToDoItem.id);
    console.log("ComponentDidUpdate - this.props.form.getFieldValue('id') Before setField: ", this.props.form.getFieldValue('id'));
    console.log(this.props.form.getFieldValue('id'));
    if (this.props.form.getFieldValue('id') !== todoStore.selectedToDoItem.id) {
      await this.updateFormFields();
    }
    console.log("ComponentDidUpdate - this.props.form.getFieldValue('id') : After setField", this.props.form.getFieldValue('id'));

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
    console.log('Cancel has been click', todoStore.selectedToDoItem.id)
    if (!todoStore.selectedToDoItem.id) {
      console.log("Add To do")
      this.props.onCancel();

      //alternative way to set up initial field same as componentDidMount()
      const { setFieldsValue } = this.props.form;
      setFieldsValue({
        title: "",
        content: "",
        date: today,
        status: false,
      });

    } else {
      await this.props.onCancel(todoStore.selectedToDoItem.id);
      const { setFieldsValue } = this.props.form;
      // setFieldsValue({
      //   title: this.props.selectedToDoItem.title,
      //   content: this.props.selectedToDoItem.content,
      //   date: this.props.selectedToDoItem.date,
      //   status: this.props.selectedToDoItem.status,
      // });

      await setFieldsValue({
        title: todoStore.selectedToDoItem.title,
        content: todoStore.selectedToDoItem.content,
        date: todoStore.selectedToDoItem.date,
        status: todoStore.selectedToDoItem.status,
      });
    }
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

    console.log("render ", todoStore.selectedToDoItem.id);
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

export default Form.create({ name: 'form_component' })(FormComponent);

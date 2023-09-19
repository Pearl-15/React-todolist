import React from 'react';
import { Form, Input , Button} from 'antd';


const { TextArea } = Input;


class FormComponent extends React.Component {

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
    const { title, content } = this.props; // Receive title and content as props
    const titleError = getFieldError('title');
    const contentError = getFieldError('content');

    return (   
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='Title' validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [{ required: true, message: 'Please input todo title!' }],
          })(
            <Input
              placeholder='Title...'
            />)}
        </Form.Item>
        <Form.Item label='Content' validateStatus={contentError ? 'error' : ''} help={contentError || ''}>
          {getFieldDecorator('content', {
            initialValue: content,
            rules: [{ required: true, message: 'Please input todo content' }],
          })(
            <TextArea
              placeholder='Content...'
            />)}
        </Form.Item>
        <Form.Item>
        
          <Button type="primary" htmlType="submit">
            Ok
          </Button>

          <Button type="primary" onClick={this.handleCancel}>
            Cancel
          </Button>

        </Form.Item>      
        </Form>
    );
  }
}

export default Form.create({ name: 'form_component' })(FormComponent);

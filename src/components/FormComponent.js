import React from 'react';
import { Form, Input } from 'antd';


const { TextArea } = Input;


class FormComponent extends React.Component {
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form;
    const { title, content } = this.props; // Receive title and content as props
    const titleError = getFieldError('title');
    const contentError = getFieldError('content');

    return (   
      <Form>
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
      </Form>
    );
  }
}

export default Form.create({ name: 'form_component' })(FormComponent);

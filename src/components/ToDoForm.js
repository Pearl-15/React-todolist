import React from 'react';
import { Button, Input, Form , Typography, Modal} from "antd";
import 'antd/dist/antd.css';
const {TextArea} = Input;
const {Text} = Typography;

//validation
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


class ToDoForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            title: "",
            content: "",
            isModalVisible: false,

        }
    }

    handleShowModal = () => {
        this.setState({ isModalVisible: true });
    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({ isModalVisible: false });
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              this.props.onAdd(values);

              this.props.form.setFieldsValue({
                title: '',
                content: ''
              });

              this.props.form.resetFields();

              this.setState({ isModalVisible: false });
              
            }
          });
    }

    render(){

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const titleError = getFieldError('title');
        const contentError = getFieldError('content');

        return(
        <div className="to-do-form">
                <Text> Create To Do </Text>
            
                <Button type="primary" onClick={this.handleShowModal}>Add ToDo</Button>

                <Modal
                title="Add ToDo"
                visible={this.state.isModalVisible} 
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                >

                    <Form> 
                        <Form.Item label='Title' validateStatus={titleError ? 'error': ''} help={titleError || ''}>
                            {getFieldDecorator('title',{
                                rules:[{required: true, message:'Please input to do title!'}],
                            })(
                            <Input 
                            placeholder='Title...' 
                            />,)}
                        </Form.Item>  
                        <Form.Item label='Content' validateStatus={contentError ? 'error':''} help={contentError || ''}>
                            {getFieldDecorator ('content', {
                                rules:[{required: true, message:'Please input to do content'}],
                            })(
                            <TextArea
                            placeholder='Content...' 
                            />,)}
                        </Form.Item>                 
                    </Form>

                </Modal>
              
        </div>)
    }
}



export default Form.create({name: 'to_do_form'})(ToDoForm);

import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import { Col, Row } from "antd";
import moment from 'moment';
import Filter from './Filter';
import { StyledModal } from './ToDoForm';
import FormComponent from './FormComponent';
import { todoStore } from '../store/ToDo';
import { observer } from 'mobx-react';

const filter = (selectedTask, todoTable)=>{
    let selectedStatus;
    if(selectedTask === "completed"){
        selectedStatus = true
    }else if(selectedTask === "uncompleted"){
        selectedStatus = false
    }else{
        selectedStatus = ""
    }

    try {

        // Use filter() to filter the todoTable based on selectedStatus
        const filteredItems = todoTable.filter((todoItem) => {
            if(selectedStatus !== ""){
                return todoItem.status === selectedStatus;
            }
            return todoItem

        });

        return filteredItems;

    } catch (error) {
        console.log('Error : ', error)
    }
    }

class ToDoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredToDoTable: [],
            selectedTask: "",
            isFormVisible: false,
        }
    }

    addToDo = async () => {
        this.setState({
            isFormVisible: true
        });
        todoStore.addToDo();
    }

    handleAddToDoOk = async (values) => {
        todoStore.handleAddToDoOk(values);
    }

    onDelete = async (todoItemId) => {
        await todoStore.onDelete(todoItemId);
        this.setState({
            filteredToDoTable: this.state.filteredToDoTable.filter((todoItem)=>{
                return todoItem.id !== todoItemId;
            })
        });
    }

    onEdit = async (todoItemId) => {
        //to render based on state change 
        const targetItem = this.state.filteredToDoTable.find((item) => item.id === todoItemId);
        const dateMoment = moment(targetItem.date); //convert date(string) to date(moment)

        this.setState({
            isFormVisible: true,
            });
        
    
        targetItem.date = dateMoment;
        todoStore.onEdit(targetItem);

        console.log("OnEdit : ", todoItemId);

    }

    handleOk = async (values) => {
        if(!values.id){
            //if AddToDoOK
            await todoStore.handleAddToDoOk(values);
            await this.onFilter(this.state.selectedTask);
            this.handleCancel(values);
        }else{
            //if EditToDoOK
            await todoStore.handleEditToDoOk(values);
            await this.onFilter(this.state.selectedTask);
            this.handleCancel(values);

        }
    }

    handleCancel = (values) => {
        //if cancel from AddToDo FormComponent
        if(!values){
            this.setState({isFormVisible:false});
            todoStore.handleCancel(values);
        }else{ //else cancel from ToDoItem
            this.setState({ isFormVisible: false });
        }

    };

    onChangeStatus = async (updatedStatus, todoItemId) => {
        await todoStore.onChangeStatus(updatedStatus, todoItemId);
        await this.onFilter(this.state.selectedTask);

    }

    onFilter = async (value)=>{
        console.log(" From To Do Table Filter ", value);

        //to fix the asynchronous of setState issue use callback function
        this.setState({
            selectedTask: value,
        }, ()=>{
            const filteredItems = filter(this.state.selectedTask, todoStore.todoTable);
            this.setState({
                filteredToDoTable: filteredItems
            });

            console.log("this.selectedTask ", this.state.selectedTask)
        });
    }

    async componentDidMount() {

        try {
            const responseData = await todoStore.getToDoList();

            todoStore.todoTable = responseData;
            this.setState({
                filteredToDoTable: responseData,
                selectedTask: "all"
            });
        } catch (error) {
            console.log('Error : ', error.message)
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <ToDoForm onAdd={this.addToDo} />
                    </Col>
                    <Col span={8} offset={8}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ marginRight: '8px', color: 'white', backgroundColor: '#f5ba13', padding: '4.5px 12px', borderRadius: '0.2rem', fontWeight: 'bold' }}>Select Task</span>
                            <Filter onFilter={this.onFilter} />
                        </div>
                    </Col>
                </Row>

                <Row gutter={[16, 20]}>
                    {/* this.state.filteredToDoTable */}
                    {this.state.filteredToDoTable.map((todoItem) => {

                        const dateMoment = moment(todoItem.date);
                        return (

                            <Col span={6} key={todoItem.id}>
                                <ToDoItem
                                    id={todoItem.id}
                                    title={todoItem.title}
                                    content={todoItem.content}
                                    date={dateMoment}
                                    status={todoItem.status}
                                    onDelete={this.onDelete}
                                    onEdit={this.onEdit}
                                    onChangeStatus={this.onChangeStatus}
                                />
                            </Col>
                        )
                    })}
                </Row>

                <StyledModal
                    title="Edit ToDo"
                    visible={this.state.isFormVisible}
                    footer={null}
                    closable={false}
                >

                    <FormComponent
                        //to pass to form and when form is submitted, this id will be bring together to handleOk method from values.id
                        selectedToDoItem={todoStore.selectedToDoItem}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    />

                </StyledModal>
            </div>

        )
    }
}

export default observer(ToDoTable);
import React from 'react';
import ToDoItem from './ToDoItem';
import ToDoButton from './ToDoButton';
import { Col, Row, Spin, message } from "antd";
import moment from 'moment';
import SelectTaskDropdown from './SelectTaskDropdown';
import { StyledModal } from './ToDoButton';
import ToDoForm from './ToDoForm';
import { todoStore } from '../store/ToDo';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';



const filter = (selectedTask, todoTable) => {
    let selectedStatus;
    if (selectedTask === "completed") {
        selectedStatus = true
    } else if (selectedTask === "uncompleted") {
        selectedStatus = false
    } else {
        selectedStatus = ""
    }
    // Use filter() to filter the todoTable based on selectedStatus
    const filteredItems = todoTable.filter((todoItem) => {
        if (selectedStatus !== "") {
            return todoItem.todoStatus === selectedStatus;
        }
        return todoItem

    });

    return filteredItems;

}

class ToDoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredToDoTable: [],
            selectedTask: "",
            isFormVisible: false,
            loading: true,
        }
    }

    showToDoForm = async (todoId) => {

        if(!todoId){
            this.setState({
                isFormVisible: true
            });
            todoStore.setSelectedToDoItem();
        }else{
               //to render based on state change 
               const targetItem = this.state.filteredToDoTable.find((item) => item.todoId === todoId);
               const dateMoment = moment(targetItem.createdDate); //convert date(string) to
       
               this.setState({
                   isFormVisible: true,
               });   
               targetItem.createdDate = dateMoment;
               todoStore.setSelectedToDoItem(targetItem)
               console.log("OnEdit : ", todoId);
        }         
    }

    handleDelete = async (todoId) => {
        try {
            await todoStore.deleteToDoItem(todoId);
            this.setState({
                filteredToDoTable: this.state.filteredToDoTable.filter((todoItem) => {
                    return todoItem.todoId !== todoId;
                })
            });
            message.warning('ToDo has been delected successfully.')
        } catch (e) {
            message.error('Delete unsuccessful, something is wrong, please try again!');
            console.log('Component Error: ', e.message);
        }

    }
    handleOk = async (values) => {
        if (!values.todoId) {
            //if AddToDoOK
            try {
                await todoStore.addToDoItem(values);
                await this.handleTaskFilter(this.state.selectedTask);
                this.handleCancel(values);
                await message.success('New ToDo has been added successfully', 2);
            } catch (e) {
                message.error('Add ToDo unsuccessful, something is wrong, please try again!');
                console.log('Component Error: ', e);
            }


        } else {
            //if EditToDoOK
            try {
                await todoStore.updateToDoItem(values.todoId,values);
                await this.handleTaskFilter(this.state.selectedTask);
                this.handleCancel(values);
                message.success('ToDo has been edited successfully', 2);
            } catch (e) {
                message.error('Edit unsuccessful, something is wrong, please try again!');
                console.log('Component Error: ', e.message);
            }
        }
    }

    handleCancel = () => {
        this.setState({ isFormVisible: false });
    };

    handleChangeStatus = async (updatedStatus, todoId) => {

        try {
            await todoStore.updateToDoItem(todoId, updatedStatus);
            await this.handleTaskFilter(this.state.selectedTask);
            message.success("Status has been changed successfully.")
        } catch (e) {
            message.error("Status change unsuccessful, please try again.");
            console.log('Component Error: ', e.message);
        }
    }

    handleTaskFilter = async (selectedTask) => {

        //to fix the asynchronous of setState issue use callback function
        this.setState({
            selectedTask: selectedTask,
        }, () => {
            const filteredItems = filter(this.state.selectedTask, toJS(todoStore.todoTable));
            this.setState({
                filteredToDoTable: filteredItems
            });
        });
    }

    async componentDidMount() {
        console.log("ToDoTable : componetDidMount")

        try {
            await todoStore.getToDoList();  
            this.setState({
                filteredToDoTable: toJS(todoStore.todoTable),
                selectedTask: "all",
                loading: false,
            });
        } catch (error) {
            console.log('Component Error : ', error.message);
            this.setState({ loading: false });
            message.error('Something weng wrong, please try again!');     
        }
    }

    render() {
        console.log("this.state.filteredToDoTable", this.state.filteredToDoTable);
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <ToDoButton onAdd={this.showToDoForm} />
                    </Col>
                    <Col span={8} offset={8}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ marginRight: '8px', color: 'white', backgroundColor: '#f5ba13', padding: '4.5px 12px', borderRadius: '0.2rem', fontWeight: 'bold' }}>Select Task</span>
                            <SelectTaskDropdown onFilter={this.handleTaskFilter} />
                        </div>
                    </Col>
                </Row>

                {this.state.loading ?
                    <>
                        <div style={{ textAlign: "center", margin: "30%" }}>
                            <Spin tip="Loading..."></Spin>
                        </div>
                    </> :
                    <>
                        <Row gutter={[16, 20]}>

                            {this.state.filteredToDoTable.map((todoItem) => {

                                const dateMoment = moment(todoItem.createdDate);
                                return (

                                    <Col span={6} key={todoItem.todoId}>
                                        <ToDoItem
                                            todoId={todoItem.todoId}
                                            title={todoItem.title}
                                            content={todoItem.content}
                                            createdDate={dateMoment}
                                            todoStatus={todoItem.todoStatus}
                                            onDelete={this.handleDelete}
                                            onEdit={this.showToDoForm}
                                            onChangeStatus={this.handleChangeStatus}
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

                            <ToDoForm
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            />

                        </StyledModal>

                    </>}
            </div>

        )
    }
}

export default observer(ToDoTable);
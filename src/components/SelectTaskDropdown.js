import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

class SelectTaskDropdown extends React.Component{
    
    handleChange = (value)=>{
        console.log("Selected : ", value);
        this.props.onFilter(value);
    }

    render(){
        return(
            <div>
            <Select defaultValue="all" style={{ width: 150 }} onChange={this.handleChange}>
                <Option value="all">All</Option>
                <Option value="completed">Completed</Option>
                <Option value="uncompleted">Uncompleted</Option>
            </Select>
          </div>
        )
    }
}

export default SelectTaskDropdown;
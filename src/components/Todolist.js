import React from 'react';

class Todolist extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            item:"",
            items:[]
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }



    onChangeHandler = (e)=>{
        this.setState({
            item: e.target.value
        })
    }

    onClickHandler = (e)=>{
        e.preventDefault();
        this.setState({
            item: '',
            items:[...this.state.items, this.state.item]
        })

    }
    render(){
        return(
            <div>
                <h1>To do list</h1>
                <input 
                type="text" 
                value={this.state.item}
                placeholder="Enter to do item..." 
                onChange={this.onChangeHandler}
                />
                <button onClick={this.onClickHandler}>Add Item</button>
            </div>
        )
    }
}

export default Todolist;
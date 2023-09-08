import React from 'react';


class Note extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = ()=>{
        this.props.onDelete(this.props.id);
    }
    render(){
        return(
        <div>                 
            <h1>{this.props.title}</h1>
            <p>{this.props.content}</p>  
            <button onClick={this.handleClick}>Delete</button>                        
        </div>)
    }
}

export default Note;
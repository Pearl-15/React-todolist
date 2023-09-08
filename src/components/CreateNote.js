import React from 'react';

class CreateNote extends React.Component{

    constructor(props){
        super(props);
        this.state={
            newNoteTitle: "",
            newNoteContent: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.onAdd(this.state);
        this.setState({
            newNoteTitle: "",
            newNoteContent: ""
        })
    }

    handleTitleChange = (e) =>{
        this.setState({
            newNoteTitle: e.target.value
        })
    }

    handleContentChange = (e) =>{
        this.setState({
            newNoteContent: e.target.value
        })
    }


    render(){
        return(
        <div>
            <form onSubmit={this.handleSubmit}>
            <h1> Create To Do </h1>
            <input 
            name="newNoteTitle"
            type="text" 
            placeholder='Title...' 
            value={this.state.newNoteTitle}
            onChange={this.handleTitleChange}
            />
            <input 
            name="newNoteContent"
            type="text" 
            placeholder='Content...' 
            value={this.state.newNoteContent}
            onChange={this.handleContentChange}
            />
            <button type="submit" >Add</button>
            </form>
        </div>)
    }
}

export default CreateNote;

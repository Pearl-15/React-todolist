import React from 'react';

class AddNote extends React.Component{

    constructor(props){
        super(props);
        this.state={
            newNoteTitle: "",
            newNoteContent:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Add New Note to List");
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
            <h1> Add Note </h1>
            <input 
            type="text" 
            placeholder='Title...' 
            value={this.state.newNoteTitle}
            onChange={this.handleTitleChange}
            />
            <input 
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

export default AddNote;

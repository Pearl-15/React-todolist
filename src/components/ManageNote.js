import React from 'react';
import CreateNote from './CreateNote';
import Note from './Note';

class ManageNote extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            notes:[],
        }
        this.addNote = this.addNote.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    addNote = (newNote)=>{
        this.setState({
            notes:[...this.state.notes,newNote]
        })
    }

    onDelete = (noteId)=>{
        this.setState({
            notes: this.state.notes.filter((targetNote, index)=>{
                return index!== noteId;
            })
        })
    }

    render(){
        return(
            <div>
                <CreateNote onAdd={this.addNote} />
                {this.state.notes.map((note, index)=>{
                    return (
                        <Note
                        key={index}
                        id={index}
                        title={note.newNoteTitle}
                        content={note.newNoteContent}
                        onDelete={this.onDelete}
                        />
                    
                    )
                })}
            </div>
        )
    }
}

export default ManageNote;
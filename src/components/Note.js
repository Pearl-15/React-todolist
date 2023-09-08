import React from 'react';
import notes from '../notes';

class Note extends React.Component{
    render(){
        return(
        <div>
            {notes.map((note)=>{
                return(
                    <div key={note.key}>
                        <h1>{note.title}</h1>
                        <p>{note.content}</p>
                    </div>
                )
            })}
        </div>)
    }
}

export default Note;
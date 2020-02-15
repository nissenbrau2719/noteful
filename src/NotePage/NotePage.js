import React from 'react';
import './NotePage.css';
import Note from '../Note/Note';
import './NotePage.css';
import NotefulContext from '../NotefulContext';

function NotePage(props) {
  return (
    <NotefulContext.Consumer>
      {context => {
        const featuredNote = context.notes.find(note => note.id === props.match.params.noteId)
        return(
          <div className='noteMain'>
            <Note note={featuredNote} />
            <p className='noteContent'>
              {featuredNote.content}
            </p>
          </div>
        )
      }}
    </NotefulContext.Consumer> 
  );
}

export default NotePage;
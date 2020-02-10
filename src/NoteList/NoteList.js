import React from 'react';
import './NoteList.css';
import Note from '../Note/Note';

function NoteList(props) {
  const notes = props.notes.map(note => {
  return <Note key={note.id} note={note} />
  })

  return (
    <div className='noteList'>
      {notes}
      <button className='addNoteBtn'>Add Note</button>
    </div>
  )
}

export default NoteList;
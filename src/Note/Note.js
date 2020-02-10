import React from 'react';
import './Note.css';


function Note(props) {
  const formattedDate = new Date(props.note.modified).toDateString();

  return (
    <div className='Note'>
      <h2 className='noteTitle'>{props.note.name}</h2>
      <div className='noteDetails'>
        <p className='modified'>Modified on {formattedDate}</p>
        <button className='deleteBtn'>Delete Note</button>
      </div>
    </div>
  );
}

export default Note;
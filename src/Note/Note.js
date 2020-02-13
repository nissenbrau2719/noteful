import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';


function Note(props) {
  const formattedDate = new Date(props.note.modified).toDateString();

  return (
    <div className='Note'>
      <h2 className='noteTitle' >
        <Link to={`/note/${props.note.id}`} id={props.note.id} >{props.note.name}</Link>
      </h2>
      <div className='noteDetails'>
        <p className='modified'>Modified on {formattedDate}</p>
        <button className='deleteBtn'>Delete Note</button>
      </div>
    </div>
  );
}

export default Note;
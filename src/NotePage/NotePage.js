import React from 'react';
import './NotePage.css';
import Note from '../Note/Note';

function NotePage(props) {
  return (
    <div className='NotePage'>
      <div className='noteSidebar'>
        <button className='goBackBtn'>Go back</button>
        <h2>{props.folderName}</h2> 
      </div>
      <div className='noteMain'>
        <Note note={props.note} />
        <p className='noteContent'>
          {props.note.content}
        </p>
      </div>
    </div>
  );
}

export default NotePage;
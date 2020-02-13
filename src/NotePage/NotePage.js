import React from 'react';
import './NotePage.css';
import Note from '../Note/Note';
import './NotePage.css';

function NotePage(props) {
  return (
      <div className='noteMain'>
        <Note note={props.note} />
        <p className='noteContent'>
          {props.note.content}
        </p>
      </div>
  );
}

export default NotePage;
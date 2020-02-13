import React from 'react';
import './NotePageSidebar.css';

function NotePageSidebar(props) {
  return (
    <div className='noteSidebar'>
      <button className='goBackBtn'>Go back</button>
      <h2 className='noteFolder'>{props.folderName}</h2> 
    </div>
  )
}

export default NotePageSidebar;
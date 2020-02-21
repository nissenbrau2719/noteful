import React from 'react';
import './NoteList.css';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {
  static defaultProps = {
    match: {
      params:{}
    }
  }
  static contextType = NotefulContext

  render() {
    const displayNotes = this.props.match.params.folderId
      ? this.context.notes.filter(note => note.folderId === this.props.match.params.folderId)
      : this.context.notes
    const notes = displayNotes.map(note => {
    return <Note key={note.id} note={note}  />
    })

    return (
      <div className='noteList'>
        {notes}
        <Link to='/addNote' >
          <button className='addNoteBtn'>
            Add Note
          </button>
        </Link>
      </div>
    )

  }
  
}

export default NoteList;
import React from 'react';
import './NoteList.css';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';

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
        <button className='addNoteBtn'>Add Note</button>
      </div>
    )

  }
  
}

export default NoteList;
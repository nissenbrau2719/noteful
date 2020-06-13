import React from 'react';
import './NotePage.css';
import Note from '../Note/Note';
import './NotePage.css';
import { Link } from 'react-router-dom';

class NotePage extends React.Component {
  state = {
    note: {},
    error: null
  }


  componentDidMount() {
    const noteId = this.props.match.params.noteId
    const url = `http://localhost:8000/api/notes/${noteId}`
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Failed to fetch note data')
        }
        return res.json()
      })
      .then(data => this.setState({note: data}))
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }
    

  render() {
    const { note } = this.state
    return (
      <div className='noteMain'>
        <Note note={note} {...this.props}/>
        <p className='noteContent'>
          {note.content}
        </p>
        <Link to={`/editNote/${note.id}`}>
          <button className="editNoteBtn">Edit Note</button>
        </Link>
      </div>
    );
  }
  
}

export default NotePage;